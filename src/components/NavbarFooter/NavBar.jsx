import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { getAuthHeaders } from "../../utils/api";

const MenuItems = () => (
  <div className="flex flex-col xl:flex-row items-center gap-5">
    <Link
      to="/"
      className="hover:scale-105 text-lg duration-100 ease-in-out cursor-pointer"
    >
      Inicio
    </Link>
    <Link
      to="/categorias"
      className="hover:scale-105 text-lg duration-100 ease-in-out cursor-pointer"
    >
      Categorías
    </Link>
    <Link
      to="/marketplace"
      className="hover:scale-105 text-lg duration-100 ease-in-out cursor-pointer"
    >
      Libros
    </Link>
    <a
      href="/#como-funciona"
      className="text-lg hover:scale-105 duration-100 ease-in-out cursor-pointer"
    >
      Cómo Funciona
    </a>
  </div>
);

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSesionActive, setIsSesionActive] = useState("");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [notificaciones, setNotificaciones] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getCurrentUser } = useUser();
  const user = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSesionActive(!!token);
  }, []);

  const handleVerChat = (emisor, receptor) => {
    navigate(`/chat?emisor=${emisor}&receptor=${receptor}`);
  };

  const fetchNotificaciones = async () => {
    if (isSesionActive) {
      try {
        setLoading(true);

        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/notificaciones/usuario/${+user.id}`,
          getAuthHeaders()
        );
        console.log(response);
        setNotificaciones(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [isSesionActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSesionActive) fetchNotificaciones();
    }, 30000);

    return () => clearInterval(interval);
  }, [isSesionActive]);

  const handleResponder = async (notificacionId, truequeId, aceptar) => {
    console.log(notificacionId, truequeId, aceptar);
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/trueques/${truequeId}/responder?aceptar=${aceptar}`,
        {},
        getAuthHeaders()
      );

      setNotificaciones((prev) => prev.filter((n) => n.id !== notificacionId));
    } catch (error) {
      console.error("Error al responder:", error);
    }
  };

  const marcarComoLeida = async (notificacionId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/notificaciones/${notificacionId}/marcar-leida`,
        {},
        getAuthHeaders()
      );
      setNotificaciones((prev) => prev.filter((n) => n.id !== notificacionId));
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white w-full">
      <div className="flex items-center justify-between p-4 lg:pe-6 lg:ps-6">
        <h1 className="text-xl lg:text-3xl font-bold text-black font-mono">
          <a href="/">Letras Vivas</a>
        </h1>

        <div className="hidden xl:flex justify-between gap-5 font-medium">
          <MenuItems />
        </div>

        <div className="hidden xl:flex gap-2">
          {isSesionActive ? (
            <>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full cursor-pointer hover:bg-gray-100 relative"
              >
                <BellIcon className="h-6 w-6 text-gray-600" />
                {notificaciones.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {notificaciones.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-5 mt-2 w-96 z-100 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Notificaciones
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-2 rounded-full absolute top-2 right-2 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-600" />
                  </button>
                  <div className="max-h-96 w-full overflow-y-auto">
                    {loading && (
                      <div className="p-4 text-center text-gray-500">
                        Cargando...
                      </div>
                    )}

                    {!loading && notificaciones.length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        No hay nuevas notificaciones
                      </div>
                    )}

                    {notificaciones.map((notificacion) => (
                      <div
                        key={notificacion.id}
                        className="p-4 w-full hover:bg-gray-50"
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex-1 w-full">
                            {notificacion.tipo === "SOLICITUD_TRUQUE" && (
                              <p className="text-sm font-medium text-gray-900">
                                {
                                  notificacion.truequeDTO
                                    .usuarioInteresadoNombre
                                }{" "}
                                quiere intercambiar:
                                <span className="text-blue-600">
                                  {" "}
                                  {
                                    notificacion.truequeDTO
                                      .productoInteresadoNombre
                                  }
                                </span>
                              </p>
                            )}

                            {notificacion.tipo === "TRUEQUE_ACEPTADO" && (
                              <div className="flex flex-col w-full">
                                <p className="text-sm font-medium text-green-600">
                                  ¡Trueque aceptado!
                                  <span className="text-gray-900">
                                    {" "}
                                    {
                                      notificacion.truequeDTO
                                        .productoPublicadorNombre
                                    }
                                  </span>
                                </p>
                                <button
                                  onClick={() =>
                                    handleVerChat(
                                      notificacion.truequeDTO
                                        .usuarioInteresadoId,
                                      notificacion.truequeDTO
                                        .usuarioPublicadorId
                                    )
                                  }
                                  className="bg-blue-100 hover:bg-blue-200 cursor-pointer flex gap-1 justify-center text-sm items-center w-1/2 p-1 rounded-full"
                                >
                                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-600" />
                                  Enviar mensaje
                                </button>
                              </div>
                            )}

                            {notificacion.tipo === "TRUEQUE_RECHAZADO" && (
                              <p className="text-sm font-medium text-red-600">
                                Trueque rechazado:
                                <span className="text-gray-900">
                                  {" "}
                                  {
                                    notificacion.truequeDTO
                                      .productoInteresadoNombre
                                  }
                                </span>
                              </p>
                            )}

                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(
                                notificacion.fechaCreacion
                              ).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>

                            {notificacion.tipo === "SOLICITUD_TRUQUE" && (
                              <div className="mt-3 flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleResponder(
                                      notificacion.id,
                                      notificacion.truequeDTO.trueque_id,
                                      true
                                    )
                                  }
                                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 cursor-pointer"
                                >
                                  Aceptar
                                </button>
                                <button
                                  onClick={() =>
                                    handleResponder(
                                      notificacion.id,
                                      notificacion.truequeDTO.trueque_id,
                                      false
                                    )
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 cursor-pointer"
                                >
                                  Rechazar
                                </button>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => marcarComoLeida(notificacion.id)}
                            className="ml-4 text-gray-400 hover:text-white hover:bg-red-500 w-6 h-6 rounded-full"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <a
                href="/favoritos"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <HeartIcon className="w-7 h-7 text-gray-700" />
              </a>
              <Link to="/perfil" className="p-2 hover:bg-gray-100 rounded-full">
                <UserIcon className="w-7 h-7 text-gray-700" />
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 flex gap-1 cursor-pointer justify-center items-center hover:bg-gray-100 rounded-full"
              >
                Cerrar sesión{" "}
                <ArrowRightStartOnRectangleIcon className="w-7 h-7 text-gray-700" />
              </button>
            </>
          ) : (
            <>
              <a
                href="/loginregistro?form=login"
                className="rounded-lg border border-gray-400 text-black p-3 pe-5 ps-5 hover:bg-slate-100 duration-200 cursor-pointer"
              >
                Iniciar Sesión
              </a>
              <a
                href="/loginregistro?form=register"
                className="bg-[#4E9408] rounded-lg p-3 pe-5 ps-5 text-white hover:bg-slate-900 duration-200 cursor-pointer"
              >
                Registrarse
              </a>
            </>
          )}
        </div>

        <div className="xl:hidden w-8 h-8 items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XMarkIcon className="w-8 cursor-pointer h-8" />
            ) : (
              <Bars3Icon className="w-8 cursor-pointer h-8" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="xl:hidden flex flex-col items-center gap-4 pb-4">
          <MenuItems />
          {isSesionActive ? (
            <>
              <a
                href="/favoritos"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <HeartIcon className="w-7 h-7 text-gray-700" />
              </a>
              <a href="/Perfil" className="p-2 hover:bg-gray-100 rounded-full">
                <UserIcon className="w-7 h-7 text-gray-700" />
              </a>
              <button
                onClick={handleLogout}
                className="p-2 flex gap-1 cursor-pointer justify-center items-center hover:bg-gray-100 rounded-full"
              >
                Cerrar sesión{" "}
                <ArrowRightStartOnRectangleIcon className="w-7 h-7 text-gray-700" />
              </button>
            </>
          ) : (
            <>
              <a
                href="/loginregistro?form=login"
                className="rounded-lg border border-gray-400 text-black p-3 pe-5 ps-5 hover:bg-slate-100 duration-200 cursor-pointer"
              >
                Iniciar Sesión
              </a>
              <a
                href="/loginregistro?form=register"
                className="bg-[#4E9408] rounded-lg p-3 pe-5 ps-5 text-white hover:bg-slate-900 duration-200 cursor-pointer"
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
