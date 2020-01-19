function getDetalle(target) {//He cambiado getDetalle() arriba porque me aparecía un error. Pasamos el target para saber donde estamos
  let imdbID = target.id;
  $("#mimodal").modal('show');
  var titulo = $("#mimodalLabel");//Guardo el modal en una variable
      titulo.html("cargando");
      $("#contenidoM").html('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');
      $(window).scroll(function () {
        // if ($(document).height() - $(this).height() == $(this).scrollTop()) {
        //     alert('Scrolled to Bottom');
        // }
    }); 
      $.ajax({//Realizamos una petición ayax con el id de la pelicula
    url: "https://www.omdbapi.com/?i=" + imdbID + "&apikey=de1c4d44&",
    success: function (respuesta) {  
      var titulo = $("#mimodalLabel");
      titulo.html(respuesta.Title);
      console.log(respuesta)
      $("#contenidoM").html(//asignaremos código HTML a un nodo
        "<p> <Strong>Duración: </Strong>"+
        respuesta.Runtime+
        "</p>"+
        "<p> <Strong>Sinopsis: </Strong> "+ respuesta.Plot+"</p>"
        +"<p><strong>Director: </strong>"+respuesta.Director+"</p>"
        +"<p><strong>Premios: </strong>"+respuesta.Awards+"</p>"
        +"<p><strong>Realizado: </strong>"+respuesta.Released+"</p>"
        //Información que queremos mostrar en nuestro modal
      );

    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }

  });
}
// Esto significa que el intérprete invocará la función inmediatamente y
//  pasará jQuerycomo parámetro, que se utilizará dentro de la función como $.
(function ($){
  if($(window).scrollTop() + $(window).height() == $(document).height()){

  $(function(){
    $("#botonBuscar").on("click", getMovies);
    $("#formulario").on("submit", getMovies);
    var buscarPeli = "";
    function getMovies(event) {
     var busca =  $("#buscarPeli").val()
      $.ajax({
        url: "https://www.omdbapi.com/?s="+ busca +"&apikey=de1c4d44&",
    
        success: function (respuesta) {
          var listaPelis = $("#lista-pelis");
          
          $.each(respuesta.Search, function (index, elemento) {
            listaPelis.append(
              "<div class='col-4'>"+
                "<div class='card text-white bg-dark mb-4'>"+
                  "<img  id='" + elemento.imdbID + "' src=" + elemento.Poster +
                    " onclick='getDetalle(this)' class='card-img-top img-fluid'>" + 
                  "<div class='card-body'>" +
                    "<h5 class='card-title'>" + elemento.Title + "</h5>" + 
                    "<p class='card-text mt-3'>Año:  " + elemento.Year + " </p>" +
                    "<button class='btn btn-primary' onclick='getDetalle(this)' id='" + elemento.imdbID + "' >detalles</button>"+
                  "</div>"+
                "</div>"+
              "</div>"
               );
          });
        },//Sacamos los datos que queremos mostrar en la web
        error: function () {
        
          console.log("No se ha podido obtener la información");
        }
      });
      // Cancela el evento si este es cancelable, 
      // sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
      //para mostrarlo en el card
      event.preventDefault();
    }
  })
}
})(jQuery);

