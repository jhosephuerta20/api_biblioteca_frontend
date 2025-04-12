import NavBar from "../components/NavbarFooter/NavBar";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { obtenerMensajes, obtenerNombreUsuario } from "../services/ServicioUsuarios";
import { useUser } from "../hooks/useUser";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { getAuthHeaders } from "../utils/api";
import axios from "axios";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const emisor = searchParams.get("emisor");
  const receptor = searchParams.get("receptor");
  const [mensajes, setMensajes] = useState([]);
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const messagesEndRef = useRef(null);
  const [nombre, setNombre] = useState("");
  

  const { getCurrentUser } = useUser();
  const user = getCurrentUser();
   
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (+emisor !== +user.id) {
        window.location.href = "/perfil";
        return;
    }

    if (+emisor === +receptor) {
        window.location.href = "/perfil";
        return;
    }

    const obtenerUsuario = async () => {
        try {
            const urlTrueques = `${import.meta.env.VITE_BACKEND_URL}/api/trueques/mistrueques/${+user.id}`;
            const responseProductos = await axios.get(urlTrueques, getAuthHeaders());

            
            const truequeValido = responseProductos.data.some(
                (trueque) =>
                    trueque.estadoNombre === "Trueque aceptado" &&
                    (+trueque.usuarioInteresadoId === +receptor || +trueque.usuarioPublicadorId === +receptor)
            );

            if (!truequeValido) {
                window.location.href = "/perfil";
                return;
            }

            const nombre = await obtenerNombreUsuario(+receptor);
            setNombre(nombre);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            window.location.href = "/perfil"; // Evitar acceso en caso de error
        }
    };

    obtenerUsuario();
}, []);

  
  useEffect(() => {
    if (!emisor || !receptor) return;

    const cargarMensajes = async () => {
      try {
        const mensajesPrevios = await obtenerMensajes(emisor, receptor);
        setMensajes(mensajesPrevios);
      } catch (error) {
        console.error("Error cargando mensajes:", error);
      }
    };

    cargarMensajes();

    
    const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);
    
    const client = Stomp.over(socket);
    
    

    client.connect({}, () => {
        // Generar ID único para el chat
        const ids = [emisor, receptor].sort();
        const chatId = `chat_${ids.join('_')}`;
  
        client.subscribe(`/topic/${chatId}`, (message) => {
          const nuevoMensaje = JSON.parse(message.body);
          
          setMensajes(prev => {
            // Evitar duplicados usando el ID del mensaje
            if (!prev.some(m => m.id === nuevoMensaje.id)) {
              return [...prev, nuevoMensaje];
            }
            return prev;
          });
        });
      }, (error) => {
        console.error('Error de conexión:', error);
      });

      setStompClient(client);

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect();
        }
      };
  }, [emisor, receptor]);

  useEffect(scrollToBottom, [mensajes]);

  const handleSendMessage = () => {
    if (!stompClient || !mensajeEnviado.trim()) return;

    const idsOrdenados = [emisor, receptor].sort();
    const chatId = `chat_${idsOrdenados.join('_')}`;

    stompClient.send(
        "/app/enviarMensaje",
        {},
        JSON.stringify({
            emisor,
            receptor,
            contenido: mensajeEnviado
        })
    );

    setMensajeEnviado("");
};

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-160px)]">
           
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
         
          <div className="flex items-center p-4 gap-4 border-b border-gray-200 bg-gray-50">
          <a
            href="/perfil"
            className="flex justify-center items-center p-3 bg-slate-300 hover:bg-slate-200 cursor-pointer rounded-full text-gray-600 hover:text-black"
          >
            <ArrowUturnLeftIcon className="w-5 h-5" />
          </a>
            <h2 className="text-lg font-semibold text-gray-700">
              Chat con {nombre}
            </h2>
          </div>

          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.emisor === emisor ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    msg.emisor === emisor
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${
                    msg.emisor === emisor ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {msg.emisor === emisor ? 'Tú' : `${nombre}`}
                  </div>
                  <p className="break-words">{msg.contenido}</p>
                  <div className="text-xs mt-1 opacity-80 text-right">
                    {new Date(msg.fechaEnvio).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

        
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={mensajeEnviado}
                onChange={(e) => setMensajeEnviado(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!mensajeEnviado.trim()}
                className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;