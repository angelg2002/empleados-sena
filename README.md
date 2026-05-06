# 📱 Sistema de Gestión de Empleados (CRUD Full-Stack)

Este proyecto es una aplicación móvil multiplataforma diseñada para la administración y control de nómina de empleados. Fue desarrollado como evidencia práctica para el programa de formación **Tecnólogo en Análisis y Desarrollo de Software (ADSO)** del **SENA**.

La arquitectura del sistema implementa un modelo **Cliente-Servidor (Desacoplado)** de tres capas: Frontend Móvil, Backend (API REST) y Base de Datos Relacional.

---

## 🚀 Tecnologías Utilizadas

### 🎨 Frontend (Móvil)
* **React Native & Expo:** Entorno de desarrollo para aplicaciones móviles nativas multiplataforma.
* **Expo Router:** Enrutamiento y navegación moderna basada en archivos (`app/_layout.tsx` e `app/index.tsx`).
* **React Native Paper:** Librería de componentes de UI basada en *Material Design* para una interfaz limpia y profesional.

### ⚙️ Backend (Servidor)
* **Node.js & Express:** Entorno de ejecución y framework para la creación de la API REST y el manejo de rutas HTTP.
* **MySQL & mysql2:** Base de datos relacional y conector que utiliza consultas preparadas para asegurar la persistencia de los datos.
* **CORS:** Control de acceso que permite la conexión segura entre el dispositivo móvil (o emulador) y el servidor local.
* **Dotenv:** Gestión de credenciales mediante variables de entorno seguras.

---

## 📂 Estructura del Proyecto

```text
PROYECTO_EMPLEADO_SENA/
├── backend-empleado/      # Servidor API REST (Node.js + Express)
│   ├── .env               # Configuración local de base de datos (Excluido en .gitignore)
│   ├── .gitignore         # Archivos omitidos en el control de versiones
│   ├── server.js          # Archivo con las rutas de la API (GET, POST, PUT, DELETE)
│   └── package.json       # Dependencias del servidor
│
└── frontend-movil/       # Aplicación Móvil (React Native + Expo)
    ├── app/               # Carpeta contenedora de vistas (Expo Router)
    │   ├── _layout.tsx    # Esqueleto y envoltura de PaperProvider
    │   └── index.tsx      # Interfaz de usuario principal y lógica de fetch
    ├── app-example/       # Respaldo de archivos de plantilla original de Expo
    ├── package.json       # Dependencias de la app móvil
    └── app.json           # Configuración global de Expo

🛠️ Instalación y Configuración
1. Requisitos Previos
Node.js instalado.

Servidor MySQL (XAMPP, WAMP o Docker).
Configuración de la Base de Datos
Crea una base de datos en MySQL llamada proyecto_empleado_sena y ejecuta la siguiente estructura de tabla:

SQL
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cargo VARCHAR(100),
    salario DECIMAL(10, 2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Dispositivo móvil con Expo Go o Emulador de Android Studio.

 Configuración del Backend
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
