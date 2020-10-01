const {nuevaPelicula, detallesTitulo, leerPeliculas, editarPelicula, eliminarPelicula} = require('../modulos/s_bbdd')


describe('Test para comprobar el funcionamiento de las BBDD', ()=>{
    let peli = {
        "Titulo": "Volver",
        "Epoca": 2006,
        "Genero": "Melodrama, Comedia",
        "Director": "Pedro Almodovar",
        "Actores": "Penélope Cruz, Carmen Maura, Lola Dueñas, Blanca Portillo",
        "Sinopsis": "Tres generaciones de mujeres que sobreviven al viento solano, al fuego, a la locura, a la superstición e incluso a la muerte a base de bondad, mentiras y una vitalidad sin límites",
        "Idiomas": "Español",
        "Puntuacion": 8,
        "Produccion": "El deseo",
        "Poster": "https://www.elindependiente.com/wp-content/uploads/2020/09/volver.jpg"
        }
       
    test('Test para comprobar que se guarda un nuevo Título.', ()=> {
        return nuevaPelicula(peli)
        .then(peli => {
            expect(peli).not.toBe(null)
        })
    })

    /*   
    test('Test para comprobar que no se guarda un nuevo Título.', ()=> {
        return nuevaPelicula(peli)
        .then(peli => {
            expect(peli).toBe(null)
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

