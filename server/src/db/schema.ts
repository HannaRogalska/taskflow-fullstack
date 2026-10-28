import { serial, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean().notNull().default(false),
});
