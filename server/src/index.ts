import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { db } from "./db/index.js";
import { tasks as tasksTable, users as userTable } from "./db/schema.js";
import { eq, asc } from "drizzle-orm";
const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req: Request, res: Response) => {
  const result = await db.select().from(tasksTable).orderBy(asc(tasksTable.id));
  res.json(result);
});

app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
  res.json({
    message: "Task deleted successfully",
  });
});
app.post("/api/tasks/", async (req: Request, res: Response) => {
  const { title } = req.body;
  const [result] = await db.insert(tasksTable).values({ title }).returning();
  res.json(result);
});
app.patch("/api/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { completed } = req.body;
  const [result] = await db
    .update(tasksTable)
    .set({ completed })
    .where(eq(tasksTable.id, id))
    .returning();
  res.json(result);
});
app.get("/api/users/:id/tasks", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const result = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.userId, userId))
    .orderBy(asc(tasksTable.id));
  res.json(result);
});
app.get("/api/users/login/:name", async (req: Request, res: Response) => {
  const userName = req.params.name;
  if (typeof userName !== "string") {
    res.status(400).json({ message: "Invalid username" });
    return;
  }
  const [getUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.name, userName));
  if (!getUser) return res.json({ message: "User not found" });
  res.json(getUser);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
