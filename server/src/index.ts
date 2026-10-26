import express, { type Express, type Request, type Response } from "express";
import { taskType } from "./types/type.js";
import cors from "cors";
const app: Express = express();
const PORT = 3000;

let tasks: taskType[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Connect Neon", completed: false },
  { id: 3, title: "Create backend", completed: true },
];
app.use(cors());

app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((prev) => id !== prev.id);
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
