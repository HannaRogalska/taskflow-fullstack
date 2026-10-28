import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { db } from "./db/index.js";
import { tasks as tasksTable } from "./db/schema.js";
import { eq } from "drizzle-orm";
const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req: Request, res: Response) => {
  const result = await db.select().from(tasksTable);
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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
