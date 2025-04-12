import { useState } from "react";
import {
  PlusCircleIcon,
  TrashIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { categorias } from "../../utils/Categorias";
import { crearProducto } from "../../services/ServicioProductos";
import { agregarTrueque } from "../../services/ServicioTrueques";

const CLOUDINARY_UPLOAD_PRESET = "MultiServi";
const CLOUDINARY_CLOUD_NAME = "dihjozfv0";
const FormProducto = ({ setIsModalProduct, tipo, product }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    valor_referencia: "",
    estado: "Nuevo",
    categorias: [],
    imagenes: [],
  });

  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          return data.secure_url;
        } catch (error) {
          console.error("Error al subir la imagen", error);
          return null;
        }
      })
    );

    setFormData((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...uploadedImages.filter((url) => url)],
    }));

    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoriasChange = (selectedCategorias) => {
    setFormData((prev) => ({
      ...prev,
      categorias: selectedCategorias,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipo == "trueque") {
      const productoInteresado = await crearProducto(formData);
      await agregarTrueque(productoInteresado, product);
    } else {
      await crearProducto(formData);
    }

    setIsModalProduct(false);
    console.log(formData);
  };

  return (
    <div className="absolute top-1/2 mt-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-100 rounded-lg p-5 w-[85vw] md:w-[60vw] lg:w-[50vw] ">
      <h2 className="text-xl text-center font-bold">Crear producto</h2>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col space-y-4"
      >
        <div>
          <label className="text-sm font-bold">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ingrese el título"
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ingrese la descripción"
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Valor Referencial</label>
          <input
            type="number"
            name="valor_referencia"
            value={formData.valor_referencia}
            onChange={handleChange}
            placeholder="Ingrese el valor referencial"
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-lg"
          >
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold ">Subir Imágenes</label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="fileUpload"
            />

            <label
              htmlFor="fileUpload"
              className="flex gap-2 items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-600"
            >
              <PhotoIcon className="w-5 h-5" /> Seleccionar imágenes
            </label>
          </div>

          {formData.imagenes.length > 0 && (
            <p className="text-sm text-gray-700 mt-2">
              {formData.imagenes.length} imágenes seleccionadas
            </p>
          )}

          <div className="mt-2 grid grid-cols-3 gap-2">
            {formData.imagenes.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Imagen ${index}`}
                  className="w-full h-20 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold">Categorías</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-400 p-2 pe-6 ps-6 rounded-lg">
            {categorias.map((categoria, index) => {
              const categoriaId = index + 1;
              return (
                <label
                  key={categoriaId}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.categorias.includes(categoriaId)}
                    onChange={() => {
                      const newSelected = formData.categorias.includes(
                        categoriaId
                      )
                        ? formData.categorias.filter((id) => id !== categoriaId)
                        : [...formData.categorias, categoriaId];

                      handleCategoriasChange(newSelected);
                    }}
                    className="accent-blue-600"
                  />
                  <span>{categoria}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center p-4 hover:bg-slate-900 rounded-lg cursor-pointer bg-black text-white"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />

          <span>
            {tipo == "trueque"
              ? "Subir producto y solicitar trueque"
              : "Subir nuevo producto"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default FormProducto;
