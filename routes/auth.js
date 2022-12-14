/* Ruta: '/api/login' */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { login,googleSingIn } = require('../controllers/auth');
const router = Router();



router.post('/', [
    check('email','El correo es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos, 

],login )

router.post('/google', [
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos, 

],googleSingIn )

module.exports = router;