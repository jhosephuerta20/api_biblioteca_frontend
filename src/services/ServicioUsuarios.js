import axios from "axios";
import { getAuthHeaders } from "../utils/api";

const backend_url = import.meta.env.VITE_BACKEND_URL;
export async function agregarUsuario(usuario) {
  try {
    const url = `${backend_url}/api/registro`;
    console.log(
      "nombre: " +
        usuario.nombre +
        " apellido: " +
        usuario.apellido +
        " email: " +
        usuario.email +
        " password: " +
        usuario.password
    );

    const response = await axios.post(url, {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      contraseña: usuario.password,
      valoracion: 1,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function iniciarSesion(email, password) {
  try {
    const url = `${backend_url}/api/login`;
    const response = await axios.post(url, {
      email: email,
      contraseña: password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error("Email o contraseña incorrectos");
    } else {
      throw error;
    }
  }
}

export async function eliminarFavorito(usuarioId, productoId) {
  try {
    await axios.delete(
      `${backend_url}/api/favoritos/${usuarioId}/${productoId}`,
      getAuthHeaders()
    );
  } catch (error) {
    console.error(error);
  }
}

export async function agregarFavorito(usuarioId, productoId) {
  console.log("Entre a agregar favorito", usuarioId, productoId);
  try {
    await axios.get(
      `${backend_url}/api/favoritos/${usuarioId}/${productoId}`,
      getAuthHeaders()
    );
  } catch (error) {
    console.error("Error al realizar la solicitud GET:", error);
  }
}

export async function mostrarFavoritos(usuarioId) {
  const urlFavoritos = `${backend_url}/api/favoritos/${usuarioId}`;
  const response = await axios.get(urlFavoritos, getAuthHeaders());

  if (response.data) {
    console.log("Datos de favoritos recibidos:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } else {
    return [];
  }
}

export const obtenerMensajes = async (emisor, receptor) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/chat/mensajes/${emisor}/${receptor}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return [];
  }
};

export const obtenerNombreUsuario = async (id) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/usuario/${id}`,
      getAuthHeaders()
    );
    const nombre = response.data.nombre;
    const apellido = response.data.apellido;
    return `${nombre} ${apellido}`;
  } catch (error) {
    console.error("Error al obtener el nombre del usuario:", error);
    return null;
  }
};
