"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { BiSupport } from "react-icons/bi";
import { PiArchive } from "react-icons/pi";
import { PiImages } from "react-icons/pi";
import { PiSignature } from "react-icons/pi";

import Home from "../partials/Home";
import Archivo from "../partials/Archivo";
import Calendario from "../partials/Calendario";
import Contactos from "../partials/Contactos";
import FirmaDocumentos from "../partials/FirmarDocumentos/comun/FirmaDocumentos";
import GeneradoresGraficos from "../partials/GeneradoresGraficos";
import Inventario from "../partials/Inventario";
import SoporteTecnicoComunHistorialTickets from "../partials/soporteTecnico/comun/HistorialTickets";
import SoporteTecnicoComunSoporteTecnico from "../partials/soporteTecnico/comun/SoporteTecnico";
import SoporteTecnicoComunNuevoTicket from "../partials/soporteTecnico/comun/NuevoTicket";
import SoporteTecnicoComunTicketActivo from "../partials/soporteTecnico/comun/TicketActivo";
import SoporteTecnicoComunTicketHistorico from "../partials/soporteTecnico/comun/TicketHistorico";
import Tareas from "../partials/Tareas";
import Ajustes from "../partials/Ajustes";
import Perfil from "../partials/Perfil";

import { ToggleTheme } from "../components";

import "../assets/css/colors.css";
import "../assets/css/sizes.css";

import logo_curicode from "../assets/images/curicode/curicode.gif";
import profile from "../assets/images/profile.png";

interface props {
  theme: string;
  changeTheme: any;
}

