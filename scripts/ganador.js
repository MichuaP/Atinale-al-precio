document.getElementById("mensaje").innerText = "Increible " + localStorage.alias + "! Eres un campeon indiscutible";
setTimeout(function(){
    document.getElementById("confeti").style.display="none";
},7000);

var audioJuego = new Audio();
    audioJuego.src = 'audio/juego2.mp3';
    audioJuego.loop = true;


function verPuntos(){
    window.location.href = "puntuaciones.html";
}

function irJuego() {
    var links = document.getElementsByTagName("link");
    for (var i = links.length - 1; i >= 0; i--) {
      if (links[i].getAttribute("rel") === "stylesheet") {
        links[i].parentNode.removeChild(links[i]);
      }
    }
    // Carga dinámicamente el contenido de la nueva página
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "juego.html", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Inserta el contenido de la nueva página en el cuerpo del documento actual
        document.body.innerHTML = xhr.responseText;
  
        document.addEventListener("DOMContentLoaded", function () {
          var overlay = document.getElementById("overlay");
          overlay.style.display = "flex";
        });
  
        // Después de 3 segundos, pausa el audio de introducción y reproduce el audio del juego
        setTimeout(function () {
          overlay.style.display = "none";
          audioJuego.play();
        }, 3000);
  
        //Agregar script de juego
        var script = document.createElement("script");
        script.src = "scripts/juego.js";
        document.body.appendChild(script);
  
        var scriptFont = document.createElement("script");
        scriptFont.src = "https://kit.fontawesome.com/d60c975bf8.js";
        scriptFont.crossOrigin = "anonymous";
        document.body.appendChild(scriptFont);
      }
    };
    xhr.send();
  
    // window.location.href = "juego.html";
  }
  