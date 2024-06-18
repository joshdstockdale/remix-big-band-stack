// Use this to delete a user by their email
// Simply call this with:
// npx ts-node -r tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted
import "dotenv/config";

import { installGlobals } from "@remix-run/node";
import { eq } from "drizzle-orm";

import { db } from "~/db.server";

import { users } from "../../drizzle/schema";

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error("email required for login");
  }
  if (!email.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  try {
    await db.delete(users).where(eq(users.email, email));
  } catch (error) {
    console.log(`Error Deleting... ${error}`);
    throw error;
  }
}

deleteUser(process.argv[2]);
