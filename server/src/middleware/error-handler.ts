import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: err.issues,
    });
    return;
  }
  if (err?.code === "23505" || err?.cause?.code === "23505") {
    res.status(409).json({
      message: "Resource already exists",
    });
    return;
  }
  res.status(500).json({
    message: "Something went wrong",
  });
};
