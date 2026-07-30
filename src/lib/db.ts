import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

// Turso client instance
export const libsqlClient = createClient({
  url,
  authToken,
});

// Drizzle ORM instance initialized with Turso client & schema
export const db = drizzle(libsqlClient, { schema });
