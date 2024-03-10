// ------------ MENU ----------------
var tiempo = 0;
var cronometro;
var running = false;
startStop();

function actualizarCronometro() {
  var horas = Math.floor(tiempo / 3600);
  var minutos = Math.floor((tiempo % 3600) / 60);
  var segundos = tiempo % 60;

  document.getElementById('cronometro').innerHTML = 
    ('0' + horas).slice(-2) + ':' +
    ('0' + minutos).slice(-2) + ':' +
    ('0' + segundos).slice(-2);
}

function startStop() {
  if (running) {
    clearInterval(cronometro);
  } else {
    cronometro = setInterval(function() {
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

document.getElementById("musica").addEventListener("click", function(){
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
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

let puntuacion = 0;

function getRandomItems() {
  const randomPairs = [];

  // Crear copias de los arrays originales para evitar modificar los originales
  const dispobjetos = [...objetos];
  const dispprecios = [...precios];

  // Obtener 3 pares únicos de objetos y precios
  for (let i = 0; i < 3; i++) {
    // Verificar si hay elementos disponibles
    if (dispobjetos.length === 0) {
      break; // No hay más elementos disponibles, salir del bucle
    }

    // Seleccionar un índice aleatorio
    const index = Math.floor(Math.random() * dispobjetos.length);

    // Añadir el par correspondiente al array de pares y eliminarlos de los arrays originales
    randomPairs.push({
      objeto: dispobjetos[index],
      precio: dispprecios[index],
    });
    dispobjetos.splice(index, 1);
    dispprecios.splice(index, 1);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar los objetos
  items.objetos.forEach((objeto, index) => {
    const x = 100 + index * 370;
    const y = 10;
    const imgobjeto = new Image();
    imgobjeto.onload = function () {
        const aspectRatio = imgobjeto.width / imgobjeto.height;
        const width = 220 * aspectRatio;
        ctx.drawImage(imgobjeto, x, y, width, 220);
    };
    imgobjeto.src = objeto;
  });

  // Dibujar los precios
  items.precios.forEach((precio, index) => {
    const x = 100 + index * 370;
    const y = 400;
    const imgprecio = new Image();
    imgprecio.draggable = true;
    imgprecio.setAttribute('data-precio', index);
    imgprecio.addEventListener('drag', drag);
    imgprecio.addEventListener('dragstart', dragStart);
    imgprecio.addEventListener('dragover', dragOver);
    imgprecio.addEventListener('drop', drop);
    imgprecio.onload = function () {
      const aspectRatio = imgprecio.width / imgprecio.height;
      const width = 80 * aspectRatio;
      ctx.drawImage(imgprecio, x, y, width, 80);
    };
    imgprecio.src = precio;
  });
}

function dragStart(event) {
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.setData('text', event.target.getAttribute('data-precio'));
}

function dragOver(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();

  // Verificar si el precio arrastrado es igual al índice del objeto
  if (droppedPrecio == objetoIndex) {
    puntuacion += 10; // Acierto, +10 puntos
  } else {
    puntuacion -= 5; // Equivocado, -5 puntos
  }

  actualizarPuntuacion(); // Actualizar la puntuación mostrada
}

// Function to update the displayed score
function actualizarPuntuacion() {
  document.getElementById('scoreValue').innerHTML = puntuacion;
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

// Llamar a la función principal después de cargar todas las imágenes
loadImages([...objetos, ...precios]).then(() => {
  const iniciar = getRandomItems();
  dibujarJuego(iniciar); // Iniciar el juego
});