import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const Warning = ({ tipo }) => {
    
  return (
    <div className="fixed z-50 justify-center shadow-lg border border-gray-400 w-full md:w-80 items-center gap-2 flex p-2 bg-slate-100  rounded-lg top-2 right-2 ">
      {tipo === "errorLogin" &&  (
        <>
          <XCircleIcon className="w-10 h-10 mr-2 text-red-600 hover:text-red-700" />
          <p className="text-sm text-center">Debes iniciar sesión</p>
        </>
      )}

      {tipo === "aceptLogin" && (
        <>
          <CheckCircleIcon className="w-10 h-10 mr-2 text-green-600 hover:text-green-700" />
          <p className="text-sm text-center">Sesión iniciada</p>
        </>
      )}

      {tipo === "aceptRegister" && (
        <>
          <CheckCircleIcon className="w-10 h-10 mr-2 text-green-600 hover:text-green-700" />
          <p className="text-sm text-center">Usuario registrado</p>
        </>
      )}



    </div>
  );
};

export default Warning;