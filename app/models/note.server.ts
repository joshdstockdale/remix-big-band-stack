import { eq, and, desc } from "drizzle-orm";

import { notes } from "drizzle/schema";
import { db } from "~/db.server";
import { User } from "~/models/user.server";

export type Note = typeof notes.$inferSelect;

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return db
    .select()
    .from(notes)
    .where(and(eq(notes.id, id), eq(notes.userId, userId)));
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return db
    .select({ id: notes.id, title: notes.title })
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(desc(notes.updatedAt));
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}) {
  return db.insert(notes).values({ title, body, userId });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return db
    .delete(notes)
    .where(and(eq(notes.id, id), eq(notes.userId, userId)));
}
