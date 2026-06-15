import { Router } from "express";

import {
  getLogs,
  getLogStats,
} from "../controllers/logs.controller.js";

import {
  verifyToken,
  isAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  isAdmin,
  getLogs,
);

router.get(
  "/stats",
  verifyToken,
  isAdmin,
  getLogStats,
);

export default router;