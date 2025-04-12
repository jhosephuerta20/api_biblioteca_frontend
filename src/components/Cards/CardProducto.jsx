import { useState, useEffect } from "react";
import { MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatedPrice";
import {
  agregarFavorito,
  eliminarFavorito,
} from "../../services/ServicioUsuarios";

const CardProducto = ({
  id,
  nombre,
  precio,
  imagenes = [],
  //region,
  distrito,
  comuna,
  estado,
  userId,
  favoritos,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isProductFavorite = (productId, favoritos) => {
    return favoritos.some((prod) => prod.id === productId);
  };

  useEffect(() => {
    setIsFavorite(isProductFavorite(id, favoritos));
  }, [id, favoritos]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    console.log("Click en el corazon de: ", userId, id);
    if (!isFavorite) {
      agregarFavorito(userId, id);
    } else {
      eliminarFavorito(userId, id);
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

  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        userId
          ? navigate(`/marketplace/producto/${id}`)
          : navigate("/loginregistro")
      }
      className="w-full h-[450px] mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div
        className="relative w-full h-2/3 aspect-square"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="absolute top-3 left-3 bg-gray-600 text-white px-2 py-0.5 rounded-full">
          {estado}
        </span>
        {imagenes.length > 0 ? (
          <img
            src={imagenes[currentImageIndex].url}
            alt="Producto"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        {userId && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white transition cursor-pointer"
          >
            <Heart
              size={24}
              strokeWidth={0.75}
              className={
                isFavorite ? "fill-red-500 text-red-500" : "text-blue-400"
              }
            />
          </div>
        )}

        {isHovering && imagenes.length > 1 && (
          <>
            <div className="absolute bottom-2 right-2 flex space-x-1 bg-white rounded-full px-2 py-1 transition-opacity duration-300">
              <span className="text-gray-400 text-sm">
                {currentImageIndex + 1} / {imagenes.length}
              </span>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md transition-opacity duration-300 cursor-pointer"
            >
              <span className="text-blue-500 font-extralight">&#10094;</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md transition-opacity duration-300 cursor-pointer"
            >
              <span className="text-blue-500 font-extralight">&#10095;</span>
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-blue-600 text-nowrap text-base text-left font-medium mb-1">
            {nombre}
          </h2>

          <div className="flex flex-col mt-4">
            <span className="text-3xl font-bold text-left text-gray-900">
              ${formatCurrency(precio)}
            </span>
            <span className="text-sm text-left text-green-600">
              Valor estimado
            </span>
          </div>

          <div className="flex items-center text-gray-500 pt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{comuna}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
