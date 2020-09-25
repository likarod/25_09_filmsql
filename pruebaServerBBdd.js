const express = require('express');
const bbdd = require("./modulos/m_bbdd.js");
const app = express();

app.get('/', function (req, res) {
    bbdd.borrarDocPeli("Vital")
    .then((datos)=> console.log(datos))
    .catch((e)=> console.log("ocurrió un error:"+e))
    res.send('Hello World');
})

app.listen(3000, () => {
   console.log("Hola. Estoy conectado en el servidor")
})