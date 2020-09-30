const fetch = require ("node-fetch");
const bbdd = require("./modulos/s_bbdd.js");


// Método para llamar a la API 
exports.getapiFilms = (req, res) => {
    const titulo = req.params.titulo;
    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=12267320`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    res.json(data);
    })
    .catch((e)=>{
        console.log("error"+e)
    })
}

// Renderiza el HOME y buscar las películas favolitas desde el Buscador.
exports.getBuscador = (req, res) => {
    bbdd.leerPeliculas(req)
    .then((datos)=> {
        res.render ("home", {title: "Cinematón", message: "Cinematón", 
        datos})
    })
    .catch((e)=> console.log("ocurrió un error:"+e))

}

// Método para los campos a editar del FORM de las películas desde la BBDD.
exports.getPeliEditar = (req, res) => {
    bbdd.detallesTitulo(req.params.titulo)
    .then((datos)=> {
        console.log(datos)
        res.render("form", {
            ruta:"/films/edit",    
            metodo: "POST",
            titulo1: "¿Qué película desea actualizar?",  
            posicion: true,
            _id: datos.ID,
            tituloEdit: datos.Titulo, 
            epocaEdit: datos.Epoca, 
            generoEdit: datos.Genero, 
            directorEdit: datos.Director, 
            actorsEdit: datos.Actores, 
            sinopsisEdit: datos.Sinopsis,
            idiomasEdit: datos.Idiomas,
            puntuacionEdit: datos.Puntuacion, 
            produccionEdit: datos.Produccion,
            imagenEdit: datos.Poster,
        }) })
    .catch((e)=> console.log("ocurrió un error:"+e))

}


// Metodo para mostar en detalle de las películas en el pug PELICULAS. 
exports.getPeliDetalle = (req, res) => {
    bbdd.detallesTitulo(req.params.titulo)
    .then((datos)=> {   
        res.render("pelicula", {
            tituloPeli: datos.Titulo, 
            epocaPeli: datos.Epoca, 
            generoPeli: datos.Genero,
            peliDirector: datos.Director, 
            actorPeli: datos.Actores,
            sinopsisPeli: datos.Sinopsis,
            idiomasPeli: datos.Idiomas, 
            puntuacionPeli: datos.Puntuacion, 
            producterPeli: datos.Produccion,
            Poster: datos.Poster,
            botton: false
        })

    })
    .catch((e)=> console.log("Ha ocurrido un problema:"+e))
}

// Método para renderizar los datos de la API en un PUG.
exports.getpeliFinal = (req, res) => {
    const titulo = req.params.titulo;
    fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=12267320`)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        res.render("pelicula", {
            mensaje: "La película de su eleección ",
            tituloPeli: data.Title,
            epocaPeli: data.Year,
            generoPeli: data.Genre,
            peliDirector: data.Director,
            actorPeli: data.Actors,
            sinopsisPeli: data.Plot,
            idiomasPeli: data.Language,
            puntuacionPeli: data.imdbRating,
            productorPeli: data.Production,
            Poster: data.Poster,
            botton: true
        });
    });
}


// Método para renderizar el formulario de "Guardar favoritos"
exports.getForm = (req, res) => { 
    res.render("form", {titulo1: "¿Qué película desea guardar?", ruta:"/films/create", metodo:"POST"})
    
}

// Método para mostar el PUG Error 404.
exports.getError = (req, res) => {
    res.status(404).render("error", {title: "Oh, lo siento, tienes un error 404"});
}

// Método POST para crear un nuevo documento en la BBDD.
exports.posCreateFilms = (req, res) => {
    bbdd.nuevaPelicula(req.body)
    .then(
        res.render("exito", {title: "Enviado con éxito", message: "Tu formulario se ha enviado con éxito"})
        )
    .catch((e)=> console.log("ocurrió un error:"+e))
}
 //;

// Método para editar y actualizar los documentos del FORM. 
exports.putEditarFilms = (req, res) => {
    let ID = req.body.id
    bbdd.editarPelicula(req.body, ID)
    .then(()=> {
        res.status(200).render("exito", {title: "Documento actualizado", message: "Se ha actualizado con éxito "})
    })
    .catch((e)=> console.log("ocurrió un error inesperad:;"+e))
}

//Método POST para borrar un documento de la BBDD.
exports.postDeleteFilms = (req, res) => {
    bbdd.eliminarPelicula (req.body.ID)
    .then(res.status(200).render("exito"))
    .catch((e) => console.log("ocurrió un error"+e))
}
