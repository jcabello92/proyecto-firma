import axios from "axios";
import { InputRequired, ToggleTheme } from "../components/index";
import logo_curicode from "../assets/images/curicode/curicode.gif";
import { Md5 } from "ts-md5";
import "../assets/css/colors.css";

interface props {
  theme: string;
  changeTheme: any;
}

function iniciarSesion() {
  if (validarDatos()) {
    var contrasena = Md5.hashStr(
      (document.getElementById("contrasena") as HTMLInputElement).value
    );

    axios
      .get("http://localhost:8000/api/comun/usuarios/login", {
        params: {
          usuario: (document.getElementById("usuario") as HTMLInputElement)
            .value,
          contrasena: contrasena,
        },
      })
      .then(function (response) {
        if (
          response.data !=
          "No se encontró el elemento registrado en el sistema."
        ) {
          localStorage.setItem("usuarioIniciado", response.data[0].id);
          window.location.href = "/";
        } else {
          localStorage.setItem("usuarioIniciado", "");
          window.location.href = "/access";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function validarDatos() {
  var usuario = (document.getElementById("usuario") as HTMLInputElement).value;
  var contrasena = (document.getElementById("contrasena") as HTMLInputElement)
    .value;

  if (usuario.length < 6 || usuario.length > 30) {
    console.log("Error en usuario.");
    return false;
  }
  if (contrasena.length < 8 || contrasena.length > 40) {
    console.log("Error en contraseña.");
    return false;
  }
  return true;
}

export default function Access({ theme, changeTheme }: props) {
  if (localStorage.getItem("usuarioIniciado") != "") {
    window.location.href = "/";
  }

  return (
    <div
      id="access_page"
      className={
        theme === "light"
          ? "min-h-screen flex justify-center items-center bg-light"
          : "min-h-screen flex justify-center items-center bg-dark"
      }
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Curicode"
            src={logo_curicode}
            className="mx-auto h-48 w-auto"
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
          <form action="" method="POST" className="space-y-10">
            <div className="space-y-2">
              <InputRequired
                label="Usuario"
                id="usuario"
                type="text"
                theme={theme}
              />
              <div className="space-y-2">
                <InputRequired
                  label="Contraseña"
                  id="contrasena"
                  type="password"
                  theme={theme}
                />
                <div className="text-sm flex justify-end">
                  <a
                    href=""
                    className={
                      theme === "light"
                        ? "font-semibold link-light"
                        : "font-semibold link-dark"
                    }
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={iniciarSesion}
              className={
                theme === "light"
                  ? "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-light"
                  : "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus:outline focus:outline-2 focus:outline-offset-2 cursor-pointer button-dark"
              }
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="flex justify-center pt-10">
          <ToggleTheme theme={theme} changeTheme={changeTheme} />
        </div>
      </div>
    </div>
  );
}
