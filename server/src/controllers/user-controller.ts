import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { users as userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { loginUserSchema } from "../validators/user-validator.js";
export const loginUser = async (req: Request, res: Response) => {
  const { userName } = loginUserSchema.parse(req.body);
  const [getUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.name, userName));
  if (getUser) {
    res.json(getUser);
    return;
  }
  if (!getUser) {
    const [newUser] = await db
      .insert(userTable)
      .values({ name: userName })
      .onConflictDoNothing({ target: userTable.name })
      .returning();
    if (!newUser) {
      res.status(409).json({
        message: "User already exists",
      });
      return;
    }
    res.status(201).json(newUser);
  }
};
