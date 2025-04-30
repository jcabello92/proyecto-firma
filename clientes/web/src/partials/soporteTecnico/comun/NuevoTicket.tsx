import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const pages = [
  { name: "Soporte Técnico", current: false },
  { name: "Nuevo Ticket", current: true },
];

interface props {
  theme: string;
  changeHome: any;
  changeSoporteTecnico: any;
}

export default function NuevoTicket({
  theme,
  changeHome,
  changeSoporteTecnico,
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
                  className="size-5 shrink-0 text-gray-400"
                />
                <a
                  onClick={
                    page.name === "Soporte Técnico"
                      ? changeSoporteTecnico
                      : page.name === "Nuevo Ticket"
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

      <form className="px-10 py-10">
        <div className="space-y-12">
          <div className="pb-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="tipo"
                  className={
                    theme === "light"
                      ? "block text-sm font-bold text-slate-800"
                      : "block text-sm font-bold text-slate-100"
                  }
                >
                  Tipo de ticket
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="tipo"
                    name="tipo"
                    autoComplete="tipo"
                    className={
                      theme === "light"
                        ? "col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 curdor-pointer"
                        : "col-start-1 row-start-1 w-full appearance-none rounded-md bg-slate-500 py-1.5 pl-3 pr-8 text-base text-slate-100 outline outline-1 -outline-offset-1 outline-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6 cursor-pointer"
                    }
                  >
                    <option>Solicitud</option>
                    <option>Felicitación</option>
                    <option>Reclamo</option>
                    <option>Sugerencia</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={
                      theme === "light"
                        ? "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-500 sm:size-4"
                        : "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-300 sm:size-4"
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="seccion"
                  className={
                    theme === "light"
                      ? "block text-sm font-bold text-slate-800"
                      : "block text-sm font-bold text-slate-100"
                  }
                >
                  Área de solicitud
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="seccion"
                    name="seccion"
                    autoComplete="seccion"
                    className={
                      theme === "light"
                        ? "col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 curdor-pointer"
                        : "col-start-1 row-start-1 w-full appearance-none rounded-md bg-slate-500 py-1.5 pl-3 pr-8 text-base text-slate-100 outline outline-1 -outline-offset-1 outline-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6 cursor-pointer"
                    }
                  >
                    <option>Aires Acondicionados</option>
                    <option>Anexos (Teléfonos Fijos)</option>
                    <option>CAS Chile</option>
                    <option>Celulares</option>
                    <option>Ciberseguridad</option>
                    <option>Computadores, Teclados y Mouses</option>
                    <option>Cotizaciones</option>
                    <option>Desarrollo de Sistemas</option>
                    <option>Impresoras, Escáneres y Plotters</option>
                    <option>Página Web (curico.cl)</option>
                    <option>
                      Presentaciones, Reuniones y Concejo Municipal
                    </option>
                    <option>Programas Computacionales</option>
                    <option>Redes y Cámaras de Seguridad</option>
                    <option>Transformación Digital</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={
                      theme === "light"
                        ? "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-500 sm:size-4"
                        : "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-300 sm:size-4"
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="tematica"
                  className={
                    theme === "light"
                      ? "block text-sm font-bold text-slate-800"
                      : "block text-sm font-bold text-slate-100"
                  }
                >
                  Solicitud
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="tematica"
                    name="tematica"
                    autoComplete="tematica"
                    className={
                      theme === "light"
                        ? "col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6 curdor-pointer"
                        : "col-start-1 row-start-1 w-full appearance-none rounded-md bg-slate-500 py-1.5 pl-3 pr-8 text-base text-slate-100 outline outline-1 -outline-offset-1 outline-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6 cursor-pointer"
                    }
                  >
                    <option>Actualización de Permisos</option>
                    <option>Actualización de Sistema</option>
                    <option>Creación de Usuario</option>
                    <option>Desinstalación de Sistema</option>
                    <option>Instalación de Sistema</option>
                    <option>Problema con Sistema</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={
                      theme === "light"
                        ? "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-500 sm:size-4"
                        : "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-slate-300 sm:size-4"
                    }
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="titulo"
                  className={
                    theme === "light"
                      ? "block text-sm font-bold text-slate-800"
                      : "block text-sm font-bold text-slate-100"
                  }
                >
                  Asunto
                </label>
                <div className="mt-2">
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    autoComplete="titulo"
                    className={
                      theme === "light"
                        ? "resize-none w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                        : "resize-none w-full rounded-md bg-slate-500 px-3 py-1.5 text-base text-slate-100 outline outline-1 -outline-offset-1 outline-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                    }
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="descripcion"
                  className={
                    theme === "light"
                      ? "block text-sm font-bold text-slate-800"
                      : "block text-sm font-bold text-slate-100"
                  }
                >
                  Detalle
                </label>
                <p
                  className={
                    theme === "light"
                      ? "mt-1 text-sm/6 text-slate-600"
                      : "mt-1 text-sm/6 text-slate-300"
                  }
                >
                  Indicar el número de inventario del computador de ser
                  necesario.
                </p>
                <div className="mt-2">
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={5}
                    className={
                      theme === "light"
                        ? "resize-none w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                        : "resize-none w-full rounded-md bg-slate-500 px-3 py-1.5 text-base text-slate-100 outline outline-1 -outline-offset-1 outline-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                    }
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={changeSoporteTecnico}
            className={
              theme === "light"
                ? "text-sm/6 font-semibold text-slate-800 cursor-pointer"
                : "text-sm/6 font-semibold text-slate-100 cursor-pointer"
            }
          >
            Cancelar
          </button>
          <button
            type="button"
            className={
              theme === "light"
                ? "rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer"
                : "rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 cursor-pointer"
            }
          >
            Enviar Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
