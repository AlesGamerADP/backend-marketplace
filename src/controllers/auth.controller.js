const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secret-key-super-segura-cambiar-en-produccion';

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      roleId: user.roleId 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({
        success: false,
        message: 'Email, contraseña y nombre son requeridos',
        data: null
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado',
        data: null
      });
    }

    // Obtener el rol CUSTOMER por defecto
    const customerRole = await Role.findOne({ where: { nombre: 'CUSTOMER' } });
    if (!customerRole) {
      return res.status(500).json({
        success: false,
        message: 'Error: Rol CUSTOMER no encontrado',
        data: null
      });
    }

    // Crear usuario
    const user = await User.create({
      email,
      password,
      nombre,
      roleId: customerRole.id
    });

    // Generar token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          roleId: user.roleId
        },
        token
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      data: null
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
        data: null
      });
    }

    // Buscar usuario con su rol
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role, as: 'role' }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        data: null
      });
    }

    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        data: null
      });
    }

    // Generar token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          roleId: user.roleId,
          role: user.role ? user.role.nombre : null
        },
        token
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      data: null
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, as: 'role' }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Perfil obtenido correctamente',
      data: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        roleId: user.roleId,
        role: user.role ? user.role.nombre : null
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      data: null
    });
  }
};

