const ComoFunciona = () => {
  return (
    <div
      id="como-funciona"
      className="flex text-center md:text-left bg-white p-5 lg:p-10 flex-col lg:flex-row gap-6 justify-around items-center"
    >
      <div className="flex flex-col gap-4 md:gap-6 pt-5 pb-5 md:pt-10 md:pb-10 ">
        <h3 className="text-3xl md:text-4xl font-bold">Cómo Funciona</h3>
        <p className="text-sm md:text-base text-gray-700 md:text-xl">
          Buscar un servicio en <strong>MultiServi</strong> es fácil, seguro y
          sin complicaciones.
        </p>
        <div className="text-left">
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                1
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Regístrate en nuestra web
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Completa tu registro de manera sencilla y rápida:
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                2
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Explora nuestros servicios
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Navega fácilmente por nuestra amplia gama de servicios
                  disponibles.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                3
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Selecciona el servicio y cuenta tus necesidades
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Elige el servicio que deseas y cuéntanos todos los detalles
                  que consideres importantes.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                4
              </span>
              <div>
                <h3 className="font-bold md:text-xl">Reserva tu servicio</h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Confirma tu selección de servicio y elige la fecha y hora que
                  mejor te convengan.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                5
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Nosotros nos encargamos del resto
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Nos ocupamos de gestionar todo lo necesario para asegurar que
                  tu servicio se realice conforme a tus expectativas.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                6
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Califica tu experiencia
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Ayúdanos a mejorar y a ofrecerte siempre lo mejor.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                7
              </span>
              <div>
                <h3 className="font-bold md:text-xl">¡Cliente feliz!</h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Estamos aquí para hacer tu vida más fácil.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="hidden w-260 lg:flex lg:flex-col text-end text-xs text-gray-500 font-mono lg:ml-10">
        <img src="../img/como.jpg" alt="" className="rounded-3xl" />
        <p>
          Diseñado por{" "}
          <a target="_blank" href="https://www.freepik.es/">
            Freepik
          </a>
        </p>
      </div> */}
    </div>
  );
};

export default ComoFunciona;
