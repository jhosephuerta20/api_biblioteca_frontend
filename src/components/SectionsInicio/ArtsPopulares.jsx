import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { obtenerProductosRecientes } from "../../services/ServicioProductos";
import { formatCurrency } from "../../utils/formatedPrice";

const CardProducto = ({ nombre, precio, images, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const nextImage = (e) => {
    e && e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e && e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 flex flex-col transform transition-transform hover:scale-105">
      <div className="relative w-full h-64">
        <img
          src={images[currentImageIndex]}
          alt={nombre}
          className="w-full h-full object-contain"
        />

        {userId && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white transition"
          >
            <Heart
              size={24}
              strokeWidth={0.75}
              className={
                isFavorite ? "fill-red-500 text-red-500" : "text-blue-400"
              }
            />
          </button>
        )}

        <div className="absolute bottom-2 right-2 flex space-x-1 bg-white rounded-full px-2 py-1">
          <span className="text-gray-400 text-sm">
            {currentImageIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        >
          <span className="text-blue-500 font-extralight">&#10094;</span>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        >
          <span className="text-blue-500 font-extralight">&#10095;</span>
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-black text-2xl font-medium mb-1">{nombre}</h2>
        <div className="mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${formatCurrency(precio)}
          </span>
          <span className="text-sm text-green-600 ml-2">Valor estimado</span>
        </div>
      </div>
    </div>
  );
};

const ArtsPopulares = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    const fetchProductos = async () => {
      try {
        const response = await obtenerProductosRecientes();

        const productosFormateados = response.map((producto) => ({
          nombre: producto.titulo,
          precio: producto.valor_referencia,
          images: producto.imagenes.map((img) => img.url),
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  if (cargando) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Descubre los Libros más Recientes
        </h1>
        <p className="text-gray-600 text-center mb-10">
          ¡Empieza a explorar ahora mismo para descubrir los libros más
          recientes y útiles para ti!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.length > 0 ? (
            productos.map((producto, index) => (
              <CardProducto
                key={index}
                nombre={producto.nombre}
                precio={producto.precio}
                images={producto.images}
                userId={user ? user.id : null}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay libros disponibles
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <a
            className="whitespace-nowrap bg-black rounded-lg p-3 ps-4 pe-4 duration-200 text-white hover:bg-slate-900 cursor-pointer"
            href="/marketplace"
          >
            Descubrir Más
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtsPopulares;
