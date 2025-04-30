import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import profile from "../../../assets/images/profile.png";

const pages = [{ name: "Soporte Técnico", current: true }];
const tabs = [
  { name: "Principal", href: "", current: true },
  { name: "Estadísticas", href: "", current: false },
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
  changeSoporteHistorialTickets: any;
  changeSoporteTecnicoNuevoTicket: any;
  changeSoporteTecnicoTicketActivo: any;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function cargarTicketsActivos() {
  axios
    .post("http://localhost:8000/api/medios", {
      rut: (document.getElementById("rut") as HTMLInputElement).value,
      nombre: (document.getElementById("nombre") as HTMLInputElement).value,
      telefono: (document.getElementById("telefono") as HTMLInputElement).value,
      correo: (document.getElementById("correo") as HTMLInputElement).value,
      medio: (document.getElementById("medio") as HTMLInputElement).value,
      cargo: (document.getElementById("cargo") as HTMLInputElement).value,
    })
    .then(function (response) {
      if (
        response.data != "No se enviaron todos los datos requeridos." &&
        response.data != "No se pudo registrar el elemento en el sistema."
      ) {
        // CARGA UNA FOTO
        const formData = new FormData();
        const foto: FileList | null = (
          document.getElementById("foto") as HTMLInputElement
        ).files;
        if (foto !== null && foto !== undefined) {
          formData.append("foto", foto[0]);
        } else {
          //ERROR NO HAY FOTO...
        }
        axios
          .post(
            "http://localhost:8000/api/medios/loadphoto/" + response.data,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then(function (response2) {
            console.log(response2);
          })
          .catch(function (error2) {
            console.log(error2);
          });
        // CARGA UNA CARTA
        const formData2 = new FormData();
        const carta: FileList | null = (
          document.getElementById("carta") as HTMLInputElement
        ).files;
        if (carta !== null && carta !== undefined) {
          formData2.append("carta", carta[0]);
        } else {
          //ERROR NO HAY FOTO...
        }
        axios
          .post(
            "http://localhost:8000/api/medios/loadletter/" + response.data,
            formData2,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then(function (response2) {
            console.log(response2);
          })
          .catch(function (error2) {
            console.log(error2);
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function SoporteTecnico({
  theme,
  changeHome,
  changeSoporteHistorialTickets,
  changeSoporteTecnicoNuevoTicket,
  changeSoporteTecnicoTicketActivo,
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

      <div className="mt-5 px-10">
        <div className="grid grid-cols-1 sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            defaultValue={tabs.map((tab) => (tab.current ? tab.name : ""))} // SOLUCIONAR ERROR
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-slate-500"
          />
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-transparent">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? theme === "light"
                        ? "border-sky-500 text-sky-500"
                        : "border-sky-300 text-sky-300"
                      : theme === "light"
                      ? "border-transparent text-slate-800 hover:border-sky-400 hover:text-sky-400"
                      : "border-transparent text-white hover:border-sky-200 hover:text-sky-200",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-md font-medium"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="h-auto w-auto grid grid-cols-3 gap-4">
        <div className="h-full col-span-1 grid grid-rows-2 pt-10">
          <div className="row-span-1 content-end mb-10">
            <div
              onClick={changeSoporteTecnicoNuevoTicket}
              className={
                theme === "light"
                  ? "bg-sky-500 hover:bg-sky-400 shadow-2xl h-50 mx-10 rounded-3xl flex justify-center items-center cursor-pointer"
                  : "bg-sky-600 hover:bg-sky-500 shadow-2xl h-50 mx-10 rounded-3xl flex justify-center items-center cursor-pointer"
              }
            >
              <p className="text-white text-3xl font-bold">
                CREAR UN NUEVO TICKET
              </p>
            </div>
          </div>
          <div className="row-span-1 content-start mt-10">
            <div
              onClick={changeSoporteHistorialTickets}
              className={
                theme === "light"
                  ? "bg-rose-500 hover:bg-rose-400 shadow-2xl h-50 mx-10 rounded-3xl flex justify-center items-center cursor-pointer"
                  : "bg-rose-600 hover:bg-rose-500 shadow-2xl h-50 mx-10 rounded-3xl flex justify-center items-center cursor-pointer"
              }
            >
              <p className="text-white text-3xl font-bold">
                HISTORIAL DE TICKETS
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 pb-10 px-10 h-full flex flex-col">
          <div
            className={
              theme === "light"
                ? "text-slate-800 flex justify-center content-center text-3xl font-bold py-5 -mt-5"
                : "text-white flex justify-center content-center text-3xl font-bold py-5 -mt-5"
            }
          >
            TICKETS ACTIVOS
          </div>

          <ul
            role="list"
            className={
              theme === "light"
                ? "divide-y divide-slate-200 bg-white shadow-xl ring-1 ring-slate-200 rounded-xl tickets-usuario-list overflow-auto"
                : "divide-y divide-slate-400 bg-slate-200 shadow-xl ring-1 ring-slate-400 rounded-xl tickets-usuario-list overflow-auto"
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
                        onClick={changeSoporteTecnicoTicketActivo}
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
                          <p className="text-sm/6 text-gray-900">
                            {person.estado}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-sm/6 text-gray-900">
                            {person.estado}
                          </p>
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
        </div>
      </div>
    </div>
  );
}
