const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login =  async(req, res)=>{
    try{
        
        //Recuperando POST
        const {email, password} = req.body;
        
        const usuarioDB = await Usuario.findOne({email});
        
        //Vereficar email
        if(!usuarioDB){
            return res.status(500).json({
                ok: false,
                msg: 'Email no valida'
            })
        }

        //Vereficar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
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

const googleSingIn =  async(req, res)=>{
    try {
        const {email, name, picture} = await googleVerify( req.body.token );
        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario =  new Usuario({
                nombre: name,
                email:email,
                password:'@@@',
                img: picture,
                google:true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password='@@@'
        }

        await usuario.save();
        //Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: 'Token de Google no es correcto!'
        });
    }
    
    
}
module.exports = {
    login,
    googleSingIn
};