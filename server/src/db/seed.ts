import { db } from "./index.js";
import { tasks } from "./schema.js";

await db
  .insert(tasks)
  .values([
    { title: "Learn React" },
    { title: "Connect Neon" },
    { title: "Create backend", completed: true },
  ]);
