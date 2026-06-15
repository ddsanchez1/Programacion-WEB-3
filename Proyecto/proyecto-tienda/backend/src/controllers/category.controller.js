import pool from "../database/connection.js";

export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        nombre
      FROM categorias
      WHERE activo = TRUE
      ORDER BY nombre
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener categorías",
    });
  }
};
