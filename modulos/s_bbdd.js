const mariadb = require ("mariadb");

// DATOS PARA REALIZAR LA CONEXION CON MARIADB.

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    connectionLimit: 5,
    database: 'films'
})

/*
Función asíncrona para crear la tabla de Películas y sus filas correspondientes. 
Se llama una única vez. 
*/
async function crearTabla() {
    let conn;
    try{
        conn = await pool.getConnection();
        const nuevaTabla = await conn.query 
        (`CREATE TABLE Peliculas (
        ID int NOT NULL AUTO_INCREMENT,
        Titulo varchar(50) NOT NULL,
        Epoca year NOT NULL,
        Genero varchar(70) NOT NULL,
        Director varchar(30) NOT NULL,
        Actores varchar(70) NOT NULL,
        Sinopsis varchar(240) NOT NULL, 
        Idiomas varchar(70) NOT NULL,
        Puntuacion int DEFAULT 0,
        Produccion varchar(70) NOT NULL, 
        Poster varchar(280),
        PRIMARY KEY(ID));`)
    } catch(e) {
        throw e
    } finally {
        if(conn) conn.release();
    }
} 
// crearTabla(); - Comento el "llamado" de la función ya que no me interesa crear otras tablas con los mismos campos.

/*
Módulo para crear el nuevo Título.
*/
exports.nuevoTitulo = async (datos) => {
    console.log("Su título se ha creado con éxito");
    console.log(datos)
    let conn;
    try{
        conn = await pool.getConnection() //Abrir la conexión
        let res = await conn.query(`INSERT INTO Peliculas(Titulo, Epoca, Genero, Director, Actores, Sinopsis, Idiomas, Puntuacion, Produccion) VALUES (?,?,?,?,?,?,?,?,?)`, [datos.Titulo, datos.Epoca, datos.Genero, datos.Director, datos.Actores, datos.Sinopsis, datos.Idiomas, datos.Puntuacion, datos.Produccion])
        console.log("Creado.")
        console.log(res[0])
        return res
    }catch(e){
        console.log("Su error es "+e)
        return null
    }finally {
        if(conn) conn.release
    }
} 

/*
NOTA 1: 
Tras realizarse el método en la consola aparece: 
    Cannot read property '1' of undefined. 
    Esto se debe porque el poster no llega a leerse. Aún asi, se genera un nuevo título con los campos creados en la tabla. 
Se ha procedido eliminar del INSET TO...Poster. A raiz de ello aparece este nuevo error: 
    Parameter at position 10 is not set. 
Porque no consigue localizar el poster dentro de la BBDD aunque por FORM lo envías.

- ACTUALIZACIÓN ERROR: 
A la hora de guardar los títulos nuevos por el buscador me aparece el siguiente idea: 

    Su error es Error: (conn=2376, no: 1136, SQLState: 21S01) Column count doesn't match value count at row 1
    sql: INSERT INTO Peliculas(Titulo, Epoca, Genero, Director, Actores, Sinopsis, Idiomas, Puntuacion, Produccion) VALUES (?,?,?,?,?,?,?,?,?,?) - parameters:['Train','2008','Horror, Thriller','Gideon Raff','Thora Birch, Gideon Emery, Kavan Reece, Derek Magyar...]

He buscado el error SQLState 21201 -> 21000	The result of a SELECT INTO, scalar fullselect, or subquery of a basic predicate is more than one value.
        
    ***** Cuando elimino el POSTER como un campor a guardar, sí me deja crear un nuevo título en la BBDD.

    --> He intentado solucionarlo cambiando el tipo de dato al que guardar. De varchar - como está escrito aquí arriba - ya que era un string que se guardaba facilmente en MONGODB. Por tanto, en MyPhpAdmin lo cambié a BLOB. Ya que leí en la documentación oficial que era un tipo de valor que admite más byte, por tanto más caracteres (ACTUALIZACION 2: El GET no acepta el BLOB y no consiguía leerlo en el HOME. Se ha dejado como un string)

*/


/*
Módulo para leer un nuevo título para visualizar en PELICULA.pug y poder actualizarlo.
*/
exports.detallesTitulo = async (Titulo) => {
    console.log("Título encontrado")
    let conn;
    try{
        conn = await pool.getConnection();
        let res = await conn.query(`SELECT * FROM Peliculas WHERE Titulo=(?)`, [Titulo]);
        console.log(res[0])
        return res[0]
    }catch(e){
        console.log(e)
        return null
    }finally {
        if(conn) conn.release();
    }
}

/*
Método para leer todas las películas para el HOME.pug
*/
exports.leerTitulos = async () => {
    console.log("Título leído")
    let conn;
    try{
        conn = await pool.getConnection();
        let res = await conn.query(`SELECT * FROM Peliculas`);
        console.log(res)
        return res
    }catch(e){
        console.log(e)
        return null
    }finally {
        if(conn) conn.release();
    }
}
/*
Método para actualizar las filas de las tablas.
*/

exports.editarTitulos = async(datos, ID) => {
    console.log("Se ha actualizado correctamente las filas de la tabla Peliculas");
    let conn;
    try{
        conn = await pool.getConnection();
        let res = await conn.query(`UPDATE Peliculas SET Titulo=(?), Epoca=(?), Genero=(?), Director=(?), Actores=(?), Sinopsis=(?), Idiomas=(?), Puntuacion=(?),Produccion=(?), Poster=(?) WHERE ID=(?)`, [datos.Titulo, datos.Epoca, datos.Genero, datos.Director, datos.Actores, datos.Sinopsis, datos.Idiomas, datos.Puntuacion, datos.Produccion, datos.Poster, ID])

        return res[0]
    }catch(e) {
        console.log(e)
        return null
    }finally{
        if(conn) conn.release();
    }
}

/*
Módulo para eliminar un titulo de la tabla Películas
*/
exports.eliminarTitulo = async(ID) => {
    console.log("El título se ha eliminado con éxito")
    let conn;
    try{
        conn = await pool.getConnection();
        let res = await conn.query(`DELETE FROM Peliculas WHERE ID=(?)`, [ID]);
        console.log(res)
        return res
    }catch(e){
        console.log(e)
        return null
    }finally{
        if(conn) conn.release();
    }
}

/*
ERROR 2: 
    En el botón borrar se ha cambiado en el script para que sea reconocido por el ID. A su vez, en los módulosPelis y entra en el método "postDeleteFilms" ya que lee el console.log(req.body) como el ID correspondiente al botón.
    Se observa en la consola que SÍ que entra en el módulo de la BBDD para borrar con el siguiente mensaje:
        { ID: '2' }
        El título se ha eliminado con éxito
        OkPacket { affectedRows: 0, insertId: 0, warningStatus: 0 }
    
    Sin embargo, no se encuentra ninguna actualización en la BBDD ya que no elimina ningún título.

    ********* El fallo se debía ha que había olvidado poner "req.body.ID"

*/



/*
Espacio de prueba para demostrar que funcionan los módulos.

1.

nuevoTitulo("Love", 23, "Drama y acción", "Yo misma", "La vida y más", "Una historia de amor que muestra como prueba esta funcion", "Spanish", 6, "Warner", "akldfdaklfjadklfjadjfadk")
.then((res)=> console.table(res))
.catch((e)=> console.log(e))

2.

leerTitulo(1)
.then((res)=>console.table(res))
.catch((e)=> console.log(e));

3.

editarTabla(2020, "htpp://google.es", 1)
.then((res)=> console.table(res))
.catch((E)=>console.log(E))

4.
eliminarTitulo(3);
*/

