import { useState } from "react";
import AuthContext from "./AuthContext";
import { logout as logoutRequest } from "../services/authService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (usuario, token) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));

    localStorage.setItem("token", token);

    setUser(usuario);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error registrando logout:", error);
    } finally {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");

      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
