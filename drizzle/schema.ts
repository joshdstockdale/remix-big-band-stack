import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  uuid,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("userType", ["admin", "standard"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }),
  userType: userTypeEnum("user_type"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  body: text("body").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),

  userId: uuid("user_id").references(() => users.id),
});

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));
