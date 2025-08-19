# React + Vite

E-commerce React App
Descripción del Proyecto

Esta es una aplicación E-commerce desarrollada con React, Vite y Chakra UI. Permite:

- Navegar productos en home y por categorías.

- Agregar productos al carrito.

- Iniciar sesión o Registarse: los datos quedan guardos en LocalStorage

- Realizar un checkout con formulario de compra.

- Guardar órdenes de compra en Firebase Firestore.

- Redirección a una página de agradecimiento por la compra luego de crear orden

- Desplegar la app en la nube con Firebase Hosting (investigar el deploy en firebase hosting).

El proyecto está pensado como ejemplo de integración de React + Chakra + Firebase, con SPA (Single Page Application) y rutas protegidas por React Router.

Tecnologías Utilizadas

- Frontend: React, Vite, Chakra UI
- API de productos: fakestoreapi.com
- Estado global: Context API (para carrito)
- Hosting: Firebase Hosting
- Base de datos: Firebase Firestore (para guardar ordenes)
- Alertas y notificaciones: SweetAlert2
- Ruteo: React Router
- Control de versiones: Git

Instalación

- Clonar el repositorio
  git clone https://github.com/PaulinaBarcosM/proyecto-react.git
  cd proyect-react

- Instalar dependencias
  npm install

- Crear archivo .env con tus claves de Firebase
  VITE_FIREBASE_API_KEY=tu_api_key
  VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
  VITE_FIREBASE_PROJECT_ID=tu_project_id
  VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
  VITE_FIREBASE_APP_ID=tu_app_id

- Ejecutar la app en modo desarrollo:
  npm run dev

Sistema E-commerce creado por Paulina Barcos Melchiori
