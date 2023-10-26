import { Express, Router } from "express";
import fg from "fast-glob";

export const setRoutes = (server: Express) => {
  const router = Router();
  server.use("/api", router);

  fg.sync("**/src/main/routes/**routes.ts").forEach(async (file) => {
    (await import(`../../../${file}`)).default(router);
  });
};
