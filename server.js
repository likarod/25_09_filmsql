const express = require ("express");
const bodyParser = require ("body-parser");
const pelis = require ("./moduloPelis");
const app = express();

//Utilizar un Middleware para visualizar las imágenes.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//Motor de visualización del PUG.
app.set("views", "./views"); //Aquí se le indica en qué directorio se encuentra el PUG.
app.set('view engine', 'pug'); //Llamada al Motor de vista.

/*
-----> Rutas en GET para renderizar información del PUG.
*/

// Enruta para buscar películas desde la API
app.get("/", pelis.getBuscador);
//Llamadas a la API REST para mostrar la película en el HOME
app.get("/api/films/:titulo", pelis.getapiFilms);
// Ruta para mostrar el título buscado desde la API en un nuevo PUG
app.get("/films/:titulo", pelis.getpeliFinal);
// Ruta para editar la película guardada mostrando en la posición el título deseado. 
app.get("/films/edit/:titulo", pelis.getPeliEditar);
//Ruta para mostrar el detalle de la película guarda en el LS en función de la posición.
app.get("/films/detalle/:titulo", pelis.getPeliDetalle);
// Ruta para mostrar el formulario.
app.get("/films/form/create/", pelis.getForm)
// Ruta 404 Not Found.
app.get("*", pelis.getError);


/*
------> Rutas POST
*/
// Ruta para crear documentos de la BBDDD desde el FORM y PELICULAS.
app.post("/films/create", pelis.posCreateFilms);
// Ruta para actualizar los campos del formuliario.
app.post("/films/edit", pelis.putEditarFilms)
// Ruta para interactuar con la BBDD y borrar una película.
app.delete("/films/delete", pelis.postDeleteFilms);


app.listen (3000, function ( ) { 
    console.log ('¡Aplicación de ejemplo escuchando en el puerto 3000!') 
  })
