import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  verifyToken,
  isAdmin,
  [
    body("categoria_id").isInt().withMessage("Categoria invalida"),

    body("nombre")
      .notEmpty()
      .withMessage("Nombre obligatorio")
      .isLength({ min: 3, max: 150 }),

    body("descripcion").notEmpty().withMessage("Descripcion obligatoria"),

    body("precio").isFloat({ min: 0 }).withMessage("Precio invalido"),

    body("stock").isInt({ min: 0 }).withMessage("Stock invalido"),

    validateFields,
  ],
  createProduct,
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  [
    body("categoria_id").isInt(),

    body("nombre").notEmpty(),

    body("precio").isFloat({ min: 0 }),

    body("stock").isInt({ min: 0 }),

    validateFields,
  ],
  updateProduct,
);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);
export default router;
