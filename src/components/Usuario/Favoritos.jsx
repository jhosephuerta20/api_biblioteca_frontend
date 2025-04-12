import { useState, useEffect } from "react";
import CardFavorito from "../Cards/CardFavorito";
import NavBar from "/src/components/NavbarFooter/NavBar";
import Footer from "/src/components/NavbarFooter/Footer";
import { useUser } from "../../hooks/useUser";
import {
  mostrarFavoritos,
  eliminarFavorito,
} from "../../services/ServicioUsuarios";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("fecha");
  const [ordenPrecio, setOrdenPrecio] = useState("asc");

  const { getCurrentUser } = useUser();
  const user = getCurrentUser();

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const userData = user;
        const token = localStorage.getItem("token");

        if (!userData || !token) {
          setError("No hay sesión activa");
          setLoading(false);
          return;
        }

        const favoritosObtenidos = await mostrarFavoritos(+userData.id);
        setFavoritos(favoritosObtenidos);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
        setError(
          err.response?.data?.message ||
            "Error al obtener favoritos: " + err.message
        );
        setLoading(false);
      }
    };

    obtenerFavoritos();
  }, []);

  const favoritosFiltradosOrdenados = favoritos
    .filter((favorito) =>
      favorito.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (ordenarPor === "fecha") {
        return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
      }
      if (ordenarPor === "precio") {
        return ordenPrecio === "asc"
          ? a.valor_referencia - b.valor_referencia
          : b.valor_referencia - a.valor_referencia;
      }
      if (ordenarPor === "nombre") {
        return a.titulo.localeCompare(b.titulo);
      }
      return 0;
    });

  const handleEliminarFavorito = async (productoId) => {
    try {
      const userData = user;

      await eliminarFavorito(+userData.id, productoId);

      const nuevosFavoritos = favoritos.filter(
        (favorito) => favorito.id !== productoId
      );
      setFavoritos(nuevosFavoritos);
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto text-center py-8">
          <p>Cargando favoritos...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto text-center py-8 text-red-500">
          <p>Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-3xl font-extrabold text-center text-black mb-8">
          Tus Servicios Favoritos
        </h2>

        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center w-full sm:w-auto">
              <label className="mr-2">Ordenar por:</label>
              <select
                className="border p-2 rounded flex-grow"
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
              >
                <option value="fecha">Más reciente</option>
                <option value="precio">Precio</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>

            {ordenarPor === "precio" && (
              <div className="flex items-center w-full sm:w-auto">
                <select
                  className="border p-2 rounded w-full"
                  value={ordenPrecio}
                  onChange={(e) => setOrdenPrecio(e.target.value)}
                >
                  <option value="asc">Precio: Menor a Mayor</option>
                  <option value="desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {favoritosFiltradosOrdenados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {favoritosFiltradosOrdenados.map((producto) => (
              <CardFavorito
                key={producto.id}
                nombre={producto.titulo}
                precio={producto.valor_referencia}
                imagenes={producto.imagenes}
                productoId={producto.id}
                comuna={producto.usuario.comuna}
                onEliminar={() => handleEliminarFavorito(producto.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">
            Aún no has agregado servicios a favoritos
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favoritos;
