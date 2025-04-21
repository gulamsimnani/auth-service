// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {authenticate, authorizeRoles} = require('../middlewares/authMiddleware');
// const authorize = require('../middlewares/authorize');


// 🔐 Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// 🔐 Protected route
router.get('/me', authenticate, authController.getMe);
router.get('/admin', authenticate, authorizeRoles('admin'), authController.getAdmin);


module.exports = router;
