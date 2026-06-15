//import React from "react";
import ReactDOM from "react-dom/client";
import "./features/styles/index.css";
import Router from "./app/router";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router />
   </AuthProvider>
);