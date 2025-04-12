import { useEffect, useState } from "react";
import NavBar from "../components/NavbarFooter/NavBar";
import { obtenerProductos } from "../services/ServicioProductos";
import { mostrarFavoritos } from "../services/ServicioUsuarios";
import CardProducto from "../components/Cards/CardProducto";
import Footer from "../components/NavbarFooter/Footer";
import { useSearchParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import SearchFilter from "../components/Marketplace/SearchFilter";
import { useUser } from "../hooks/useUser";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const { getCurrentUser } = useUser();
  const user = getCurrentUser();

  const filtroCategoria = searchParams.get("categoria");

  console.log(filtroCategoria);

  const [data, setData] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState({
    searchProduct: "",
    category: filtroCategoria ? [filtroCategoria] : [],
    priceFrom: "",
    priceTo: "",
    estado: "",
    comuna: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token) {
      setUserData(user);
    }
    try {
      const respuestaProductos = async () => {
        const dataResponse = await obtenerProductos();

        setData(dataResponse);
        setFilteredProducts(dataResponse);
        console.log(data);
      };

      respuestaProductos();
    } catch (error) {
      console.log(error);
    }

    const obtenerFavoritos = async () => {
      try {
        if (user) {
          const userData = user;
          setFavoritos(await mostrarFavoritos(+userData.id));
        }

        if (!userData || !token) {
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
        setLoading(false);
      }
    };

    obtenerFavoritos();
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((producto) => {
        const matchesSearch = producto.titulo
          .toLowerCase()
          .includes(filtered.searchProduct.toLowerCase());

        const price = Number(producto.valor_referencia);
        const matchesPrice =
          (!filtered.priceFrom || price >= Number(filtered.priceFrom)) &&
          (!filtered.priceTo || price <= Number(filtered.priceTo));

        const matchesComuna = filtered.comuna
          ? producto.usuario.comuna.toLowerCase() ===
            filtered.comuna.toLowerCase()
          : true;

        const matchesEstado = filtered.estado
          ? producto.estado.toLowerCase() === filtered.estado.toLowerCase()
          : true;

        const matchesCategory =
          filtered.category.length > 0
            ? producto.categorias.some((cat) =>
                filtered.category.includes(cat.nombre)
              )
            : true;

        return (
          matchesSearch &&
          matchesPrice &&
          matchesComuna &&
          matchesEstado &&
          matchesCategory
        );
      });

      setFilteredProducts(filteredData);
    }
  }, [filtered, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltered({ ...filtered, searchProduct: e.target[0].value });
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <NavBar />

      <main className="flex-1 overflow-y-hidden flex pb-10 flex-col lg:flex-row min-h-screen">
        <form
          className="lg:hidden  top-0 z-10 bg-white p-4 shadow-lg flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Buscar servicio"
            className="flex-1 p-2 rounded-lg border bg-white border-gray-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowMobileFilters(true)}
            className="p-2 bg-black text-white rounded-lg hover:opacity-80 cursor-pointer"
          >
            Filtros
          </button>
        </form>

        <aside className="hidden lg:flex flex-[1] p-5 m-4 h-full bg-white rounded-xl shadow-lg">
          <SearchFilter
            onFilterSubmit={setFiltered}
            initialSearch={searchValue}
            onSearchChange={setSearchValue}
            filtroCategoria={filtroCategoria}
          />
        </aside>

        {showMobileFilters && (
          <>
            <div className="bg-black opacity-80 absolute top-0 left-0 w-full h-full z-10"></div>
            <div className="absolute top-[100px] rounded-lg left-1/2 -translate-x-1/2   w-[80vw] h-[85vh] bg-black bg-opacity-50 z-20 lg:hidden">
              <div className="bg-white h-full rounded-lg p-4 ">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="absolute top-[-20px] right-[-30px] cursor-pointer z-30 text-gray-600 flex justify-center items-center w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>

                <SearchFilter
                  onFilterSubmit={(filters) => {
                    setFiltered((prev) => ({
                      ...prev,
                      ...filters,
                      searchProduct: searchValue,
                    }));
                    setShowMobileFilters(false);
                  }}
                  hideSearch={true}
                />
              </div>
            </div>
          </>
        )}

        <section className="flex-1 lg:flex-[4] max-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 overflow-y-auto pt-3 lg:pt-4">
          {filteredProducts !== null &&
            filteredProducts.map((producto) => (
              <CardProducto
                key={producto.id}
                id={producto.id}
                nombre={producto.titulo}
                precio={producto.valor_referencia}
                imagenes={producto.imagenes}
                region={producto.usuario.region}
                comuna={producto.usuario.comuna}
                estado={producto.estado}
                userId={userData ? +userData.id : null}
                favoritos={favoritos}
              />
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Marketplace;
