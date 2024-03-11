// ------------ MENU ----------------
var tiempo = 0;
var cronometro;
var running = false;
var puntaje = 0;

setTimeout(function () {
  startStop();
}, 3000);

function actualizarCronometro() {
  var horas = Math.floor(tiempo / 3600);
  var minutos = Math.floor((tiempo % 3600) / 60);
  var segundos = tiempo % 60;

  document.getElementById("cronometro").innerHTML =
    ("0" + horas).slice(-2) +
    ":" +
    ("0" + minutos).slice(-2) +
    ":" +
    ("0" + segundos).slice(-2);
}

function startStop() {
  if (running) {
    clearInterval(cronometro);
  } else {
    cronometro = setInterval(function () {
      tiempo++;
      actualizarCronometro();
    }, 1000);
  }
  running = !running;
}

function reset() {
  clearInterval(cronometro);
  tiempo = 0;
  actualizarCronometro();
  running = false;
}

document.getElementById("musica").addEventListener("click", function () {
  if (audioJuego.paused) {
    audioJuego.play();
    document.getElementById("musicIcon").classList.remove("fa-volume-xmark");
    document.getElementById("musicIcon").classList.add("fa-volume-high");
    playPauseButton.textContent = "Pause";
  } else {
    audioJuego.pause();
    document.getElementById("musicIcon").classList.remove("fa-volume-high");
    document.getElementById("musicIcon").classList.add("fa-volume-xmark");
  }
});

/* ------------ JUEGO --------------- */
// Obtener todos los elementos con la clase "objeto"
var elementosObjeto = document.querySelectorAll('.objeto');
var esconder = true;
var audioObjeto = new Audio();
var audioNombre = new Audio();
var numObj = 0;
// Iterar sobre cada elemento y agregar un event listener para el evento "drop"
// elementosObjeto.forEach(function(elemento) {
//     elemento.addEventListener('drop', soltar, false);
// });

const objetos = [
  "img/objeto1.png",
  "img/objeto2.png",
  "img/objeto3.png",
  "img/objeto4.png",
  "img/objeto5.png",
  "img/objeto6.png",
  "img/objeto7.png",
  "img/objeto8.png",
  "img/objeto9.png",
];
const precios = [
  "img/precio1.png",
  "img/precio2.png",
  "img/precio3.png",
  "img/precio4.png",
  "img/precio5.png",
  "img/precio6.png",
  "img/precio7.png",
  "img/precio8.png",
  "img/precio9.png",
];

function getRandomItems() {
  const randomPairs = [];

  // Crear copias de los arrays originales para evitar modificar los originales
  // const dispobjetos = [...objetos];
  // const dispprecios = [...precios];

  // Obtener 3 pares únicos de objetos y precios
  for (let i = 0; i < 3; i++) {
    // Verificar si hay elementos disponibles
    if (objetos.length === 0) {
      break; // No hay más elementos disponibles, salir del bucle
    }

    // Seleccionar un índice aleatorio
    const index = Math.floor(Math.random() * objetos.length);

    // Añadir el par correspondiente al array de pares y eliminarlos de los arrays originales
    randomPairs.push({
      objeto: objetos[index],
      precio: precios[index],
    });
    objetos.splice(index, 1);
    precios.splice(index, 1);
  }

  // Shuffle de manera aleatoria los pares de objetos y precios
  const shuffledPairs = mezclarArray(randomPairs);

  // Separar los objetos y precios en arrays distintos
  const randomobjetos = shuffledPairs.map((pair) => pair.objeto);
  const randomprecios = shuffledPairs.map((pair) => pair.precio);

  // Shuffle de manera aleatoria los arrays de objetos y precios
  mezclarArray(randomprecios);

  return { objetos: randomobjetos, precios: randomprecios };
}

// Función para mezclar aleatoriamente un array
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



