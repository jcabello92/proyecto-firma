import { InputHTMLAttributes } from "react";

interface props {
  label: string;
  id: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  theme: string;
}

export function Input({ label, id, type, theme }: props) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className={
          theme === "light"
            ? "block text-sm/6 font-medium label-light"
            : "block text-sm/6 font-medium label-dark"
        }
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id}
        className={
          theme === "light"
            ? "block w-full rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 input-light"
            : "block w-full rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 input-dark"
        }
      />
    </div>
  );
}

export function InputRequired({ label, id, type, theme }: props) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className={
          theme === "light"
            ? "block text-sm/6 font-medium label-light"
            : "block text-sm/6 font-medium label-dark"
        }
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={id}
        className={
          theme === "light"
            ? "block w-full rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 input-light"
            : "block w-full rounded-md px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 input-dark"
        }
      />
    </div>
  );
}
