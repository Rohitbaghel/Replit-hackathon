import type { Express } from "express";
import { createServer, type Server } from "node:http";
import { registerAuthRoutes } from "./routes/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  registerAuthRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
