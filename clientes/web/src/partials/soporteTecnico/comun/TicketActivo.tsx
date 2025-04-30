import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
("use client");

import profile from "../../../assets/images/profile.png";

const pages = [
  { name: "Soporte Técnico", current: false },
  { name: "Ticket", current: true },
];

interface props {
  theme: string;
  changeHome: any;
  changeSoporteTecnico: any;
}

export default function Ticket({
  theme,
  changeHome,
  changeSoporteTecnico,
}: props) {
  return (
    <div
      className={
        theme === "light"
          ? "pt-10 bg-slate-100 px-4 sm:px-6 lg:px-8 pb-10"
          : "pt-10 bg-slate-600 px-4 sm:px-6 lg:px-8 pb-10"
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

      <div className="overflow-hidden bg-white shadow-2xl rounded-xl mt-12 mx-60 px-20 py-10">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-3xl font-bold text-sky-700 text-shadow-lg">
            TICKET # 08
          </h3>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Tipo de Ticket
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Solicitud
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                Área de Solicitud
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Programas Computacionales
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Solicitud</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Instalar Programa
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Asunto</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Instalar programa para poder editar PDF
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Detalle</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Buenas tardes, quisiera solicitar que me puedan instalar algún
                programa en el que se puedan editar PDF, ya que es necesario
                para las labores que desempeño en mi oficina.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow-2xl rounded-xl mt-12 mx-60 px-20 py-15">
        <div className="mb-10">
          <div className="bg-sky-500 w-100 rounded-lg py-2 px-3 mb-5">
            <p className="text-white font-medium">
              Hola, que tal? me puede dar su número de inventario?
            </p>
            <p className="justify-self-end text-white text-sm mt-3">17:21</p>
          </div>
          <div className="bg-sky-800 w-100 rounded-lg py-2 px-3 mb-5 justify-self-end">
            <p className="text-white font-medium">
              Hola, si como no. Es el C-7421
            </p>
            <p className="justify-self-end text-white text-sm mt-3">17:22</p>
          </div>
          <div className="bg-sky-500 w-100 rounded-lg py-2 px-3 mb-5">
            <p className="text-white font-medium">
              OK, voy a ingresar a su equipo
            </p>
            <p className="justify-self-end text-white text-sm mt-3">17:25</p>
          </div>
          <div className="bg-sky-800 w-100 rounded-lg py-2 px-3 mb-5 justify-self-end">
            <p className="text-white font-medium">OK, muchas gracias</p>
            <p className="justify-self-end text-white text-sm mt-3">17:25</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 pt-7">
          <div className="shrink-0">
            <img
              alt=""
              src={profile}
              className="inline-block size-10 rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <form action="" className="relative">
              <div className="rounded-lg bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-sky-600">
                <label htmlFor="comment" className="sr-only">
                  Agrega un mensaje
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  placeholder="Escribe un mensaje..."
                  className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  defaultValue={""}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true" className="py-2">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 py-2 pl-3 pr-2">
                <div className="shrink-0">
                  <button
                    type="submit"
                    className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer flex justify-self-end"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={changeSoporteTecnico}
        className="bg-rose-500 p-5 rounded-lg text-white font-bold flex justify-self-center mt-10 cursor-pointer"
      >
        VOLVER
      </button>
    </div>
  );
}
