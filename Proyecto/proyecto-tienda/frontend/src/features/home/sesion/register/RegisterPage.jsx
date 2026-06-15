import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../../services/authService";
import { passwordStrength } from "./utils/passwordUtils";

import HCaptcha from "@hcaptcha/react-hcaptcha";

function RegisterPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [captchaToken, setCaptchaToken] = useState("");

  const strength = passwordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!captchaToken) {
      alert("Completa el CAPTCHA");
      return;
    }
    try {
      await register(nombre, correo, password, captchaToken);

      alert("Usuario registrado");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="login-page">
        <div className="login-card">
          <section className="login-hero">
            <h1>Registro</h1>
            <p>Crea una cuenta</p>
          </section>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Nombre
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </label>

            <label>
              Correo
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <small>Fortaleza: {strength}</small>

            <label>
              Confirmar contraseña
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <HCaptcha
              sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
            />
            <button type="submit" className="button">
              Registrarse
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RegisterPage;
