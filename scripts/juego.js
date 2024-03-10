// ------------ MENU ----------------
var tiempo = 0;
var cronometro;
var running = false;

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
  // Dibujar los objetos
  items.objetos.forEach((objeto, index) => {
    let divObjeto = document.getElementById("objeto" + (index + 1));
    const imgobjeto = new Image();
    imgobjeto.src = objeto;
    imgobjeto.draggable = false;
    divObjeto.appendChild(imgobjeto);
  });

  // Dibujar los precios
  items.precios.forEach((precio, index) => {
    let divPrecio = document.getElementById("precio" + (index + 1));
    const imgprecio = new Image();
    imgprecio.src = precio;
    imgprecio.draggable = true; // Hacer el precio arrastrable

    // Agregar eventos de arrastre al precio
    imgprecio.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", imgprecio.id);
    });

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
      const precioId = e.dataTransfer.getData("text/plain");
      const precioElement = document.getElementById(precioId);
    
      // // Obtener la ruta de la imagen del objeto y precio
      // const objetoImagePath = items.objetos[index];
      // const precioImagePath = items.precios[index];
    
      // // Verificar si las rutas de las imágenes coinciden
      // if (objetoImagePath === precioImagePath) {
      //   alert("¡Acertado!");
      // } else {
      //   alert("¡Falló!");
      // }
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

// Llamar a la función principal después de cargar todas las imágenes
loadImages([...objetos, ...precios]).then(() => {
  const iniciar = getRandomItems();
  dibujarJuego(iniciar); // Iniciar el juego
});