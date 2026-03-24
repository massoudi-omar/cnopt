import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./ctx/AuthContext";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./ctx/ThemeContext";
import "./index.css"
import { AlertProvider } from "./ctx/AlertContext";
import { ToastProvider } from "./ctx/ToastContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <AlertProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </ToastProvider>
  </React.StrictMode>
);
