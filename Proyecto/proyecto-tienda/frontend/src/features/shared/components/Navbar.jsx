import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-main.png";
import { useAuth } from "../../../context/UseAuth";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.rol;

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Vida Nova</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Productos</Link>

        {role === "ADMIN" && <Link to="/admin">Admin</Link>}

        {!isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Cerrar sesion</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
