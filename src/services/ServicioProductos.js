import axios from "axios";
import { getAuthHeaders } from "../utils/api";
import { useUser } from "../hooks/useUser";




const backend_url = import.meta.env.VITE_BACKEND_URL;
export async function obtenerProductos() {
  try {
    const url = `${backend_url}/api/productos`;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function crearProducto(producto) {
  
  try {
    const { getCurrentUser } = useUser();
    const user = getCurrentUser();
    const url = `${backend_url}/api/productos/agregar`;
    
    
    
    const response = await axios.post(url, {
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      valor_referencia: +producto.valor_referencia,
      estado: producto.estado,
      usuarioId: +user.id,
      categorias: producto.categorias,
      imagenes: producto.imagenes
    } , getAuthHeaders());
    
    console.log(response);
    return response.data;
    
    
  } catch (error) {
    console.log(error);
  }
}

export async function editarProducto(id){
    //put
    try {
        const url = `${backend_url}/api/productos/${id}`
    }catch(error){
        console.log(error);
    }
}

export async function eliminarProducto(id){
    try{
        
        const url = `${backend_url}/api/productos/${id}`;
        const response = await axios.delete(url, getAuthHeaders());
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}


export async function obtenerProductoPorId(id) {
  try {
    const url = `${backend_url}/api/productos/${id}`;

    const response = await axios.get(url, getAuthHeaders());

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function obtenerProductosPorUsuario(id){
  try{
    const url = `${backend_url}/api/productos/usuario/${id}`;
    const response = await axios.get(url, getAuthHeaders());
    console.log(response);
    return response.data;
  }catch(error){
    console.log(error);
  }
}


export async function obtenerProductosRecientes(){
    try{
        const url = `${backend_url}/api/productos/recientes`;
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}