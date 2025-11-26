# Backend Marketplace

API REST para gestionar productos, categorías y usuarios con autenticación JWT.

## Requisitos

- Node.js 18 o superior
- MySQL 8.0 o superior
- npm o yarn

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=marketplace_db
DB_PORT=3306
PORT=3001
NODE_ENV=development
JWT_SECRET=tu-secret-key-super-segura
FRONTEND_URL=http://localhost:3000
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Inicialización

### Crear roles
```bash
npm run init:roles
```

### Crear usuarios por defecto
```bash
npm run init:users
```

Esto creará:
- Usuario CUSTOMER: customer@example.com / customer123
- Usuario ADMIN: admin@example.com / admin123

## Estructura del Proyecto

```
backend-marketplace/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categories.js
│   │   └── products.js
│   ├── scripts/
│   │   ├── initRoles.js
│   │   └── initUsers.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Endpoints

### Autenticación
- POST `/api/auth/register` - Registrar usuario
- POST `/api/auth/login` - Iniciar sesión
- GET `/api/auth/profile` - Obtener perfil (requiere autenticación)

### Productos
- GET `/api/products` - Listar productos (público)
- GET `/api/products/:id` - Obtener producto por ID (público)
- POST `/api/products` - Crear producto (requiere ADMIN)
- PUT `/api/products/:id` - Actualizar producto (requiere ADMIN)
- DELETE `/api/products/:id` - Eliminar producto (requiere ADMIN)

### Categorías
- GET `/api/categories` - Listar categorías (público)
- GET `/api/categories/:id` - Obtener categoría por ID (público)
- POST `/api/categories` - Crear categoría (requiere ADMIN)
- PUT `/api/categories/:id` - Actualizar categoría (requiere ADMIN)
- DELETE `/api/categories/:id` - Eliminar categoría (requiere ADMIN)

## Autenticación

Las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## Roles

- CUSTOMER: Puede ver productos y categorías
- ADMIN: Puede gestionar productos, categorías y usuarios

## Base de Datos

El proyecto usa Sequelize ORM con MySQL. Las tablas se crean automáticamente al iniciar el servidor.

Modelos:
- Users: Usuarios del sistema
- Roles: Roles de usuario (CUSTOMER, ADMIN)
- Products: Productos del marketplace
- Categories: Categorías de productos

## Despliegue

Ver archivo `DEPLOYMENT.md` para instrucciones de despliegue en Render.

## Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon
- `npm run init:roles` - Inicializar roles en la base de datos
- `npm run init:users` - Crear usuarios por defecto

