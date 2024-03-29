import { Client } from "pg";
import { expect, test } from "vitest";
import dotenv from "dotenv";

dotenv.config();

test("Test database connectivity", async () => {
  const client = new Client({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
  });

  await client.connect();
  const res = await client.query("SELECT $1::text as author", [
    "Japheth Kosgei!",
  ]);

  console.log("Author Name:", res.rows[0].author);
  await client.end();

  expect(res.rows[0].author).toBe("Japheth Kosgei!");
});
