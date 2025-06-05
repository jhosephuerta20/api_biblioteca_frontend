import { useState, useEffect } from "react";
const ListoComenzar = () => {
  const [isSesionActive, setIsSesionActive] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSesionActive(!!token);
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left bg-[#18171c] text-white p-8 md:p-16 gap-8">
      <div className="flex flex-col gap-3 ">
        <h3 className="text-3xl md:text-4xl font-bold">
          ¿Listo para descubrir libros increibles?
        </h3>
        <p className="text-base md:text-lg text-gray-300">
          Únete a una comunidad de lectores satisfechos qué ya están accediendo
          a varios libros excepcionales de nuestro catálogo
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="/marketplace"
          className="whitespace-nowrap bg-white text-black rounded-lg py-3 px-6 font-semibold transition duration-300 ease-in-out transform hover:bg-slate-100 hover:scale-105"
        >
          Explorar Libros
        </a>
        {!isSesionActive && (
          <a
            href="/loginregistro?form=register"
            className="whitespace-nowrap bg-white text-black rounded-lg py-3 px-6 font-semibold transition duration-300 ease-in-out transform hover:bg-slate-100 hover:scale-105"
          >
            Registrarse Ahora
          </a>
        )}
      </div>
    </div>
  );
};

export default ListoComenzar;
