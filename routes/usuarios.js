/*
 Rutas: ./routes/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');

const { getUsuarios, crearUsuarios ,actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

router.get('/',validarJWT,getUsuarios);
router.post('/', 
[   
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos, //Siempre va en ultimo el validador

] ,crearUsuarios);

router.put('/:id',
[   
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos,

], actualizarUsuario);

router.delete('/:id', validarJWT,borrarUsuario);

module.exports = router;