const path = require('path');
const { response }= require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async(req, res= response) =>{
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        res.status(400).json({
            ok:false,
            msg: 'No es un médico, usurio u hospital (tipo)'
        })
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            smg: 'No hay ningún archivo'
        });
    }

    //Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    //Validar extension
    const extensionesValidad = ['png','jpg','jpeg','gif'];
    if(!extensionesValidad.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extension permitida!'
        })
    }

    //Generar el nombre del archivo ctrl+alt+} para comillas
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, function(err) {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen!'
            });
        }
    
    //Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
      });


    
} 


const retornaImagen = (req, res= response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;
    
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    if ( fs.existsSync(pathImg) ) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        res.sendFile( pathImg );
    }
}

module.exports ={
    fileUpload,
    retornaImagen
}