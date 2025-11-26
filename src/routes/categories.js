const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Rutas públicas
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Rutas protegidas (solo ADMIN)
router.post('/', authenticate, authorize('ADMIN'), categoryController.createCategory);
router.put('/:id', authenticate, authorize('ADMIN'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('ADMIN'), categoryController.deleteCategory);

module.exports = router;

