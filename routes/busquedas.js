/*
'/api/busquedas'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const router = Router();

const { getBusquedas,getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');

router.get('/:busqueda', validarJWT, getBusquedas);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router; 