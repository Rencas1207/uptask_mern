import express from 'express';
const router = express.Router();

import { registrar } from '../controllers/usuarioController.js';

// Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar);  // crea un nuevo usuario

export default router;