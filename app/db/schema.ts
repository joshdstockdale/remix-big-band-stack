import { timestamp, pgTable, uuid, jsonb } from "drizzle-orm/pg-core";

export const photos = pgTable("photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
