import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

import profile from "../../../assets/images/profile.png";

const pages = [
  { name: "Soporte Técnico", current: false },
  { name: "Historial de Tickets", current: true },
];

const tickets = [
  {
    id: "TICKET # 08",
    titulo: "INSTALAR PROGRAMA PARA PODER EDITAR PDF",
    estado: "Activo",
    imageUrl: profile,
    href: "",
    actualizacion: "",
  },
  {
    id: "TICKET # 07",
    titulo: "SOLICITUD DE RECAMBIO DE EQUIPO",
    estado: "Activo",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 12 minutos",
  },
  {
    id: "TICKET # 06",
    titulo: "SOLICITUD DE DATA",
    estado: "Activo",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 1 hora",
  },
  {
    id: "TICKET # 05",
    titulo: "DESBLOQUEO DE PÁGINAS",
    estado: "Finalizado",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 3 horas",
  },
  {
    id: "TICKET # 04",
    titulo: "EQUIPO LENTO",
    estado: "Finalizado",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 6 horas",
  },
  {
    id: "TICKET # 03",
    titulo: "ACTIVACIÓN DE OFFICE",
    estado: "Finalizado",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 1 día",
  },
  {
    id: "TICKET # 02",
    titulo: "ACTUALIZACIÓN DE CAS CHILE",
    estado: "Finalizado",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 1 día",
  },
  {
    id: "TICKET # 01",
    titulo: "ATASCO DE PAPEL EN IMPRESORA",
    estado: "Finalizado",
    imageUrl: profile,
    href: "",
    actualizacion: "Hace 3 días",
  },
];

interface props {
  theme: string;
  changeHome: any;
  changeSoporteTecnico: any;
  changeSoporteTecnicoTicketHistorico: any;
}

export default function HistorialTickets({
  theme,
  changeHome,
  changeSoporteTecnico,
  changeSoporteTecnicoTicketHistorico,
}: props) {
  return (
    <div
      className={
        theme === "light"
          ? "pt-10 bg-slate-100 px-4 sm:px-6 lg:px-8"
          : "pt-10 bg-slate-600 px-4 sm:px-6 lg:px-8"
      }
    >
      <nav aria-label="Breadcrumb" className="flex">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a
                onClick={changeHome}
                className={
                  theme === "light"
                    ? "text-lg title-light cursor-pointer"
                    : "text-lg title-dark cursor-pointer"
                }
              >
                <HomeIcon aria-hidden="true" className="size-7 shrink-0" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-slate-400"
                />
                <a
                  onClick={
                    page.name === "Soporte Técnico"
                      ? changeSoporteTecnico
                      : page.name === "Historial de Tickets"
                      ? ""
                      : ""
                  }
                  aria-current={page.current ? "page" : undefined}
                  className={
                    theme === "light"
                      ? "text-2xl font-bold ml-4 title-light cursor-pointer"
                      : "text-2xl font-bold ml-4 title-dark cursor-pointer"
                  }
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <ul
        role="list"
        className={
          theme === "light"
            ? "divide-y divide-slate-200 bg-white shadow-2xl ring-1 ring-slate-200 rounded-xl tickets-usuario-list overflow-auto mt-12"
            : "divide-y divide-slate-400 bg-slate-200 shadow-2xl ring-1 ring-slate-400 rounded-xl tickets-usuario-list overflow-auto mt-12"
        }
      >
        {tickets.map((person) => (
          <li
            key={person.id}
            className={
              theme === "light"
                ? "relative flex justify-between gap-x-6 px-4 py-5 hover:bg-slate-50 sm:px-6"
                : "relative flex justify-between gap-x-6 px-4 py-5 hover:bg-slate-300 sm:px-6"
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={person.imageUrl}
                className="size-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  <a
                    onClick={changeSoporteTecnicoTicketHistorico}
                    className="cursor-pointer"
                  >
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.id}
                  </a>
                </p>
                <p className="mt-1 flex text-xs/5 text-gray-500">
                  {person.titulo}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  {person.estado === "Finalizado" ? (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-gray-400/20 p-1">
                        <div className="size-1.5 rounded-full bg-gray-400" />
                      </div>
                      <p className="text-sm/6 text-gray-900">{person.estado}</p>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-sm/6 text-gray-900">{person.estado}</p>
                    </div>
                  )}
                </p>
                {person.actualizacion ? (
                  <p className="mt-1 text-xs/5 text-gray-500">
                    Última actualización: {person.actualizacion}
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs/5 text-gray-500">
                      Última actualización: Nunca
                    </p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={changeSoporteTecnico}
        className="bg-rose-500 px-10 py-5 rounded-xl flex justify-self-center mt-10 text-white cursor-pointer font-bold text-lg shadow-2xl hover:bg-rose-400"
      >
        VOLVER
      </button>
    </div>
  );
}
