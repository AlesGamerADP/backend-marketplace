const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');

const app = express();

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps, curl, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Verificar si el origin está en la lista permitida
    const isAllowed = allowedOrigins.some(allowed => allowed === origin);
    
    // Permitir cualquier dominio de Vercel (vercel.app)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // En desarrollo, permitir cualquier origin
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En produccion, si no hay FRONTEND_URL configurado, permitir todos (temporal)
    // Esto es util durante el despliegue inicial antes de configurar FRONTEND_URL
    if (!process.env.FRONTEND_URL) {
      console.warn('FRONTEND_URL no configurado. Permitindo todos los origenes.');
      return callback(null, true);
    }
    
    // Si esta en la lista permitida
    if (isAllowed) {
      return callback(null, true);
    }
    
    // Si llegamos aqui, el origin no esta permitido
    console.log('Origin no permitido:', origin);
    console.log('Origenes permitidos:', allowedOrigins);
    callback(new Error('No permitido por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;