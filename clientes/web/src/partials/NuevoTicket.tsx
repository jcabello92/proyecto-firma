import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface props {
  theme: string;
}

export default function SoporteTecnico({ theme }: props) {
  return (
    <div>
      <h1
        className={
          theme === "light"
            ? "text-4xl font-bold title-light"
            : "text-4xl font-bold title-dark"
        }
      >
        Soporte Técnico
      </h1>

      <form className="px-10 pb-5">
        <div className="space-y-12">
          <div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="usuario"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Usuario Solicitante
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="area"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Área
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="area"
                    name="area"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>Área 1</option>
                    <option>Área 2</option>
                    <option>Área 3</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="categoria"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Categoría
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="categoria"
                    name="categoria"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>Categoría 1</option>
                    <option>Categoría 2</option>
                    <option>Categoría 3</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="urgencia"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nivel de Urgencia
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="urgencia"
                    name="urgencia"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>Nivel 1</option>
                    <option>Nivel 2</option>
                    <option>Nivel 3</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="titulo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Título
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="titulo"
                      name="titulo"
                      type="text"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="detalles"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Detalles
                </label>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Redacta en detalle el problema.
                </p>
                <div className="mt-2">
                  <textarea
                    id="detalles"
                    name="detalles"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Enviar Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
