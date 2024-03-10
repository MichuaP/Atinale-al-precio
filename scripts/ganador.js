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


function nuevoJuego(){
    window.location.href = "juego.html";
    audioJuego.play();
    // -----------se va a cambiar por esto cuando el juego esté listo-----------------
    // var links = document.getElementsByTagName("link");
    // for (var i = links.length - 1; i >= 0; i--) {
    //     if (links[i].getAttribute("rel") === "stylesheet") {
    //         links[i].parentNode.removeChild(links[i]);
    //     }
    // }
    // // Carga dinámicamente el contenido de la nueva página
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'juego.html', true);
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         // Inserta el contenido de la nueva página en el cuerpo del documento actual
    //         document.body.innerHTML = xhr.responseText;
    //         audioAlias.pause();
    //         // Reproduce el audio
    //         audioJuego.play();

    //         //Agregar script de juego
    //         var script = document.createElement("script");
    //         script.src = "scripts/juego.js"; 
    //         document.body.appendChild(script);
            
    //         var scriptFont = document.createElement("script");
    //         scriptFont.src = "https://kit.fontawesome.com/d60c975bf8.js";
    //         scriptFont.crossOrigin = "anonymous";
    //         document.body.appendChild(scriptFont);
            
    //     }
    // };
    // xhr.send();
}