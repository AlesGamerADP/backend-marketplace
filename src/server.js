const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const { Role } = require('./models');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados');

    // Inicializar roles si no existen
    const roles = ['CUSTOMER', 'ADMIN'];
    for (const roleName of roles) {
      await Role.findOrCreate({
        where: { nombre: roleName },
        defaults: { nombre: roleName }
      });
    }
    console.log('Roles inicializados');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();