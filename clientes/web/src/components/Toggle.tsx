"use client";

import { Switch } from "@headlessui/react";
import { PiMoonFill, PiSunFill } from "react-icons/pi";

interface props {
  theme: string;
  changeTheme: any;
}

export function ToggleTheme({ theme, changeTheme }: props) {
  return (
    <Switch
      checked={theme === "dark"}
      onChange={changeTheme}
      className={
        theme === "light"
          ? "group relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 toggle-light"
          : "group relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 toggle-dark"
      }
    >
      <span className="sr-only">Use setting</span>
      <span className="pointer-events-none relative inline-block size-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
        >
          <PiSunFill className="text-yellow-300" />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
        >
          <PiMoonFill className="text-slate-600" />
        </span>
      </span>
    </Switch>
  );
}
