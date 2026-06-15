import pool from "../database/connection.js";

export const getLogs = async (
  req,
  res,
) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        l.id,
        u.nombre AS usuario,
        l.ip,
        l.browser,
        l.evento,
        l.fecha_hora
      FROM logs_acceso l
      LEFT JOIN usuarios u
        ON l.usuario_id = u.id
      ORDER BY l.fecha_hora DESC
    `);

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Error obteniendo logs",
    });
  }
};

export const getLogStats = async (
  req,
  res,
) => {
  try {

    const [total] =
      await pool.query(`
        SELECT COUNT(*) total
        FROM logs_acceso
      `);

    const [ingresos] =
      await pool.query(`
        SELECT COUNT(*) total
        FROM logs_acceso
        WHERE evento = 'INGRESO'
      `);

    const [salidas] =
      await pool.query(`
        SELECT COUNT(*) total
        FROM logs_acceso
        WHERE evento = 'SALIDA'
      `);

    res.json({
      total:
        total[0].total,

      ingresos:
        ingresos[0].total,

      salidas:
        salidas[0].total,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Error estadísticas logs",
    });
  }
};