import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { users } from "drizzle/schema";
import { db } from "~/db.server";

export type User = typeof users.$inferSelect;

export async function getUserById(id: User["id"]) {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getUserByEmail(email: User["email"]) {
  return db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.insert(users).values({ email, password: hashedPassword });
}

export async function deleteUserByEmail(email: User["email"]) {
  return db.delete(users).where(eq(users.email, email));
}

export async function verifyLogin(
  email: User["email"],
  password: User["password"],
) {
  if (!password) {
    return null;
  }
  const userWithPassword = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!userWithPassword || !userWithPassword[0].password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword[0].password);

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword[0];

  return userWithoutPassword;
}
