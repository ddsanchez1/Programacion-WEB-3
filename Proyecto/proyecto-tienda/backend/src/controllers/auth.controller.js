import pool from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordStrength } from "../utils/passwordStrength.js";
import { validateRegister } from "../utils/validators.js";

// Registro
export const register = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const nivelPassword = passwordStrength(password);
    const errors = validateRegister({
      nombre,
      correo,
      password,
    });
    const [exists] = await pool.query(
      `
      SELECT id
      FROM usuarios
      WHERE correo = ?
      `,
      [correo],
    );
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        errors,
      });
    }
    
    if (exists.length > 0) {
      return res.status(400).json({
        message: "Correo ya registrado",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `
      INSERT INTO usuarios(
        nombre,
        correo,
        password
      )
      VALUES (?, ?, ?)
      `,
      [nombre, correo, hashedPassword],
    );

    res.status(201).json({
      id: result.insertId,
      message: "Usuario registrado",
      fuerzaPassword: nivelPassword,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al registrar",
    });
  }
};

// Logeo

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const [rows] = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE correo = ?
      AND activo = TRUE
      `,
      [correo],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const user = rows[0];

    console.log("PASSWORD INGRESADA:", password);
    console.log("HASH BD:", user.password);

    const validPassword = await bcrypt.compare(password, user.password);

    console.log("PASSWORD VÁLIDA:", validPassword);

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        uid: user.id,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    const browserInfo = req.headers["user-agent"] || "Desconocido";
    // const browserInfo = `${parser.getBrowser().name} ${parser.getBrowser().version}`;

    const ip = req.ip;
    await pool.query(
      `
        INSERT INTO logs_acceso(
          usuario_id,
          ip,
          browser,
          evento
        )
        VALUES (?, ?, ?, ?)
        `,
      [user.id, ip, browserInfo, "INGRESO"],
    );

    res.json({
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error login",
    });
  }
};

// deslogeo
export const logout = async (req, res) => {
  try {
    const usuario_id = req.user.uid;

    const ip = req.ip;

    const browser = req.headers["user-agent"] || "Desconocido";

    await pool.query(
      `
      INSERT INTO logs_acceso
      (
        usuario_id,
        ip,
        browser,
        evento
      )
      VALUES (?, ?, ?, ?)
      `,
      [usuario_id, ip, browser, "SALIDA"],
    );

    res.json({
      message: "Logout registrado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error logout",
    });
  }
};

// buscar perfil
export const profile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        nombre,
        correo,
        rol,
        fecha_registro
      FROM usuarios
      WHERE id = ?
      `,
      [req.user.uid],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error obteniendo perfil",
    });
  }
};
