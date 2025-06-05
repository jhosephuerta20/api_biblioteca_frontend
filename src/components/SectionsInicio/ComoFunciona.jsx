const ComoFunciona = () => {
  return (
    <div
      id="como-funciona"
      className="flex text-center md:text-left bg-white p-5 lg:p-10 flex-col lg:flex-row gap-6 justify-around items-center"
    >
      <div className="flex flex-col gap-4 md:gap-6 pt-5 pb-5 md:pt-10 md:pb-10">
        <h3 className="text-3xl md:text-4xl font-bold">Cómo Funciona</h3>
        <p className="text-sm md:text-base text-gray-700 md:text-xl">
          Comprar libros digitales en <strong>Letras Vivas</strong> es fácil,
          rápido y seguro.
        </p>
        <div className="text-left">
          <ul className="space-y-4">
            {/* Paso 1 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                1
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Crea tu cuenta en nuestra plataforma
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Regístrate de manera sencilla para acceder a nuestra
                  biblioteca digital.
                </p>
              </div>
            </li>
            {/* Paso 2 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                2
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Explora nuestro catálogo de libros
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Descubre una amplia variedad de títulos disponibles para
                  descarga inmediata.
                </p>
              </div>
            </li>
            {/* Paso 3 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                3
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Selecciona el libro y revisa detalles
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Elige el libro que deseas y consulta sinopsis, autor y
                  opiniones.
                </p>
              </div>
            </li>
            {/* Paso 4 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                4
              </span>
              <div>
                <h3 className="font-bold md:text-xl">Realiza tu compra</h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Completa el pago de forma segura y obtén acceso inmediato al
                  libro digital.
                </p>
              </div>
            </li>
            {/* Paso 5 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                5
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Descarga y disfruta tu libro
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Accede al archivo digital desde cualquier dispositivo cuando
                  quieras.
                </p>
              </div>
            </li>
            {/* Paso 6 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                6
              </span>
              <div>
                <h3 className="font-bold md:text-xl">
                  Califica y comenta tu experiencia
                </h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Déjanos tu opinión para ayudar a otros lectores y mejorar
                  nuestro servicio.
                </p>
              </div>
            </li>
            {/* Paso 7 */}
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 md:w-8 h-7 md:h-8 rounded-full bg-black text-white font-semibold">
                7
              </span>
              <div>
                <h3 className="font-bold md:text-xl">¡Disfruta tu lectura!</h3>
                <p className="text-gray-600 text-sm md:text-xl">
                  Estamos aquí para acercarte las mejores historias y
                  conocimientos.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
