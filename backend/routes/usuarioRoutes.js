import express from 'express';
const router = express.Router();

import {
   registrar,
   autenticar,
   confirmar,
   olvidePassword,
   comprobarToken,
   nuevoPassword,
   perfil
}
   from '../controllers/usuarioController.js';

import checkAuth from '../middleware/checkAuth.js';

// Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar);  // crea un nuevo usuario
router.post('/login', autenticar);
router.get('/confirm/:token', confirmar);
router.post('/forget-password', olvidePassword);
router.get('/forget-password/:token', comprobarToken);
router.post('/forget-password/:token', nuevoPassword);

// router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword); // otra forma

router.get('/perfil', checkAuth, perfil);

export default router;