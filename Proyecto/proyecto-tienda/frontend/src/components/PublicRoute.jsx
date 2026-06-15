import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    if (user.rol === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;