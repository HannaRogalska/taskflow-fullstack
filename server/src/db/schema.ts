import { relations } from "drizzle-orm";
import {
  serial,
  text,
  boolean,
  pgTable,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean().notNull().default(false),
  userId: integer().references(() => users.id, {
    onDelete: "cascade",
  }),
});
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userTasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
