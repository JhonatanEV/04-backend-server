require('dotenv').config();

const express = require('express');
const cors = require('cors') ;
const {bdConnection} = require('./database/config');
//Crear el servidor
const app = express();

//Configurar CORS
app.use(cors());


//Base de datos
bdConnection();

//console.log(process.env);
//Rutas
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: "Hola Mundo"
    })
});


app.listen(process.env.PORT, ()=>{
    console.log("Servidor corriendo");
}) //Puerto