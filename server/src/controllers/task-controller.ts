import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { tasks as tasksTable } from "../db/schema.js";
import { eq, asc, and, ilike } from "drizzle-orm";
import {
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
  paginationSchema,
  taskFilterSchema,
  taskSearchSchema,
} from "../validators/task-validator.js";

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = taskIdSchema.parse(req.params);
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
  res.json({
    message: "Task deleted successfully",
  });
};
export const createTask = async (req: Request, res: Response) => {
  const { id } = taskIdSchema.parse(req.params);

  const { title } = createTaskSchema.parse(req.body);
  const [result] = await db
    .insert(tasksTable)
    .values({ userId: id, title })
    .returning();
  res.json(result);
};
export const updateTask = async (req: Request, res: Response) => {
  const { id } = taskIdSchema.parse(req.params);
  const { completed } = updateTaskSchema.parse(req.body);
  const [result] = await db
    .update(tasksTable)
    .set({ completed })
    .where(eq(tasksTable.id, id))
    .returning();
  res.json(result);
};
export const getTaskPagination = async (req: Request, res: Response) => {
  const { page } = paginationSchema.parse(req.query);
  const { id } = taskIdSchema.parse(req.params);
  const result = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.userId, id))
    .orderBy(asc(tasksTable.id))
    .limit(10)
    .offset((page - 1) * 10);

  res.json(result);
};

export const getUserTasks = async (req: Request, res: Response) => {
  const { id } = taskIdSchema.parse(req.params);

  const { completed } = taskFilterSchema.parse(req.query);
  const result = await db
    .select()
    .from(tasksTable)
    .where(
      and(
        eq(tasksTable.userId, id),

        completed !== undefined
          ? eq(tasksTable.completed, completed === "true")
          : undefined,
      ),
    )
    .orderBy(asc(tasksTable.id));
  res.json(result);
};

export const getUserTasksByFilter = async (req: Request, res: Response) => {
  const { search } = taskSearchSchema.parse(req.query);
  const { id } = taskIdSchema.parse(req.params);

  const result = await db
    .select()
    .from(tasksTable)
    .where(
      and(eq(tasksTable.userId, id), ilike(tasksTable.title, `%${search}%`)),
    );
  res.json(result);
};
