import dotenv from "dotenv";
import app from "./app.js";
import pool from "./database/connection.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("Conexión a MySQL exitosa");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error conectando a MySQL");
    console.error(error);
  }
}

startServer();