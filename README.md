# Multi Servi - FrontEnd 🌍🤝

## Descripción del Proyecto

## Características Principales

## Tecnologías Utilizadas

- **Frontend**: React (v18.2.0)
- **Routing**: React Router (v7.3.0)
- **Gestión de Formularios**:
  - Formik (v2.4.6)
  - React Hook Form (v7.54.2)
- **Validación**: Yup (v1.6.1)
- **Estilos**: Tailwind CSS (v4.0.9)
- **Iconos**:
  - FontAwesome
  - Heroicons
  - Lucide React
- **Cliente HTTP**: Axios (v1.8.3)
- **Herramientas de Desarrollo**:
  - Vite (v6.2.1)
  - ESLint

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## Instalación y Configuración

### Instalar Dependencias

```bash
# Usando npm
npm install

# O usando yarn
yarn install
```

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera una versión de producción
- `npm run lint`: Ejecuta el linter para verificar código
- `npm run preview`: Previsualiza la versión de producción

## Estructura del Proyecto

```
Front_Grupo2/
│
├── src/
│   ├── components/   # Componentes de React
│   ├── pages/        # Páginas de la aplicación
│   ├── services/     # Servicios de API
│   ├── utils/        # Utilidades y helpers
│   └── App.jsx       # Componente principal
├── public/           # Archivos estáticos
└── package.json      # Configuración del proyecto
```

## Configuración de Desarrollo

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para configuraciones sensibles:

```
VITE_API_URL=https://tu-api-backend.com
VITE_API_KEY=your_api_key
```

### Linting

El proyecto usa ESLint para mantener la calidad del código:

- Configuración para React
- Soporte para React Hooks
- Reglas de React Refresh

## Contribución

1. Hacer fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit de cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir un Pull Request
