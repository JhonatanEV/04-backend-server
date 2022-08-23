const { response }= require('express');
const Usuario = require('../models/usuarios');
const Medicos = require('../models/medicos');
const Hospitales = require('../models/hospital');
const { Promise } = require('mongoose');


const getBusquedas = async(req, res= response) =>{
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); //Like %%

    //Ejecutar Individual
    //const usuarios      = await Usuario.find({nombre: regex});
    //const medicos       = await Medicos.find({nombre: regex});
    //const hospitales    = await Hospitales.find({nombre: regex});

    //Promise -> Ejecuta individual pero espera que todos devuelvan info
    const [usuarios,medicos,hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medicos.find({nombre: regex}),
        Hospitales.find({nombre: regex}),
    ])
    
    res.json({
        ok:true,
        'val':busqueda,
        usuarios,
        medicos,
        hospitales
    })
} 

const getDocumentosColeccion = async(req, res= response) =>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); //Like %%

    let data =[];

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({nombre: regex})
                           .populate('usuario','nombre img') //Inner join con tabla usuarios y solo extraer columnas nombre,img
                           .populate('hospital','nombre img');
        break;

        case 'hospitales':
            data = await Hospitales.find({nombre: regex})
                              .populate('usuario','nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({nombre: regex});
        break;
    
        default:
           return res.status(400).json({
                ok:false,
                smg:'La tabla tiene que ser medicos/hospitales/medicos'
            });
    }

        res.json({
            ok:true,
            resultados:data
        })

} 

module.exports ={
    getBusquedas,
    getDocumentosColeccion
}