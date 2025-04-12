import NavBar from "../components/NavbarFooter/NavBar";
import { useLoaderData, redirect } from "react-router-dom";
import {
  obtenerProductoPorId,
  obtenerProductosPorUsuario,
} from "../services/ServicioProductos";
import { formatCurrency } from "../utils/formatedPrice";
import {
  TagIcon,
  MapPinIcon,
  UserIcon,
  ArrowUturnLeftIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Warning from "../components/Warning";
import Footer from "../components/NavbarFooter/Footer";
import FormProducto from "../components/Producto/FormProducto";
import { agregarTrueque } from "../services/ServicioTrueques";
import { useUser } from "../hooks/useUser";

export async function loader({ params }) {
  console.log(params)
  console.log(params.id);
  if (params.id !== undefined) {
    const product = await obtenerProductoPorId(params.id);
    if (!product) {
      return redirect("/marketplace");
    }
    return product;
  }
}

const DetalleProducto = () => {
  const product = useLoaderData();

  const [isSelected, setIsSelected] = useState("");
  const [warning, setWarning] = useState("");

  const [isModal, setIsModal] = useState(false);

  const [isModalProduct, setIsModalProduct] = useState(false);

  const [isGuardarProductos, setIsGuardarProductos] = useState(false);

  const [isSelectedProduct, setIsSelectedProduct] = useState(null);

  const [dataProducts, setDataProducts] = useState(null);

  const { getCurrentUser } = useUser();
  const user = getCurrentUser();

  useEffect(() => {
    setTimeout(() => {
      setWarning("");
    }, 2000);
  }, [warning]);

  const handleClickSolicitar = () => {
    if (localStorage.getItem("token")) {
      setIsModal(true);
    } else {
      setWarning("errorLogin");
    }
  };

  const handleClickUpload = async () => {
    const productos = await obtenerProductosPorUsuario(
      +user.id
    );
    setDataProducts(productos);
    setIsGuardarProductos(true);
  };

  const handleEnviarSolicitud = async () => {
    try {
      await agregarTrueque(isSelectedProduct, product);
      setIsGuardarProductos(false);
      setIsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      {warning && <Warning tipo={warning} />}

      {isModal && (
        <>
          <div
            onClick={() => setIsModal(false)}
            className="absolute z-40 w-full h-full bg-black opacity-50"
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-3 ">
            <h2 className="text-xl font-normal text-center mb-5">Selecciona una opción</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => handleClickUpload()}
                className="p-4 flex flex-col justify-center items-center border border-gray-400 hover:bg-slate-200 cursor-pointer rounded-lg"
              >
                <ArchiveBoxIcon className="w-12 h-12" />
                <span className="font-normal">
                  Seleccionar producto agregado
                </span>
              </button>

              <button
                onClick={() => (setIsModalProduct(true), setIsModal(false))}
                className="p-4 flex flex-col justify-center items-center border border-gray-400 hover:bg-slate-200 cursor-pointer rounded-lg"
              >
                <PlusCircleIcon className="w-12 h-12" />
                <span className="font-normal">Subir nuevo producto</span>
              </button>
            </div>
          </div>
        </>
      )}

      {isModalProduct && (
        <>
          <div
            onClick={() => setIsModalProduct(false)}
            className="absolute z-40 w-full h-full bg-black opacity-50"
          ></div>
          <FormProducto
            tipo={"trueque"}
            product={product}
            setIsModalProduct={setIsModalProduct}
          />
        </>
      )}

      {isGuardarProductos && (
        <>
          <div
            onClick={() => setIsGuardarProductos(false)}
            className="absolute z-40 w-full h-full bg-black opacity-50"
          ></div>

          {dataProducts ? (
            <div className="absolute w-[80%] md:w-[700px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white flex flex-col rounded-xl p-5">
              <h2 className="text-2xl font-normal mb-5 pb-3 border-b border-gray-400">
                Selecciona un producto
              </h2>
              <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {dataProducts.map((producto) => (
                  <button
                    onClick={() => setIsSelectedProduct(producto)}
                    key={producto.id}
                    className={`${
                      producto === isSelectedProduct
                        ? "border-2 border-blue-500"
                        : ""
                    }  bg-slate-200 z-70 hover:opacity-50 transform transition-all cursor-pointer w-full h-full rounded-xl flex flex-col relative `}
                  >
                    <img
                      src={producto.imagenes?.[0]?.url}
                      alt={producto.titulo}
                      className="md:w-40 md:h-40 w-full h-full object-cover rounded-xl"
                    />

                    <div className="p-2 absolute h-12 bottom-0 w-full flex  items-center bg-[rgba(0,0,0,0.5)]  rounded-b-xl">
                      <h3 className="text-sm font-semibold text-white">
                        {producto.titulo}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleEnviarSolicitud()}
                className="w-full p-3 mt-3 rounded-lg bg-black hover:opacity-70 text-white cursor-pointer"
              >
                Enviar solicitud
              </button>
            </div>
          ) : (
            <div className="absolute w-[50%] md:w-[500px]  top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-100 flex flex-col rounded-xl p-5">
              <h2 className="text-xl font-normal mb-5 pb-3 border-b border-gray-400">
                No se encontraron productos guardados
              </h2>
            </div>
          )}
        </>
      )}

      <main className="h-screen max-w-5xl mx-auto pt-4 pb-3 flex flex-col  ">
        <div className="h-auto">
          <a
            href="/marketplace"
            className="flex justify-center items-center w-50 py-1 gap-2 bg-slate-300 hover:bg-slate-100 cursor-pointer rounded-full text-gray-600 hover:text-black mb-4"
          >
            <ArrowUturnLeftIcon className="w-5 h-5" />
            Volver a productos
          </a>
          <div className="bg-white w-full flex-1 rounded-xl grid grid-cols-1 md:grid-cols-2 border border-gray-300 shadow min-h-0">
            <div className="flex flex-col justify-center w-full h-full p-6 border-r border-gray-300">
              <div className="h-[450px] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={isSelected ? isSelected : product.imagenes?.[0]?.url}
                  alt={product.titulo}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="bg-slate-100 h-30 w-full flex overflow-x-auto mt-4 gap-2">
                {product.imagenes?.map((imagen) => (
                  <img
                    key={imagen.id}
                    src={imagen.url}
                    alt={product.titulo}
                    onClick={() => setIsSelected(imagen.url)}
                    className={`w-30 h-full object-cover border-2 hover:opacity-60 cursor-pointer rounded-lg ${
                      isSelected === imagen.url
                        ? "border-2 border-blue-500"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col p-6 justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-4">{product.titulo}</h2>
                <span className="text-3xl font-bold mb-4">
                  ${formatCurrency(product.valor_referencia)}
                  <p className="text-sm text-gray-500">Valor Referencia</p>
                </span>

                <div className="flex">
                  {product.categorias.map((categoria) => (
                    <span
                      key={categoria.id}
                      className="text-sm text-gray-500 mr-2 bg-slate-200 px-2 py-1 rounded-full"
                    >
                      {categoria.nombre}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-100 p-3 rounded-lg flex flex-col gap-3 mt-5">
                  <div className="flex items-center">
                    <TagIcon className="w-5 h-5 text-gray-800 font-bold mr-1" />
                    <p className="text-sm text-gray-800 font-bold">Estado:</p>
                    <p className="text-sm text-black ml-1">{product.estado}</p>
                  </div>

                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-gray-800 font-bold mr-1" />
                    <p className="text-sm text-gray-800 font-bold">
                      Ubicación:
                    </p>
                    <p className="text-sm text-black ml-1">
                      {product.usuario.comuna}, {product.usuario.region}
                    </p>
                  </div>
                </div>

                <div className="mt-5 ">
                  <p className="text-sm text-gray-800 font-bold">
                    Descripción:
                  </p>
                  <p className="text-sm text-black break-words">
                    {product.descripcion}
                  </p>
                </div>

                <div className="mt-10 ">
                  <p className="text-sm text-gray-800 font-bold">
                    Publicado por:
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <UserIcon className="w-10 h-10 text-gray-800 font-bold mr-3" />
                      <p className="text-sm text-black">
                        {product.usuario.nombre}
                      </p>
                    </div>
                    {user && +user.id !== product.usuario.id && (
                      <button className="text-sm text-black mr-3 rounded-full cursor-pointer border border-slate-300 bg-white hover:bg-slate-300 px-4 py-2">
                        Ver perfil
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>

              <div className="mt-5">
                {user && +user.id !== product.usuario.id && (
                  <button
                  onClick={() => handleClickSolicitar()}
                  className="w-full p-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white cursor-pointer"
                >
                  Solicitar trueque
                </button>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetalleProducto;

