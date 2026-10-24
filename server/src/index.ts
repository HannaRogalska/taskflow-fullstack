import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const PORT = 3000;

const tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Connect Neon", completed: false },
  { id: 3, title: "Create backend", completed: true },
];
app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