const navigation = [
  { name: "Home", icon: HomeIcon },
  {
    name: "Archivo",
    icon: PiArchive,
  },
  {
    name: "Firma de Documentos",
    icon: PiSignature,
  },
  {
    name: "Generadores Gráficos",
    icon: PiImages,
  },
  {
    name: "Soporte Técnico",
    icon: BiSupport,
  },
];
const userNavigation = [{ name: "Perfil" }, { name: "Cerrar Sesión" }];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({ theme, changeTheme }: props) {
  if (localStorage.getItem("usuarioIniciado") == "") {
    //window.location.href = "/access";
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [contentActive, setContentActive] = useState(() => {
    const savedContentActive = localStorage.getItem("contentActive");
    return savedContentActive === null ? "Home" : savedContentActive;
  });

  const changeHome = () => {
    setContentActive("Home");
  };

  const changeSoporteTecnico = () => {
    setContentActive("Soporte Técnico");
  };

  const changeSoporteTecnicoHistorialTickets = () => {
    setContentActive("Soporte Técnico - Historial de Tickets");
  };

  const changeSoporteTecnicoNuevoTicket = () => {
    setContentActive("Soporte Técnico - Nuevo Ticket");
  };

  const changeSoporteTecnicoTicketActivo = () => {
    setContentActive("Soporte Técnico - Ticket Activo");
  };

  const changeSoporteTecnicoTicketHistorico = () => {
    setContentActive("Soporte Técnico - Ticket Historico");
  };

  useEffect(() => {
    localStorage.setItem("contentActive", contentActive);

    if (contentActive === "Cerrar Sesión") {
      setContentActive("Home");
      localStorage.setItem("usuarioIniciado", "");
      window.location.href = "/access";
    }
  }, [contentActive]);

  return (
    <div
      className={
        theme === "light"
          ? "min-h-screen bg-slate-100"
          : "min-h-screen bg-slate-600"
      }
    >
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5 cursor-pointer"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div
                className={
                  theme === "light"
                    ? "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 py-10 sidebar-light"
                    : "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 py-10 sidebar-dark"
                }
              >
                <div className="flex h-36 shrink-0 items-center justify-center pb-5">
                  <img
                    alt="Curicode"
                    src={logo_curicode}
                    className="h-36 w-auto"
                  />
                </div>

                <div className="flex justify-center">
                  <ToggleTheme theme={theme} changeTheme={changeTheme} />
                </div>

                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-2">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              onClick={() => setContentActive(item.name)}
                              className={classNames(
                                contentActive === item.name
                                  ? theme === "light"
                                    ? "sidebar-option-light-active"
                                    : "sidebar-option-dark-active"
                                  : theme === "light"
                                  ? "sidebar-option-light"
                                  : "sidebar-option-dark",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  contentActive === item.name
                                    ? "text-white"
                                    : "text-white group-hover:text-white",
                                  "size-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto pt-10 pb-2 -mx-2">
                      <a
                        onClick={() => setContentActive("Ajustes")}
                        className={classNames(
                          contentActive === "Ajustes"
                            ? theme === "light"
                              ? "sidebar-option-light-active"
                              : "sidebar-option-dark-active"
                            : theme === "light"
                            ? "sidebar-option-light"
                            : "sidebar-option-dark",
                          "group flex gap-x-3 rounded-md text-sm/6 font-semibold p-2 cursor-pointer"
                        )}
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-white group-hover:text-white"
                        />
                        Ajustes
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div
            className={
              theme === "light"
                ? "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 py-10 sidebar-light"
                : "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 py-10 sidebar-dark"
            }
          >
            <div className="flex h-36 shrink-0 items-center justify-center pb-5">
              <img alt="Curicode" src={logo_curicode} className="h-36 w-auto" />
            </div>

            <div className="flex justify-center">
              <ToggleTheme theme={theme} changeTheme={changeTheme} />
            </div>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          onClick={() => setContentActive(item.name)}
                          className={classNames(
                            contentActive === item.name
                              ? theme === "light"
                                ? "sidebar-option-light-active"
                                : "sidebar-option-dark-active"
                              : theme === "light"
                              ? "sidebar-option-light"
                              : "sidebar-option-dark",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              contentActive === item.name
                                ? "text-white"
                                : "text-white group-hover:text-white",
                              "size-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto pt-10 pb-2 -mx-2">
                  <a
                    onClick={() => setContentActive("Ajustes")}
                    className={classNames(
                      contentActive === "Ajustes"
                        ? theme === "light"
                          ? "sidebar-option-light-active"
                          : "sidebar-option-dark-active"
                        : theme === "light"
                        ? "sidebar-option-light"
                        : "sidebar-option-dark",
                      "group flex gap-x-3 rounded-md text-sm/6 font-semibold p-2 cursor-pointer"
                    )}
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-white group-hover:text-white"
                    />
                    Ajustes
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72 min-h-screen">
          <div
            className={
              theme === "light"
                ? "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 navbar-light"
                : "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 navbar-dark"
            }
          >
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={
                theme === "light"
                  ? "-m-2.5 p-2.5 lg:hidden cursor-pointer sidebar-open-light"
                  : "-m-2.5 p-2.5 lg:hidden cursor-pointer sidebar-open-dark"
              }
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className={
                theme === "light"
                  ? "h-6 w-px lg:hidden separator-light"
                  : "h-6 w-px lg:hidden separator-dark"
              }
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  id="buscar"
                  name="buscar"
                  type="search"
                  placeholder="Buscar"
                  className={
                    theme === "light"
                      ? "col-start-1 row-start-1 block size-full pl-8 text-base outline-none sm:text-sm/6 search-light"
                      : "col-start-1 row-start-1 block size-full pl-8 text-base outline-none sm:text-sm/6 search-dark"
                  }
                />
                <MagnifyingGlassIcon
                  className={
                    theme === "light"
                      ? "pointer-events-none col-start-1 row-start-1 size-5 self-center search-icon-light"
                      : "pointer-events-none col-start-1 row-start-1 size-5 self-center search-icon-dark"
                  }
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 cursor-pointer">
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    aria-hidden="true"
                    className={
                      theme === "light"
                        ? "size-6 notifications-light"
                        : "size-6 notifications-dark"
                    }
                  />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className={
                    theme === "light"
                      ? "hidden lg:block lg:h-6 lg:w-px separator-light"
                      : "hidden lg:block lg:h-6 lg:w-px separator-dark"
                  }
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5 cursor-pointer">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="Usuario"
                      src={profile}
                      className="size-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className={
                          theme === "light"
                            ? "ml-4 text-sm/6 font-semibold label-light"
                            : "ml-4 text-sm/6 font-semibold label-dark"
                        }
                      >
                        Usuario
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={
                          theme === "light"
                            ? "ml-2 size-5 text-gray-400 hover:text-gray-600"
                            : "ml-2 size-5 text-gray-400 hover:text-gray-200"
                        }
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className={
                      theme === "light"
                        ? "absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dropdown-light"
                        : "absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dropdown-dark"
                    }
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          onClick={() => setContentActive(item.name)}
                          className={
                            theme === "light"
                              ? "block px-3 py-1 text-sm/6 data-[focus]:outline-none dropdown-option-light cursor-pointer"
                              : "block px-3 py-1 text-sm/6 data-[focus]:outline-none dropdown-option-dark cursor-pointer"
                          }
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div>
              {contentActive === "Home" ? (
                <Home theme={theme} />
              ) : contentActive === "Archivo" ? (
                <Archivo theme={theme} />
              ) : contentActive === "Calendario" ? (
                <Calendario theme={theme} />
              ) : contentActive === "Contactos" ? (
                <Contactos theme={theme} />
              ) : contentActive === "Firma de Documentos" ? (
                <FirmaDocumentos theme={theme} />
              ) : contentActive === "Generadores Gráficos" ? (
                <GeneradoresGraficos theme={theme} />
              ) : contentActive === "Inventario" ? (
                <Inventario theme={theme} />
              ) : contentActive === "Soporte Técnico" ? (
                <SoporteTecnicoComunSoporteTecnico
                  theme={theme}
                  changeHome={changeHome}
                  changeSoporteHistorialTickets={
                    changeSoporteTecnicoHistorialTickets
                  }
                  changeSoporteTecnicoNuevoTicket={
                    changeSoporteTecnicoNuevoTicket
                  }
                  changeSoporteTecnicoTicketActivo={
                    changeSoporteTecnicoTicketActivo
                  }
                />
              ) : contentActive === "Soporte Técnico - Historial de Tickets" ? (
                <SoporteTecnicoComunHistorialTickets
                  theme={theme}
                  changeHome={changeHome}
                  changeSoporteTecnico={changeSoporteTecnico}
                  changeSoporteTecnicoTicketHistorico={
                    changeSoporteTecnicoTicketHistorico
                  }
                />
              ) : contentActive === "Soporte Técnico - Nuevo Ticket" ? (
                <SoporteTecnicoComunNuevoTicket
                  theme={theme}
                  changeHome={changeHome}
                  changeSoporteTecnico={changeSoporteTecnico}
                />
              ) : contentActive === "Soporte Técnico - Ticket Activo" ? (
                <SoporteTecnicoComunTicketActivo
                  theme={theme}
                  changeHome={changeHome}
                  changeSoporteTecnico={changeSoporteTecnico}
                />
              ) : contentActive === "Soporte Técnico - Ticket Historico" ? (
                <SoporteTecnicoComunTicketHistorico
                  theme={theme}
                  changeHome={changeHome}
                  changeSoporteTecnico={changeSoporteTecnico}
                  changeSoporteTecnicoHistorialTickets={
                    changeSoporteTecnicoHistorialTickets
                  }
                />
              ) : contentActive === "Tareas" ? (
                <Tareas theme={theme} />
              ) : contentActive === "Ajustes" ? (
                <Ajustes theme={theme} />
              ) : contentActive === "Perfil" ? (
                <Perfil theme={theme} />
              ) : (
                <Home theme={theme} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
