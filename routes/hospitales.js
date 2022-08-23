/*
'/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const router = Router();

const { 
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middleware/validar-jwt');

router.get('/',getHospitales);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
    validarCampos
] ,crearHospital);

router.put('/:id',[], actualizarHospital);

router.delete('/:id',borrarHospital);

module.exports = router;
