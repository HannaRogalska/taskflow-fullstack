import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { tasks as tasksTable, users as usersTable } from "../db/schema.js";
import { eq, asc, and, ilike, count, gt, inArray } from "drizzle-orm";
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
  const [deletedTask] = await db
    .delete(tasksTable)
    .where(eq(tasksTable.id, id))
    .returning({ id: tasksTable.id });

  if (!deletedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
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
  if (!result) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
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
  const countTasks = await db
    .select({
      completed: tasksTable.completed,
      total: count(),
    })
    .from(tasksTable)
    .where(eq(tasksTable.userId, id))
    .groupBy(tasksTable.completed);

  const totalCompleted =
    countTasks.find((i) => i.completed === true)?.total ?? 0;
  const totalActive = countTasks.find((i) => i.completed === false)?.total ?? 0;
  const allCountTasks = totalCompleted + totalActive;

  res.json({
    result,
    countTasks,
    allCountTasks,
  });
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

export const statisticActiveTask = async (req: Request, res: Response) => {
  const result = await db
    .select({
      userId: tasksTable.userId,
      total: count(),
      name: usersTable.name,
    })
    .from(tasksTable)
    .innerJoin(usersTable, eq(tasksTable.userId, usersTable.id))
    .where(eq(tasksTable.completed, false))
    .groupBy(tasksTable.userId, usersTable.id)
    .having(gt(count(), 2));
  res.json(result);
};

export const getTasksFromActiveUsers = async (req: Request, res: Response) => {
  const id = db
    .select({ id: tasksTable.userId })
    .from(tasksTable)
    .where(eq(tasksTable.completed, false));
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(inArray(tasksTable.userId, id));
  res.json(tasks);
};
