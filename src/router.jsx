import { createBrowserRouter } from "react-router-dom";
import Inicio from "./pages/Inicio";
import LoginRegistro from "./pages/LoginRegistro";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Marketplace from "./pages/Marketplace";
import Categorias from "./pages/Categorias";
import Perfil from "./pages/Perfil";
import Favoritos from "./components/Usuario/Favoritos";

import DetalleProducto, {
  loader as detalleProductoLoader,
} from "./pages/DetalleProducto";
import Chat from "./pages/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "loginregistro",
        element: <LoginRegistro />,
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoutes>
            <Perfil />
          </ProtectedRoutes>
        ),
      },
      {
        path: "favoritos",
        element: (
          <ProtectedRoutes>
            <Favoritos />
          </ProtectedRoutes>
        ),
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "marketplace/producto/:id",
        element: (
          <ProtectedRoutes>
            <DetalleProducto />
          </ProtectedRoutes>
        ),
        loader: detalleProductoLoader,
      },

      {
        path: "categorias",
        element: <Categorias />,
      },
      {
        path: "chat",
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
