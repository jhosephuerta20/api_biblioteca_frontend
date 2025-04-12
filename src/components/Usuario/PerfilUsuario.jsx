import { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import { RegionesComunas } from "../../utils/RegionesComunas";
import FormProducto from "../Producto/FormProducto";
import { eliminarProducto } from "../../services/ServicioProductos";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [trueques, setTrueques] = useState([]);

  const [isModalProduct, setIsModalProduct] = useState(false);

  const { getCurrentUser } = useUser();
  const user = getCurrentUser();

  const navigate = useNavigate();
  const handleVerChat = (emisor, receptor) => {
    console.log(emisor, receptor);
    navigate(`/chat?emisor=${emisor}&receptor=${receptor}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await eliminarProducto(productId);
      const updatedProducts = productos.filter(
        (product) => product.id !== productId
      );
      setProductos(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        let userData = null;
        let token = null;
        console.log(user);
        try {
          userData = user;
          token = localStorage.getItem("token");
          console.log(token);
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
          setError("Error al procesar datos de usuario");
          setLoading(false);
          return;
        }

        console.log("Token:", token);

        if (!userData || !token) {
          console.warn("No hay sesión activa");
          setError("No hay sesión activa");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const urlUsuario = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuario/${+userData.id}`;

        const response = await axios.get(urlUsuario, config);

        if (!response.data) {
          throw new Error("Respuesta vacía del servidor");
        }

        setUsuario(response.data);
        setEditedUsuario({
          ...response.data,
          nombre: response.data.nombre || "",
          apellido: response.data.apellido || "",
          comuna: response.data.comuna || "",
          region: response.data.region || "",
        });

        const urlProductos = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/productos/usuario/${+userData.id}`;
        const responseProductos = await axios.get(urlProductos, config);

        if (responseProductos.data) {
          setProductos(responseProductos.data);
        }

        const urlTrueques = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/trueques/mistrueques/${+userData.id}`;
        const responseTrueques = await axios.get(urlTrueques, config);

        console.log(responseTrueques);

        if (responseTrueques.data) {
          setTrueques(responseTrueques.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error completo:", err);
        setError(
          err.response?.data?.message ||
            "Error al obtener datos del usuario: " + err.message
        );
        setLoading(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUsuario({
      ...editedUsuario,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay sesión activa");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const urlUsuario = `${import.meta.env.VITE_BACKEND_URL}/api/usuario/${
        usuario.id
      }`;
      const response = await axios.put(urlUsuario, editedUsuario, config);

      if (response.data) {
        setUsuario(response.data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      setError("Error al guardar cambios: " + err.message);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveChanges();
    } else {
      setIsEditing(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-[100px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl">Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-[100px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl text-red-500">Error: {error}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 bg-black text-white rounded-md p-3 hover:opacity-80"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen pt-[100px] flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl">No se encontró información del usuario</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 bg-black text-white rounded-md p-3 hover:opacity-80"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {isModalProduct && (
        <>
          <div
            onClick={() => setIsModalProduct(false)}
            className="absolute z-40 h-screen w-full bg-black opacity-50"
          ></div>
          <FormProducto setIsModalProduct={setIsModalProduct} />
        </>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">
                  Datos personales
                </h2>
                {/*
                <button
                  className="bg-blue-600 text-white rounded-lg p-2 pe-4 ps-4 hover:bg-blue-500 duration-200 cursor-pointer"
                  onClick={handleEditToggle}
                >
                  {isEditing ? "Guardar" : "Editar"}
                </button>
                 */}
              </div>

              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xl overflow-hidden">
                    {usuario.nombre
                      ? usuario.nombre.substring(0, 2).toUpperCase()
                      : "CR"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Nombre:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nombre"
                        value={editedUsuario.nombre || ""}
                        onChange={handleInputChange}
                        className="mt-1 w-full bg-white border border-gray-200 rounded-md py-2 px-3 focus:ring-2"
                      />
                    ) : (
                      <p className="text-gray-800">{usuario.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Apellido:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="apellido"
                        value={editedUsuario.apellido || ""}
                        onChange={handleInputChange}
                        className="mt-1 w-full bg-white border border-gray-200 rounded-md py-2 px-3 focus:ring-2"
                      />
                    ) : (
                      <p className="text-gray-800">{usuario.apellido}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Región:</label>
                    {isEditing ? (
                      <select
                        name="region"
                        value={editedUsuario.region || ""}
                        onChange={handleInputChange}
                        className="mt-1 w-full bg-white border border-gray-200 rounded-md py-2 px-3 focus:ring-2"
                      >
                        <option value="">Seleccione una región</option>
                        {RegionesComunas.map(({ region }) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-800">{usuario.region}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Comuna:</label>
                    {isEditing ? (
                      <select
                        name="comuna"
                        value={editedUsuario.comuna || ""}
                        onChange={handleInputChange}
                        className="mt-1 w-full bg-white border border-gray-200 rounded-md py-2 px-3 focus:ring-2"
                        disabled={!editedUsuario.region}
                      >
                        <option value="">Seleccione una comuna</option>
                        {editedUsuario.region &&
                          RegionesComunas.find(
                            (r) => r.region === editedUsuario.region
                          )?.comunas.map((comuna) => (
                            <option key={comuna} value={comuna}>
                              {comuna}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <p className="text-gray-800">{usuario.comuna}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Valoración:</label>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < Math.floor(usuario.valoracion || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-500">
                        {usuario.valoracion || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">
                  Mis Servicios Solicitados
                </h2>

                <button
                  onClick={() => setIsModalProduct(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <span className="mr-2">+</span>
                  Solicitar Servicio
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white border h-48 border-gray-200 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
                  >
                    <div className="relative h-full">
                      <img
                        key={producto.id}
                        src={producto.imagenes[0].url}
                        alt={`Imagen ${producto.id + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <span className="absolute bottom-0 bg-[rgba(0,0,0,0.5)] w-full text-white p-2">
                        {producto.titulo}
                      </span>
                      <div className="absolute top-2 right-2 flex items-center">
                        <TrashIcon
                          onClick={() => handleDeleteProduct(producto.id)}
                          className="w-8 h-8 bg-white rounded-full p-1 text-red-500 hover:bg-gray-300 ml-2 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium truncate">{producto.nombre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">
                  Mis Servicios
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                {trueques.map((trueque) => (
                  <div
                    key={trueque.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
                  >
                    <div className="relative h-40">
                      <span
                        className={`absolute top-2  left-2 px-2 py-1 text-xs ${
                          trueque.estadoNombre === "Trueque aceptado" &&
                          "bg-green-500"
                        } ${
                          trueque.estadoNombre === "Trueque rechazado" &&
                          "bg-red-500"
                        } bg-gray-300 rounded-full flex items-center justify-center`}
                      >
                        {trueque.estadoNombre}
                      </span>
                      {trueque.estadoNombre === "Trueque aceptado" && (
                        <span
                          onClick={() =>
                            handleVerChat(
                              trueque.usuarioInteresadoId === usuario.id
                                ? trueque.usuarioInteresadoId
                                : trueque.usuarioPublicadorId,
                              trueque.usuarioInteresadoId === usuario.id
                                ? trueque.usuarioPublicadorId
                                : trueque.usuarioInteresadoId
                            )
                          }
                          className="absolute top-2 right-2 p-2 text-xs font-bold hover:scale-105 transition-all bg-white  hover:bg-slate-200 cursor-pointer shadow-lg rounded-full "
                        >
                          <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        </span>
                      )}

                      {trueque.productoInteresadoImagenes.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Imagen ${index + 1}`}
                        />
                      ))}
                      <div className="absolute bottom-0 p-2 w-full bg-[rgba(0,0,0,0.5)] ">
                        <h3 className="text-white text-sm">
                          {trueque.productoInteresadoNombre}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilUsuario;
