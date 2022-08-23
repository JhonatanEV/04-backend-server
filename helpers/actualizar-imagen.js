const fs = require('fs'); //Para saber si existe el archivo
const Usuario = require('../models/usuarios');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //Borrar la imagen
        fs.unlinkSync(path);
    }
}

const actualizarImagen =async (tipo, id, nombreArchivo)=>{
    console.log("Vamos bien");
    let pathViejo='';

    switch (tipo) {
        case 'medicos':

            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No se encontró el ID enviado para un medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img= nombreArchivo;
            await medico.save(); 
            return true; 

        break;
        case 'hospitales':
            
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontró el ID enviado para un Hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img= nombreArchivo;
            await hospital.save(); 
            return true; 

        break;
        case 'usuarios':
             const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No se encontró el ID enviado para un Usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img= nombreArchivo;
            await usuario.save(); 
            return true;
        break;
    
        default:
            break;
    }
}

module.exports ={
    actualizarImagen
}