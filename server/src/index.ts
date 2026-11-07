import express, { type Express } from "express";
import cors from "cors";

import { errorHandler } from "./middleware/error-handler.js";
import {
  getUserTasks,
  deleteTask,
  createTask,
  updateTask,
  getTaskPagination,
} from "./controllers/task-controller.js";
import { loginUser } from "./controllers/user-controller.js";

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.delete("/api/tasks/:id", deleteTask);
app.post("/api/users/:id/tasks/", createTask);
app.patch("/api/tasks/:id", updateTask);
app.get("/api/users/:id/tasks", getUserTasks);
app.post("/api/users/login", loginUser);
app.get("/users/:id/tasks", getTaskPagination);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
