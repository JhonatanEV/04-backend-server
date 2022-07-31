require('dotenv').config();

const express = require('express');
const cors = require('cors') ;
const {bdConnection} = require('./database/config');
//Crear el servidor
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body

app.use (express.json());

//Base de datos
bdConnection();


//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, ()=>{
    console.log("Servidor corriendo");
}) //Puerto