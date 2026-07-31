import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";
import * as dotenv from "dotenv";
import * as path from "path";

if (!process.env.TURSO_DATABASE_URL) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
}

const url = process.env.TURSO_DATABASE_URL || "libsql://barbie-database-barbie.aws-ap-south-1.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODU0MDU3MjEsImlkIjoiMDE5ZmIyNmUtYmMwMS03YjY3LTgzYzgtY2RhZTFiYjU0ZWFmIiwia2lkIjoiN0NiaU5ZaVY2RHNhcy13WDlOVFU4Vm8ycnZSdlN1VkFMdHNBYTVGVTVqSSIsInJpZCI6IjBkNDI3NTAwLTY2ZjMtNGVkNy1iYjZiLWE3NGQzZjg0YjRkMCJ9.fgcNU9Tygom8i9I3wOeIwTzWOMZMCYR04KKr4UNc9P89NAM5r7y9mH5ZADS1KBzJjk6nnE8sPKJI6x2NvrWtDA";

// Turso client instance
export const libsqlClient = createClient({
  url,
  authToken,
});

// Drizzle ORM instance initialized with Turso client & schema
export const db = drizzle(libsqlClient, { schema });
