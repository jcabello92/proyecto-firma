import { ButtonHTMLAttributes } from "react";

interface props {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  theme: string;
}

function iniciarSesion() {
  window.location.href = "/"; // REEMPLAZAR CON HOOK DE NAVEGACIÓN
}

export function Button({ type, label, theme }: props) {
  return (
    <button
      type={type}
      className={
        theme === "light"
          ? "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-light"
          : "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-dark"
      }
    >
      {label}
    </button>
  );
}

export function ButtonIniciarSesion({ type, label, theme }: props) {
  return (
    <button
      type={type}
      onClick={iniciarSesion}
      className={
        theme === "light"
          ? "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-light"
          : "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-dark"
      }
    >
      {label}
    </button>
  );
}
