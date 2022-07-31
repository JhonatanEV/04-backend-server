const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');


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

module.exports = {
    login
};