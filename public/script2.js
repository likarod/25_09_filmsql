/*
Se genera un FAKE FORM para poder realizar un POST y mandar los datos a la BBDD y que se puedan leer rápidamente.
*/ 


let favorito = document.getElementById("btnFavorito");
if(favorito!=null) {
  favorito.addEventListener("click", () => {
// POST DATA para mandar los datos al fake FORM
// let nuevoFavorito = new FormData(); 
  let datos = document.getElementsByTagName("span");
      nuevoFavorito = {
          "Titulo": datos[0].innerText,
          "Epoca": datos[1].innerText,
          "Genero": datos[2].innerText,
          "Director": datos[3].innerText,"Actores": datos[4].innerText,
          "Sinopsis": datos[5].innerText,
          "Idiomas": datos[6].innerText,
          "Puntuacion": datos[7].innerText,
          "Produccion": datos[8].innerText,
          "Poster": document.getElementById("poster").src
      }
      
      console.log(nuevoFavorito);
      //Aquí se utiliza el FETCH para mandar los datos y realizar el POST. También se especifica la ruta a donde quiere recargar. 
          
      fetch('/films/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(nuevoFavorito)
          })
        .then((respuesta)=>{
          console.log
          ("Se ha enviado con éxito")
          console.log(respuesta)
          location.replace("/")
          })
        .catch((e)=>{
          console.log("error"+e)
          })});
}


