import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

const pages = [{ name: "Perfil", href: "", current: true }];

interface props {
  theme: string;
}

export default function Perfil({ theme }: props) {
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
                href=""
                className={
                  theme === "light"
                    ? "text-lg title-light"
                    : "text-lg title-dark"
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
                  href={page.href}
                  aria-current={page.current ? "page" : undefined}
                  className={
                    theme === "light"
                      ? "text-2xl font-bold ml-4 title-light"
                      : "text-2xl font-bold ml-4 title-dark"
                  }
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
