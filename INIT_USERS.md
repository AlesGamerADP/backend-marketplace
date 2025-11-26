# Inicialización de Usuarios

Este documento explica cómo crear usuarios iniciales con roles CUSTOMER y ADMIN.

## Credenciales por Defecto

### Usuario CUSTOMER
- **Email:** `customer@example.com`
- **Contraseña:** `customer123`
- **Rol:** CUSTOMER
- **Acceso:** Puede ver productos y detalles

### Usuario ADMIN
- **Email:** `admin@example.com`
- **Contraseña:** `admin123`
- **Rol:** ADMIN
- **Acceso:** Puede gestionar productos, categorías y usuarios

## Ejecución Local

### Opción 1: Usando npm scripts
```bash
# Primero inicializar roles (si no están creados)
npm run init:roles

# Luego inicializar usuarios
npm run init:users
```

### Opción 2: Ejecutar directamente
```bash
# Inicializar roles
node src/scripts/initRoles.js

# Inicializar usuarios
node src/scripts/initUsers.js
```

## Ejecución en Render

### Método 1: Usando Render Shell (Recomendado)

1. Ve a tu servicio en Render
2. Haz clic en "Shell" en el menú lateral
3. Ejecuta los siguientes comandos:

```bash
# Inicializar roles (si no están creados)
npm run init:roles

# Inicializar usuarios
npm run init:users
```

### Método 2: Usando Render CLI

Si tienes Render CLI instalado:

```bash
# Conectar a tu servicio
render service:shell backend-marketplace

# Ejecutar scripts
npm run init:roles
npm run init:users
```

### Método 3: Ejecutar como comando de inicio (Temporal)

Puedes modificar temporalmente el `startCommand` en Render para ejecutar los scripts antes de iniciar el servidor:

1. Ve a tu servicio en Render
2. Settings → Build & Deploy
3. Cambia temporalmente el Start Command a:
   ```
   npm run init:roles && npm run init:users && npm start
   ```
4. Guarda y espera a que se ejecute
5. Luego vuelve a cambiar el Start Command a: `npm start`

**Nota:** Este metodo solo es necesario la primera vez. Despues vuelve a `npm start`.

## Verificación

Después de ejecutar los scripts, puedes verificar que los usuarios se crearon correctamente:

1. Inicia sesión en el frontend con las credenciales
2. Verifica que el usuario ADMIN puede acceder a `/admin`
3. Verifica que el usuario CUSTOMER solo puede ver productos

## Seguridad

**IMPORTANTE:** 
- Estas credenciales son solo para desarrollo/pruebas
- En producción, cambia las contraseñas inmediatamente
- Considera usar variables de entorno para las credenciales en producción
- Elimina o desactiva estos usuarios después de crear usuarios reales

## Personalizar Credenciales

Si quieres cambiar las credenciales por defecto, edita el archivo:
`src/scripts/initUsers.js`

Cambia los valores de:
- `email`
- `password`
- `nombre`

