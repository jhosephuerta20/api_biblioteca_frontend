import {
  ListBulletIcon,
  ShieldCheckIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

const PorqueMultiServi = () => {
  return (
    <div className="flex items-center flex-col text-center pt-8 md:pt-12 pb-8 md:pb-12 bg-gray-50">
      <div className="flex items-center flex-col gap-3 mb-6 ">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          ¿Por qué elegir Multiservi?
        </h3>
        <p className="text-sm md:text-lg text-gray-600  ">
          Conectamos a empresas de confianza con clientes finales para
          garantizar una experiencia excepcional, asegurando que cumplas tus
          expectativas en cada interacción.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center flex-col md:flex-row p-4 gap-6">
        <div className="flex flex-col items-center rounded-lg border border-gray-300 p-5 gap-3 justify-center md:w-72 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ShieldCheckIcon className="w-10 h-10 text-purple-500 hover:scale-110 duration-500 ease-in-out"></ShieldCheckIcon>
          <h5 className="font-bold text-xl text-gray-800">
            Compromiso con la excelencia
          </h5>
          <p className="text-base text-gray-700">
            Garantizamos servicios de alta calidad, superando tus expectativas
            con resultados impecables.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-300 p-5 gap-3 justify-center md:w-72 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ChatBubbleOvalLeftIcon className="w-10 h-10 text-blue-500 hover:scale-110 duration-500 ease-in-out"></ChatBubbleOvalLeftIcon>
          <h5 className="font-bold text-xl text-gray-800">
            Atención personalizada
          </h5>
          <p className="text-base text-gray-700">
            Nos adaptamos a tus necesidades específicas, asegurando un servicio
            alineado con tus objetivos.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-300 p-5 gap-3 justify-center md:w-72 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ListBulletIcon className="w-10 h-10 text-green-500 hover:scale-110 duration-500 ease-in-out"></ListBulletIcon>
          <h5 className="font-bold text-xl text-gray-800">
            Variedad de servicios especializados
          </h5>
          <p className="text-base text-gray-700">
            Disponemos de una amplia gama de servicios adaptados a diferentes
            sectores y necesidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PorqueMultiServi;
