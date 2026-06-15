import pool from "../database/connection.js";

// get
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.categoria_id,
        c.nombre AS categoria,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.activo,
        p.destacado,
        p.fecha_creacion
      FROM productos p
      LEFT JOIN categorias c
        ON p.categoria_id = c.id
      WHERE p.activo = TRUE
      ORDER BY p.id DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        p.id,
        p.categoria_id,
        c.nombre AS categoria,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.activo,
        p.destacado,
        p.fecha_creacion
      FROM productos p
      LEFT JOIN categorias c
        ON p.categoria_id = c.id
      WHERE p.id = ?
      AND p.activo = TRUE
      `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno",
    });
  }
};

// POST
export const createProduct = async (req, res) => {
  try {
    const { categoria_id, nombre, descripcion, precio, stock, imagen } =
      req.body;

    const [result] = await pool.query(
      `
      INSERT INTO productos (
        categoria_id,
        nombre,
        descripcion,
        precio,
        stock,
        imagen
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [categoria_id, nombre, descripcion, precio, stock, imagen],
    );

    res.status(201).json({
      id: result.insertId,
      message: "Producto creado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear producto",
    });
  }
};

// Update
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { categoria_id, nombre, descripcion, precio, stock, imagen } =
      req.body;

    const [result] = await pool.query(
      `
      UPDATE productos
      SET
        categoria_id = ?,
        nombre = ?,
        descripcion = ?,
        precio = ?,
        stock = ?,
        imagen = ?
      WHERE id = ?
      `,
      [categoria_id, nombre, descripcion, precio, stock, imagen, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto actualizado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar",
    });
  }
};

//Delete

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `
      UPDATE productos
      SET activo = FALSE
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto desactivado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar",
    });
  }
};
