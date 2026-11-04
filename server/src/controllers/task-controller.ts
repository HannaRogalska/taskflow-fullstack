import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { tasks as tasksTable } from "../db/schema.js";
import { eq, asc } from "drizzle-orm";

export const getUserTasks = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const result = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.userId, userId))
    .orderBy(asc(tasksTable.id));

  res.json(result);
};
export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
  res.json({
    message: "Task deleted successfully",
  });
};
export const createTask = async (req: Request, res: Response) => {
  const getedUserId = Number(req.params.id);
  const { title } = req.body;
  const [result] = await db
    .insert(tasksTable)
    .values({ userId: getedUserId, title })
    .returning();
  res.json(result);
};
export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { completed } = req.body;
  const [result] = await db
    .update(tasksTable)
    .set({ completed })
    .where(eq(tasksTable.id, id))
    .returning();
  res.json(result);
};
