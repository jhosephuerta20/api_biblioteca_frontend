import axios from "axios";
import { getAuthHeaders } from "../utils/api";
import { useUser } from "../hooks/useUser";

const backend_url = import.meta.env.VITE_BACKEND_URL;
export async function agregarTrueque(productoInteresado, productoPublicador) {
  try {
    const url = `${backend_url}/api/trueques/agregar`;
    const { getCurrentUser } = useUser();
    const user = getCurrentUser();

    const response = await axios.post(
      url,
      {
        usuarioInteresadoId: +user.id,
        productoInteresadoId: productoInteresado.id,
        usuarioPublicadorId: productoPublicador.usuario.id,
        productoPublicadorId: productoPublicador.id,
      },
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}


