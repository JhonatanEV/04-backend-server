const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios =  async(req, res)=>{
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios:usuarios,
        uid: req.uid
    })
};

const crearUsuarios =  async(req, res=response)=>{
    
    const { nombre, password, email } = req.body;

    try{
        //Validar correo que sea unico
        const existeEmail = await Usuario.findOne({email:email });
        if( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg: "El correo ya se encuentra en uso"
            });
        }

        
        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar usuarios
        await usuario.save();

        //Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperador"
        })
    }

    
};

const actualizarUsuario = async(req, res=response)=>{

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    try{

        const usuarioDB = await Usuario.findById(uid);
        
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario"
            })
        }

        //Se extrae pass y google de [Campos] = delete campos.password ......
        const {password,google,email, ...campos} = req.body;
        
        if(usuarioDB.email !== email){
           
            const existeEmail = await Usuario.findOne( {email} )
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese correo"
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid , campos , {new: true});

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperador"
        })
    }
}

const borrarUsuario = async(req, res=response)=>{
    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(uid);
        
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario"
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperador"
        })
    }

}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}