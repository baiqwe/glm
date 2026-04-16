import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

const ENV_FILES = [".env", ".env.local"];
const fileBackedEnvKeys = new Set<string>();

function loadEnvFile(fileName: string) {
  const filePath = path.resolve(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  for (const rawLine of fileContents.split("\n")) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    const canOverride = fileName === ".env.local" && fileBackedEnvKeys.has(key);

    if (!process.env[key] || canOverride) {
      process.env[key] = value.replace(/^['"]|['"]$/g, "");
      fileBackedEnvKeys.add(key);
    }
  }
}

for (const envFile of ENV_FILES) {
  loadEnvFile(envFile);
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const tableName = process.env.SUPABASE_KEEPALIVE_TABLE || "project_keepalive";
const keepaliveId = process.env.SUPABASE_KEEPALIVE_ID || "primary";
const source =
  process.env.SUPABASE_KEEPALIVE_SOURCE ||
  (process.env.GITHUB_ACTIONS ? "github-actions" : "manual-script");

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const timestamp = new Date().toISOString();

  console.log(`Writing keepalive heartbeat to ${tableName} at ${timestamp}`);

  const { data, error } = await supabase
    .from(tableName)
    .upsert(
      {
        id: keepaliveId,
        source,
        last_seen_at: timestamp,
        metadata: {
          source,
          timestamp,
          gitHubRunId: process.env.GITHUB_RUN_ID || null,
          gitHubRepository: process.env.GITHUB_REPOSITORY || null,
        },
      },
      { onConflict: "id" },
    )
    .select("id, source, last_seen_at, updated_at")
    .single();

  if (error) {
    if (error.code === "42P01") {
      console.error(
        `Table "${tableName}" does not exist yet. Apply the keepalive migration first, then rerun this script.`,
      );
    } else {
      console.error("Supabase keepalive failed:", error);
    }
    process.exit(1);
  }

  console.log("Supabase keepalive succeeded.");
  console.log(JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error("Unexpected keepalive failure:", error);
  process.exit(1);
});
