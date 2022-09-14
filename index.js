require('dotenv').config();

const express = require('express');
const cors = require('cors') ;
const {bdConnection} = require('./database/config');
//Crear el servidor
const app = express();

//Configurar CORS
app.use(cors());

//Carpeta pública
app.use(express.static('public'))

//Lectura y parseo del body

app.use (express.json());

//Base de datos
bdConnection();


//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));

app.use('/api/busquedas', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, ()=>{
    console.log("Servidor corriendo");
}) //Puerto