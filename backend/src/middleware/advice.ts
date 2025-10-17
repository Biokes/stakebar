// advice.middleware.ts
import { Request, Response, NextFunction } from "express";
import { YeildFiException } from "../exception/index.error";

export const handleError = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof YeildFiException) {
    res.status(400).json({
      success: false,
      message: err.getErrorMessage(),
      description: err.getErrorDescription(),
      errorPath: req.url,
    });
    return;
  }
  const error = err as Error;
  res.status(500).json({
    success: false,
    message: error.message || "An unexpected error occurred",
    description: process.env.NODE_ENV === 'production' 
      ? "Internal server error" 
      : (error.stack || "No stack trace available"),
    errorPath: req.url,
  });
};
