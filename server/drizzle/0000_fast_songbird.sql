CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
