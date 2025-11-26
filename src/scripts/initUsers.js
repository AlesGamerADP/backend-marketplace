const { User, Role } = require('../models');
const sequelize = require('../config/database');
require('dotenv').config();

const initUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexion a la base de datos establecida');

    const customerRole = await Role.findOne({ where: { nombre: 'CUSTOMER' } });
    const adminRole = await Role.findOne({ where: { nombre: 'ADMIN' } });

    if (!customerRole || !adminRole) {
      console.error('Error: Los roles CUSTOMER y ADMIN deben existir primero');
      console.log('Ejecuta primero: node src/scripts/initRoles.js');
      process.exit(1);
    }

    const [customerUser, customerCreated] = await User.findOrCreate({
      where: { email: 'customer@example.com' },
      defaults: {
        email: 'customer@example.com',
        password: 'customer123',
        nombre: 'Usuario Cliente',
        roleId: customerRole.id
      }
    });

    if (customerCreated) {
      console.log('Usuario CUSTOMER creado:');
    } else {
      console.log('Usuario CUSTOMER ya existe:');
    }
    console.log('   Email: customer@example.com');
    console.log('   Contrasena: customer123');

    const [adminUser, adminCreated] = await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        email: 'admin@example.com',
        password: 'admin123',
        nombre: 'Usuario Administrador',
        roleId: adminRole.id
      }
    });

    if (adminCreated) {
      console.log('Usuario ADMIN creado:');
    } else {
      console.log('Usuario ADMIN ya existe:');
    }
    console.log('   Email: admin@example.com');
    console.log('   Contrasena: admin123');

    console.log('\nCredenciales de Usuario:');
    console.log('----------------------------------------');
    console.log('Usuario CUSTOMER:');
    console.log('   Email: customer@example.com');
    console.log('   Contrasena: customer123');
    console.log('----------------------------------------');
    console.log('Usuario ADMIN:');
    console.log('   Email: admin@example.com');
    console.log('   Contrasena: admin123');
    console.log('----------------------------------------\n');

    console.log('Usuarios inicializados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar usuarios:', error);
    process.exit(1);
  }
};

initUsers();

