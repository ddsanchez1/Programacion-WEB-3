import express from "express";
import cors from "cors";

import authRoutes from "./routers/auth.routes.js";
import productRoutes from "./routers/product.routes.js";
import logsRoutes from "./routers/logs.routes.js";
import categoryRoutes from "./routers/category.routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/productos", productRoutes);
app.use("/auth", authRoutes);
app.use("/logs", logsRoutes);
app.use("/categories", categoryRoutes);

export default app;