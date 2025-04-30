import { Route, Routes } from "react-router-dom";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === null ? "light" : savedTheme;
  });

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [usuarioIniciado, setUsuarioIniciado] = useState(() => {
    const savedUsuarioIniciado = localStorage.getItem("usuarioIniciado");
    return savedUsuarioIniciado === null ? "" : savedUsuarioIniciado;
  });

  useEffect(() => {
    localStorage.setItem("usuarioIniciado", usuarioIniciado);
  }, [usuarioIniciado]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard theme={theme} changeTheme={changeTheme} />}
      />
      <Route
        path="/access"
        element={<Access theme={theme} changeTheme={changeTheme} />}
      />
    </Routes>
  );
}
