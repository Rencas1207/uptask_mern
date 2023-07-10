import express from 'express';
const router = express.Router();

import { registrar, autenticar, confirmar } from '../controllers/usuarioController.js';

// Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar);  // crea un nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar)

export default router;