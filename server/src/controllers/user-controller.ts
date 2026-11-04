import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { users as userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
export const loginUser = async (req: Request, res: Response) => {
  const { userName } = req.body;
  if (typeof userName !== "string") {
    res.status(400).json({ message: "Invalid username" });
    return;
  }
  const [getUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.name, userName));
  if (!getUser) {
    const [newUser] = await db
      .insert(userTable)
      .values({ name: userName })
      .returning();
    res.status(201).json(newUser);
    return;
  }

  res.json(getUser);
};
