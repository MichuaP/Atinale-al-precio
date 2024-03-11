// Crea un elemento de audio
var audioAlias = new Audio();
audioAlias.src = "audio/alias.mp3";
audioAlias.loop = true;

// Crea un elemento de audio
var audioJuego = new Audio();
audioJuego.src = "audio/juego2.mp3";
audioJuego.loop = true;

var audioIntro = new Audio();
audioIntro.src = "audio/intro.mp3";
audioIntro.loop = false;

document.getElementById("creditos").addEventListener("click", function () {
  window.location.href = "creditos.html";
});

document.addEventListener("keydown", function (event) {
  // Verifica si la tecla presionada es Enter (código 13)
  if (event.key === "Enter") {
    // Redirige a la sig página
    // window.location.href = "introducirNom.html";

    //CAMBIOS----
    var links = document.getElementsByTagName("link");
    for (var i = links.length - 1; i >= 0; i--) {
      if (links[i].getAttribute("rel") === "stylesheet") {
        links[i].parentNode.removeChild(links[i]);
      }
    }
    // Carga dinámicamente el contenido de la nueva página
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "introducirNom.html", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Inserta el contenido de la nueva página en el cuerpo del documento actual
        document.body.innerHTML = xhr.responseText;
        // Reproduce el audio
        audioAlias.play();
      }
    };
    xhr.send();
  }
});

function irJuego() {
  let alias = document.getElementById("alias").value;
  alias = alias.toUpperCase(); //lo convierte en mayúsculas
  // console.log("alias:"+alias);

  localStorage.alias = document.getElementById("alias").value;
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
      audioAlias.pause();

      audioIntro.play();

      document.addEventListener("DOMContentLoaded", function () {
        var overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
      });

      // Después de 3 segundos, pausa el audio de introducción y reproduce el audio del juego
      setTimeout(function () {
        audioIntro.pause();
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
