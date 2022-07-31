/* Ruta: '/api/login' */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { login } = require('../controllers/auth');
const router = Router();



router.post('/', [
    check('email','El correo es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos, 

],login )

module.exports = router;