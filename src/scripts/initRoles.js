const { Role } = require('../models');
const sequelize = require('../config/database');

const initRoles = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');

    // Crear roles si no existen
    const roles = ['CUSTOMER', 'ADMIN'];
    
    for (const roleName of roles) {
      const [role, created] = await Role.findOrCreate({
        where: { nombre: roleName },
        defaults: { nombre: roleName }
      });
      
      if (created) {
        console.log(`Rol ${roleName} creado`);
      } else {
        console.log(`Rol ${roleName} ya existe`);
      }
    }

    console.log('Roles inicializados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar roles:', error);
    process.exit(1);
  }
};

initRoles();

