import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../services/authService";
import { useAuth } from "../../../../context/UseAuth";

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const correo = e.target.correo.value;
    const password = e.target.password.value;

    try {
      const data = await login(correo, password);

      auth.login(data.usuario, data.token);
      // navigate("/admin");
      if (data.usuario.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="login-page">
        <div className="login-card">
          <section className="login-hero">
            <h1>Bienvenido</h1>
            <p>Accede a tu cuenta</p>
          </section>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Correo
              <input name="correo" type="email" placeholder="" required />
            </label>

            <label>
              Contraseña
              <input name="password" type="password" placeholder="" required />
            </label>

            <button type="submit" className="button">
              Entrar
            </button>

            <p className="login-extra">
              ¿No tienes cuenta?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Regístrate
              </span>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
