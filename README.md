Sistema de Gestión de Empleados - CRUD Full Stack
Este proyecto es una aplicación móvil multiplataforma diseñada para la gestión administrativa de empleados, desarrollada como parte de la formación en el programa ADSO (Análisis y Desarrollo de Software) en el SENA.

La arquitectura se basa en un modelo Cliente-Servidor que integra un frontend móvil, un backend robusto y una base de datos relacional.

🚀 Tecnologías Utilizadas
Frontend
React Native (Expo): Framework para el desarrollo móvil.

React Native Paper: Librería de componentes para una interfaz basada en Material Design.

Expo Router: Enrutamiento basado en archivos.

Backend
Node.js & Express: Entorno de ejecución y framework para la construcción de la API REST.

MySQL: Motor de base de datos relacional para la persistencia de datos.

CORS: Middleware para permitir la comunicación entre el dispositivo móvil y el servidor local.

Dotenv: Gestión de variables de entorno seguras.

📂 Estructura del Proyecto
PROYECTO_EMPLEADO_SENA/
├── backend-empleado/      # Servidor Node.js + Express
│   ├── .env               # Variables sensibles (No subido al repo)
│   ├── .gitignore         # Configuración de exclusión de Git
│   ├── server.js          # Archivo principal del servidor
│   └── package.json
└── frontend-movil/       # Aplicación React Native
├── app/               # Pantallas y Layout (Expo Router)
├── package.json
└── app.json

🛠️ Instalación y Configuración
1. Requisitos Previos
Node.js instalado.

Servidor MySQL (XAMPP, WAMP o Docker).

Dispositivo móvil con Expo Go o Emulador de Android Studio.

2. Configuración del Backend
Entra a la carpeta backend-empleado.

Instala las dependencias: npm install.

Crea un archivo .env con tus credenciales:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_bd
PORT=3000

Inicia el servidor: node server.js.

3. Configuración del Frontend
Entra a la carpeta frontend-movil.

Instala las dependencias: npm install.

IMPORTANTE: En app/index.tsx, actualiza la variable API_URL con la dirección IP de tu computadora:
const API_URL = 'http://192.168.X.X:3000/api/empleados';

Inicia Expo: npx expo start.

📝 Historias de Usuario (Funcionalidades)
Crear: Registro de nuevos empleados con validación de campos.

Leer: Visualización dinámica de la nómina actualizada desde la base de datos.

Actualizar: Modificación de datos existentes (Nombre, Cargo, Salario) mediante un formulario reactivo.

Eliminar: Borrado físico de registros de forma inmediata.

🔒 Seguridad y Buenas Prácticas
Gitignore: El archivo .env está excluido del control de versiones para proteger las credenciales de la base de datos.

Consultas Preparadas: El backend utiliza parámetros ? para prevenir ataques de Inyección SQL.

Modularidad: Separación clara entre la lógica de negocio (Backend) y la lógica de presentación (Frontend).
