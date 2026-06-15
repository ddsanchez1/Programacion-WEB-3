import { Router } from "express";
import { body } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { verifyHCaptcha } from "../middlewares/hcaptcha.middleware.js";

import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("nombre")
      .trim()
      .notEmpty()
      .withMessage("Nombre obligatorio")
      .isLength({ min: 3 })
      .withMessage("Minimo 3 caracteres"),

    body("correo").isEmail().withMessage("Correo invalido"),

    body("password").isLength({ min: 8 }).withMessage("Minimo 8 caracteres"),

    validateFields,
  ],
  verifyHCaptcha,
  register,
);

router.post(
  "/login",
  [
    body("correo").isEmail().withMessage("Correo invalido"),

    body("password").notEmpty().withMessage("Password obligatorio"),

    validateFields,
  ],
  login,
);

router.get("/profile", verifyToken, profile);

router.post("/logout", verifyToken, logout);

export default router;
