/* 
Módulo que se utilizará para hacer consultas a las bbdd de "FILMS". 
- Documento creado 14/09
*/
const {MongoClient, ObjectID} = require('mongodb');
const url = "mongodb://localhost:27017";

//Create.
const connect =  async () => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => { console.log(err); })
    return client;
}   

/*
Método para poder crear en el BBDD los documentos de las películas guardadas desde el FORM.pug y desd FILM/:titulo.pug.
*/
exports.crearDocPeli = async (datos) => {
    const client = await connect ();
    console.log("++++++++++++++++++")
    const myFilm = {
        Titulo: datos.Titulo,
        Epoca: datos.Epoca,
        Genero: datos.Genero,
        Director: datos.Director,
        Actores: datos.Actores,
        Sinopsis: datos.Sinopsis,
        Idiomas: datos.Idiomas,
        Puntuacion: datos.Puntuacion,
        Produccion: datos.Produccion,
        Poster: datos.Poster}
    const result = await client
    .db("films")
    .collection("Peliculas")
    .insertOne(myFilm);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result;
}

//Leer todas las películas

exports.leerDocPeli = async () => {
    const client = await connect();
    result = await client
        .db("films")
        .collection("Peliculas")
        .find()
        .toArray();
    if(result) {
        console.log("Se han encontrado todos los documentos de la colección");
        return result
    } else { 
        console.log("No se han encontrado los documentos.")
        return null
    }
}

//Detalle

exports.detalleDocPeli = async (datos)  => {
    const client = await connect();
    result = await client
        .db("films")
        .collection("Peliculas")
        .findOne({Titulo: datos});
    if (result) {
        console.log(`Se ha encontrado la pelicula con el título: '${datos}' en la colección`);
        return result;
    } else {
        console.log(`No se encuentra el título: '${datos.Titulo}'`);
        return null;
    }
}


//Update

/*
 Método para actualizar/editar un documento de la BBDD. 
*/
exports.editarDocPeli = async (_id, docuEditado) => {
    const client = await connect();
    result = await client
        .db("films")
        .collection("Peliculas")
        .updateOne(
            {"_id": ObjectID(_id) }, // Filtado
            { $set: {
                "Titulo": docuEditado.Titulo,
                "Epoca": docuEditado.Epoca,
                "Genero": docuEditado.Genero,
                "Director": docuEditado.Director,
                "Actores": docuEditado.Actors,
                "Sinopsis": docuEditado.Sinopsis,
                "Idiomas": docuEditado.Idiomas,
                "Puntuacion": docuEditado.Puntuacion,
                "Produccion": docuEditado.Produccion,
                "Poster": docuEditado.Poster
            }}, //Actualizado
            {upsert: true}
            );
    console.log(`${result.matchedCount} documentos que coinciden con los criterios de consulta.`);
    if (result.upsertedCount > 0) {
        console.log(`Un documento insertado con el id: ${result.upsertedId._id}`);
        return result;
    } else {
        console.log(`No se ha podido modificar este ${result.modifiedCount} documento.`);
    }
      console.log(docuEditado) 
      console.log(_id);
  
}

// //Delete
exports.borrarDocPeli = async (datos) => {
    const client = await connect();
    result = await client
        .db("films")
        .collection("Peliculas")
        .deleteOne({Titulo: datos.Titulo});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}