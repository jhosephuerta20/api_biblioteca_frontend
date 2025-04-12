import { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams } from "react-router-dom";

import { agregarUsuario, iniciarSesion } from "../services/ServicioUsuarios";

import { RegionesComunas } from "../utils/RegionesComunas";
import Warning from "../components/Warning";

const registroSchema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  apellido: yup.string().required("Apellido es requerido"),
  email: yup.string().email("Email inválido").required("Email es requerido"),
  region: yup.string().required("Selecciona una región"),
  comuna: yup.string().required("Selecciona una comuna"),
  password: yup
    .string()
    .min(8, "Mínimo 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una minúscula")
    .required("Contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

const LoginRegistro = () => {
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const formParam = searchParams.get("form");

  const [warning, setWarning] = useState("");

  const [isActive, setIsActive] = useState(
    formParam === "register" ? "register" : "login"
  );

  const {
    register: registerRegistro,
    handleSubmit: handleRegistroSubmit,
    watch,
    reset,
    formState: { errors: registroErrors },
  } = useForm({
    resolver: yupResolver(registroSchema),
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const selectedRegion = watch("region");

  useEffect(() => {
    setTimeout(() => {
      setWarning("");
    }, 2000);
  }, [warning]);

  const handleRegistro = async (data) => {
    try {
      const { ...userData } = data;
      await agregarUsuario(userData);
      setIsActive("login");
      reset();
      setWarning("aceptRegister");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesion(
        formDataLogin.email,
        formDataLogin.password
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.usuarioId,
          email: data.email,
        })
      );
      window.location.href = "/";
    } catch (error) {
      setError("Email o contraseña incorrectos");
      setFormDataLogin({ email: "", password: "" });
    }
  };

  return (
    <>
      <nav className="p-8 fixed top-0 z-10 w-full bg-slate-50 flex items-center">
        <a
          href="/"
          className="ext-xl lg:text-3xl font-bold text-black font-mono decoration-none"
        >
          MultiServi
        </a>
      </nav>
      {warning && <Warning tipo={warning} />}
      <main className=" min-h-screen pt-[100px] flex justify-center items-center  ">
        <div
          className={`w-xl mx-auto p-5 ${
            registroErrors && "mt-5"
          } bg-white rounded-2xl shadow flex flex-col`}
        >
          <div className="flex justify-between items-center mb-3">
            {isActive === "login" ? (
              <h2 className="text-2xl font-bold">Iniciar Sesion</h2>
            ) : (
              <h2 className="text-2xl font-bold">Crear cuenta</h2>
            )}

            <div className="flex gap-2 p-1 rounded-md bg-slate-100">
              <button
                className={`${
                  isActive === "login" && "bg-white"
                } p-2 rounded-md cursor-pointer`}
                onClick={() => setIsActive("login")}
              >
                Acceder
              </button>
              <button
                className={`${
                  isActive === "register" && "bg-white"
                } p-2 rounded-md cursor-pointer`}
                onClick={() => setIsActive("register")}
              >
                Registrar
              </button>
            </div>
          </div>

          {isActive === "login" ? (
            <>
              <p>Ingresa tus credenciales para acceder a tu cuenta</p>
              {error != "" && <p className="text-red-500">{error}</p>}
              <form className="flex flex-col mt-5" onSubmit={handleSubmitLogin}>
                <label htmlFor="email">Correo Electrónico</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    className="p-2 pl-10 border border-gray-400 rounded-md w-full"
                    type="email"
                    placeholder="Correo Electrónico"
                    value={formDataLogin.email}
                    onChange={(e) =>
                      setFormDataLogin({
                        ...formDataLogin,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <label htmlFor="password" className="mt-4">
                  Contraseña
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    className="p-2 pl-10 border border-gray-400 rounded-md w-full"
                    type="password"
                    placeholder="Contraseña"
                    value={formDataLogin.password}
                    onChange={(e) =>
                      setFormDataLogin({
                        ...formDataLogin,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <button className="bg-black text-white rounded-md p-3 mt-5 hover:opacity-80 cursor-pointer">
                  Iniciar Sesión
                </button>
              </form>
              <p className="text-center text-gray-400 mt-5">
                ¿No tienes una cuenta?{" "}
                <span
                  onClick={() => setIsActive("register")}
                  className="text-black hover:underline cursor-pointer"
                >
                  Registrate
                </span>
              </p>
            </>
          ) : (
            <>
              <p>Completa el formulario para crear tu cuenta</p>
              <form
                className="flex flex-col mt-5 gap-2 "
                onSubmit={handleRegistroSubmit(handleRegistro)}
              >
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    {...registerRegistro("nombre")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.nombre
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Nombre"
                  />
                </div>
                {registroErrors.nombre && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.nombre.message}
                  </p>
                )}

                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    {...registerRegistro("apellido")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.apellido
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Apellido"
                  />
                </div>

                {registroErrors.apellido && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.apellido.message}
                  </p>
                )}

                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    {...registerRegistro("email")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.email
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Correo Electrónico"
                  />
                </div>

                {registroErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.email.message}
                  </p>
                )}

                <div className="relative">
                  <MapPinIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    {...registerRegistro("region")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.region
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    <option value="">Seleccione su distrito</option>
                    {RegionesComunas.map(({ region }) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                {registroErrors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.region.message}
                  </p>
                )}

                <div className="relative">
                  <MapPinIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />

                  {/*
                  Menu desplegable
                   <select
                    {...registerRegistro("comuna")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.comuna
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    disabled={!selectedRegion}
                  >
                    <option value="">Ingrese su dirección</option>
                    {selectedRegion &&
                      RegionesComunas.find(
                        (r) => r.region === selectedRegion
                      )?.comunas.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                  </select> */}
                  <input
                    type="text"
                    {...registerRegistro("comuna")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.comuna
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Ingrese su dirección"
                    disabled={!selectedRegion}
                  />
                </div>

                {registroErrors.comuna && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.comuna.message}
                  </p>
                )}

                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    {...registerRegistro("password")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.password
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Contraseña"
                  />
                </div>
                {registroErrors.password && (
                  <>
                    <p className="text-red-500 text-sm mt-1">
                      {registroErrors.password.message}
                    </p>
                    <div className="text-sm text-gray-600 mt-2">
                      <p>La contraseña debe contener:</p>
                      <ul className="list-disc pl-5">
                        <li
                          className={
                            watch("password")?.length >= 8
                              ? "text-green-500"
                              : ""
                          }
                        >
                          Mínimo 8 caracteres
                        </li>
                        <li
                          className={
                            /(?=.*[A-Z])/.test(watch("password"))
                              ? "text-green-500"
                              : ""
                          }
                        >
                          Al menos una mayúscula
                        </li>
                        <li
                          className={
                            /(?=.*[a-z])/.test(watch("password"))
                              ? "text-green-500"
                              : ""
                          }
                        >
                          Al menos una minúscula
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    {...registerRegistro("confirmPassword")}
                    className={`p-2 pl-10 border rounded-md w-full ${
                      registroErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                    placeholder="Confirmar Contraseña"
                  />
                </div>

                {registroErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registroErrors.confirmPassword.message}
                  </p>
                )}

                <button className="bg-[#4E9408] text-white rounded-md p-3 mt-5 hover:opacity-80 cursor-pointer">
                  Registrarse
                </button>
              </form>
              <p className="text-center text-gray-400 mt-5">
                ¿No tienes una cuenta?{" "}
                <span
                  onClick={() => setIsActive("register")}
                  className="text-black hover:underline cursor-pointer"
                >
                  Registrate
                </span>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default LoginRegistro;
