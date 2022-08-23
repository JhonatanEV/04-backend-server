/*
'/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const router = Router();

const { 
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middleware/validar-jwt');

router.get('/',getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser váliado').isMongoId(),
    validarCampos
] ,crearMedico);

router.put('/:id',[], actualizarMedico);

router.delete('/:id',borrarMedico);

module.exports = router;
