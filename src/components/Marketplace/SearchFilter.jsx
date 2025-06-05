import { useState, useEffect } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { categorias } from "../../utils/Categorias";
import DropdownFilter from "./DropdownFilter";

const SearchFilter = ({
  onFilterSubmit,
  hideSearch = false,
  initialSearch = "",
  onSearchChange,
  filtroCategoria,
}) => {
  const [filters, setFilters] = useState({
    searchProduct: initialSearch,
    category: filtroCategoria ? [filtroCategoria] : [],
    priceFrom: "",
    priceTo: "",
  });

  const [showComunaDropdown, setShowComunaDropdown] = useState(false);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };


  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchProduct: initialSearch }));
  }, [initialSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(filters);
  };

  return (
    <>
      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        {!hideSearch && (
          <div className="flex items-center w-full border bg-white border-gray-400 rounded-lg px-3 py-2 mb-5 focus-within:ring-1 focus-within:ring-blue-600">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar libro"
              value={filters.searchProduct}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  searchProduct: e.target.value,
                }));
                onSearchChange?.(e.target.value);
              }}
              className="w-full ml-2 outline-none bg-transparent"
            />
          </div>
        )}
        <div className="flex-1 space-y-3 overflow-y-auto">
          <div className="border-b pb-3 border-gray-200 relative">
            <label className="block mb-2">Autor</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Busca por autor..."
              value={filters.comuna}
              onChange={(e) => {
                handleChange("comuna", e.target.value);
                setShowComunaDropdown(true);
              }}
              onFocus={() => setShowComunaDropdown(true)}
              onBlur={() => setTimeout(() => setShowComunaDropdown(false), 200)}
            />
            
          </div>

        

          <div className="mb-4 pb-4 border-b border-gray-200">
            <DropdownFilter
              title="Categorías"
              items={categorias}
              selected={filters.category}
              onChange={(value) => {
                console.log("Categoría seleccionada:", value);
                setFilters({ ...filters, category: value });
              }}
            />
          </div>

          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="block mb-2">Estado</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFilters({ ...filters, estado: "Nuevo" })}
                className={`p-3 rounded-lg bg-gray-300 cursor-pointer ${
                  filters.estado === "Nuevo" ? "bg-gray-400" : ""
                }`}
              >
                Recomendado
              </button>
              <button
                type="button"
                onClick={() => setFilters({ ...filters, estado: "Usado" })}
                className={`p-3 rounded-lg bg-gray-300 cursor-pointer ${
                  filters.estado === "Usado" ? "bg-gray-400" : ""
                }`}
              >
                Tendencia
              </button>
              <button
                type="button"
                onClick={() => setFilters({ ...filters, estado: "" })}
                className={`p-3 rounded-lg bg-gray-300 cursor-pointer ${
                  !filters.estado ? "bg-gray-400" : ""
                }`}
              >
                Promoción
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded-lg bg-black text-white hover:opacity-80 cursor-pointer"
        >
          Aplicar filtros
        </button>
      </form>
    </>
  );
};

export default SearchFilter;
