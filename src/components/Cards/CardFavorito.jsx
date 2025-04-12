import { useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatedPrice";
import { eliminarFavorito } from "../../services/ServicioUsuarios";
import { useUser } from "../../hooks/useUser";

const CardFavorito = ({
  nombre,
  precio,
  imagenes = [],
  productoId,
  onEliminar,
  comuna

}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { getCurrentUser } = useUser();
  const user = getCurrentUser();
  const userData = user;

 

  const handleEliminarClick = () => {
    eliminarFavorito(+userData.id, productoId);
    if (onEliminar) {
      onEliminar(productoId); // Call the callback function
    }
  };

  const nextImage = (e) => {
    e && e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e && e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full h-[250px] mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 flex relative">
      <button
        onClick={handleEliminarClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-gray-100 transition cursor-pointer"
      >
        <Trash2 size={24} className="text-blue-600" />
      </button>

      <div
        className="relative w-1/2 h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {imagenes.length > 0 ? (
          <img
            src={imagenes[currentImageIndex].url}
            alt="Producto"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {isHovering && imagenes.length > 1 && (
          <>
            <div className="absolute bottom-2 right-2 flex space-x-1 bg-white rounded-full px-2 py-1 transition-opacity duration-300">
              <span className="text-gray-400 text-sm">
                {currentImageIndex + 1} / {imagenes.length}
              </span>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md transition-opacity duration-300"
            >
              <span className="text-blue-500 font-extralight">&#10094;</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md transition-opacity duration-300"
            >
              <span className="text-blue-500 font-extralight">&#10095;</span>
            </button>
          </>
        )}
      </div>

      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-blue-600 text-base font-medium mb-1">{nombre}</h2>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-3xl font-bold text-gray-900 block">
                ${formatCurrency(precio)}
              </span>
              <span className="text-sm text-green-600">Valor estimado</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 pt-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{comuna}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFavorito;