function dibujarJuego(items) {
   // Iterar sobre los objetos y dibujarlos en los canvas
   items.objetos.forEach((objeto, index) => {
    // Obtener el canvas correspondiente por su ID
    var canvas = document.getElementById('objeto' + (index + 1));
    var contexto = canvas.getContext('2d');

    // Crear una nueva imagen
    const imgObjeto = new Image();
    imgObjeto.src = objeto;
    imgObjeto.draggable = false;

    // Cuando la imagen se haya cargado, calcular el tamaño del canvas manteniendo la relación de aspecto
    imgObjeto.onload = function() {
      var ratio = imgObjeto.width / imgObjeto.height;
      var canvasWidth = canvas.width;
      var canvasHeight = canvasWidth / ratio;
      canvas.height = canvasHeight;

      // Dibujar la imagen en el canvas manteniendo la relación de aspecto
      contexto.drawImage(imgObjeto, 0, 0, canvasWidth, canvasHeight);
    };
  });

  // Dibujar los precios
  items.precios.forEach((precio, index) => {
    let divPrecio = document.getElementById("precio" + (index + 1));
    const imgprecio = new Image();
    imgprecio.src = precio;
    imgprecio.id = 'imgPrecio' + (index+1);

    // Checar salidas en consola
     console.log(precio);
    //  console.log(imgprecio.src);

    imgprecio.draggable = true; // Hacer el precio arrastrable

    // Agregar eventos de arrastre al precio
    imgprecio.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", precio); // Se define la data
      e.dataTransfer.setData("id", imgprecio.getAttribute('id'));
    });

    imgprecio.addEventListener('dragend', finalizado, false);
    divPrecio.appendChild(imgprecio);
  });

  // Agregar eventos de soltar a los objetos
  items.objetos.forEach((objeto, index) => {
    let divObjeto = document.getElementById("objeto" + (index + 1));

    divObjeto.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    divObjeto.addEventListener("drop", (e) => {
      e.preventDefault();

      // Obtener la data del precio arrastrado (la ruta que se mandó en dragStart)
      const precioImagePath = e.dataTransfer.getData("text/plain");
    
      // Obtener la ruta de la imagen del objeto
      const objetoImagePath = items.objetos[index];
      console.log(objetoImagePath[10]);
      console.log(precioImagePath[10])
      // Verificar si las rutas de las imágenes coinciden (el núnemero)
      if (objetoImagePath[10] === precioImagePath[10]) {
        puntaje +=100;
        // alert("¡Acertado!");
        //audio
        audioObjeto.src = "audio/audio" + objetoImagePath[10] + ".mp3";
        audioNombre.src = "audio/nombre" + objetoImagePath[10] + ".mp3";
        audioObjeto.play();
        setTimeout(function(){
          audioNombre.play();
        },5000)
        // Obtener el elemento que se soltó
        var id = e.dataTransfer.getData('id');
        var elemento = document.getElementById(id);
        
        // Obtener el contexto 2D del lienzo sobre el cual se soltó
        var lienzo = e.target.getContext('2d');
        // Dibujar la imagen  dentro del lienzo
        var img = new Image();
        img.src = elemento.src; // Asignar la misma imagen al nuevo objeto de imagen
        img.onload = function() {
            //Ancho y alto de la imagen
            let widthP = 250;
            let heightP = img.height * widthP / img.width;
            lienzo.drawImage(img, 25, 0, widthP, heightP);
        };
        esconder = true;
        numObj++;
        if(numObj==3){//siguiente nivel
          setTimeout(nivel2,10000);
        }else if(numObj == 6){//fin del juego
          setTimeout(function(){
            window.location.href = "felicitaciones.html";
          },10000);
        }
      } else {
        //audio
        audioObjeto.src = "audio/error.mp3";
        audioObjeto.play();
        //
        let idIncorrecto = e.dataTransfer.getData('id');
        let imgIncorrecta = document.getElementById(idIncorrecto);
        let indexIncorrecto = idIncorrecto.charAt(idIncorrecto.length - 1);
        let precio_cont = "precio" + indexIncorrecto;
        let divPrecioInc = document.getElementById(precio_cont);
        divPrecioInc.appendChild(imgIncorrecta);
        esconder = false;
        if(puntaje<100){
          puntaje =0;
        }else{
          puntaje -=50;
        } 
        // alert("¡Falló!");
      }
      document.getElementById("scoreValue").textContent = puntaje;
    });

  });
}

// Cargar todas las imágenes
function loadImages(imagePaths) {
  const promises = imagePaths.map((path) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = path;
    });
  });

  return Promise.all(promises);
}

// function soltar(e) {
//   e.preventDefault();
  
  
// }

function finalizado(e){
  elemento = e.target;
  if(esconder){
    elemento.style.visibility = 'hidden';
  }else{
    elemento.style.visibility = 'visible';
  }
}


// Llamar a la función principal después de cargar todas las imágenes
loadImages([...objetos, ...precios]).then(() => {
  const iniciar = getRandomItems();
  dibujarJuego(iniciar); // Iniciar el juego
});

function nivel2(){
  const overlayTexto = document.getElementById("overlayTexto");
  overlayTexto.textContent = "Pasaste al siguiente nivel";

  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  setTimeout(function(){
    overlay.style.display = "none";
    // Obtener todos los elementos con la clase "precio"
    let elementosPrecio = document.querySelectorAll('.precio');

    // Iterar sobre cada elemento y eliminar todos sus hijos
    elementosPrecio.forEach(elemento => {
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
        // Obtener todos los elementos con la clase "objeto"
        let canvasList = document.querySelectorAll('.objeto');

        // Iterar sobre cada canvas y limpiarlo
        canvasList.forEach(canvas => {
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
    const iniciar2 = getRandomItems();
    dibujarJuego(iniciar2); // Iniciar el juego
  },3000);
}
