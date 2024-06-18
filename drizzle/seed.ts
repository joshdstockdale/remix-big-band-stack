import "dotenv/config";

import bcrypt from "bcryptjs";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { users, notes } from "./schema";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const db = drizzle(pool);

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  console.log("🥚 Seed start");

  const records = await db.select({ count: count() }).from(users);
  if (records.length > 0 && records[0].count === 0) {
    const hashedPassword = await bcrypt.hash("mePassword", 10);
    const user: (typeof users.$inferInsert)[] = [];
    user.push({
      email: "me@me.com",
      password: hashedPassword,
    });

    const result = await db
      .insert(users)
      .values(user)
      .returning({ insertedId: users.id });

    if (result.length > 0) {
      const note: (typeof notes.$inferInsert)[] = [];
      for (let i = 0; i < 2; i++) {
        note.push({
          title: `Test Note ${i}`,
          body: "Lorem ipsum...",
          userId: result[0].insertedId,
        });
      }

      await db.insert(notes).values(note);
    }
  }

  console.log("🐔 Seed done");
};

main();
