import { z } from "zod";
export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(3),
});
export const updateTaskSchema = z.object({
  completed: z.boolean(),
});
