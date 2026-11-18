import { z } from "zod";

export const loginUserSchema = z.object({
  userName: z.string().trim().min(1).max(50),
});
