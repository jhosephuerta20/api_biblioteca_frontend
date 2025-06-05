import Footer from "../components/NavbarFooter/Footer";
import NavBar from "/src/components/NavbarFooter/NavBar";

const categorias = [
  {
    id: 1,
    nombre: "Ficción",
    emoji: "🦸‍♀️",
    ruta: "/marketplace?categoria=veterinaria",
  },
  {
    id: 2,
    nombre: "Autoayuda",
    emoji: "💪🏼",
    ruta: "/marketplace?categoria=mantenimiento",
  },
  {
    id: 3,
    nombre: "Negocios y Finanzas",
    emoji: "🤑",
    ruta: "/marketplace?categoria=reparación",
  },
  {
    id: 4,
    nombre: "Tecnología y Programación",
    emoji: "🤖",
    ruta: "/marketplace?categoria=instalaciones",
  },
  {
    id: 5,
    nombre: "Ciencia",
    emoji: "🔬",
    ruta: "/marketplace?categoria=electricistas",
  },
  {
    id: 6,
    nombre: "Arte y Diseño",
    emoji: "🎎",
    ruta: "/marketplace?categoria=jardinería",
  },
  {
    id: 7,
    nombre: "Historia",
    emoji: "📚",
    ruta: "/marketplace?categoria=mudanzas",
  },
];

const Categorias = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />

      <div className="bg-white py-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Explora nuestras categorías
        </h2>
        <p className="text-center text-lg text-gray-600 mt-4">
          Descubre productos de tus categorías favoritas.
        </p>
      </div>

      <div className="py-12 px-6 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categorias.map((categoria) => (
            <a
              href={`/marketplace?categoria=${categoria.nombre}`}
              className="group"
              key={categoria.nombre}
            >
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-gray-200 transition-colors">
                  <span className="text-5xl">{categoria.emoji}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {categoria.nombre}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categorias;
