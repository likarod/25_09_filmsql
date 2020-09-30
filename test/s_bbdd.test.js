const {nuevaPelicula, detallesTitulo, leerPeliculas, editarPelicula, eliminarPelicula} = require('../modulos/s_bbdd')


describe('Test para comprobar el funcionamiento de las BBDD', ()=>{
    let peli = {
        "Titulo": "Love Storie",
        "Epoca": 2013,
        "Genero": "drama",
        "Director": "Almodovar",
        "Actores": "Lucia",
        "Sinopsis": "Esto es una prueba",
        "Idiomas": "Español",
        "Puntuacion": 8,
        "Produccion": "Paramont",
        "Poster": "una imagen"
        }
    /*    
    test('Test para comprobar que se guarda un nuevo Título.', ()=> {
        return nuevaPelicula(peli)
        .then(peli => {
            expect(peli).not.toBe(null)
        })
    })*/
    
    test('Test para comprobar si recibe los detalles de una Película', ()=>{
        return detallesTitulo("Maria")
        .then(pelicula => {
            expect(pelicula.Titulo).toBe("Maria")
        })
    })

    test('Test para comprobaar si se leen todos las Películas en la HOME', ()=> {
        return leerPeliculas()
        .then(Peliculas => {
            expect(Peliculas).not.toBe(null)
        })
    })

    test('Test para comprobar si una Película se ha editado', () => {
        return editarPelicula(peli, 29)
        .then(peli => {
            expect(peli.Idiomas).not.toBe(null)
        })
    })

    test('Test para comprobar que la Película se ha eliminado', () => {
        return eliminarPelicula(29)
        .then(Pelicula => {
            expect(Pelicula).not.toBe(null)
        })
    })
})

