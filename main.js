import { Limite } from "./src/components/Limite/Limite";
import { Nave } from "./src/components/Nave/Nave";
import { Vidas, quitarVida } from "./src/components/Vidas/Vidas";
import "./style.css";

export const NAVES_ACTUALES = [];
let escribiendo = false;
let palabraPorEscribir = "";
let letrasEscritas = 0;

export let spawnNaves = setInterval(() => {
  Nave();
}, 3000);

Vidas();
Limite();

document.body.addEventListener("keypress", (e) => {
  // cuando estaba ya escribiendo una palabra y cuando no / voy a hacer cosas diferentes según si ya estoy erscribiendo una palabra o aún no -> crear una variable booleana

  // si no estoy escribiendo, es decir, empiezo o puedo empezar una nueva palabra
  if (!escribiendo) {
    // cojo todas las naves
    for (const nave of NAVES_ACTUALES) {
      // selecciono la primera letra de cada nave, y si es igual que la tecla que yo he pulsado entonces empezaremos a escribir esa palabra
      console.log(nave);
      console.log(nave[0], e.key);
      if (nave[0] === e.key) {
        // he utilizado una variable de apoyo para guardar la palabra que he empezado a escribir
        palabraPorEscribir = nave;
        // ahora ya estamos en el proceso de escribir una palabra
        escribiendo = true;
        // estoy contando la cantidad de teclas que voy pulsando / si en algún momento la cantidad de teclas correctas que he pulsado es igual a la longitud de la palabra que estaba escribiendo significará que he completado la palabra y puedo empezar con una nueva / esta variable también nos sirve para saber que letra de la palabra tenemos que comprobar a continuación.
        letrasEscritas++;

        const pNaves = document.querySelectorAll(".textNave");
        for (const pNave of pNaves) {
          if (pNave.textContent === palabraPorEscribir) {
            pNave.innerHTML = `<span>${pNave.textContent.slice(0, 1)}</span>${pNave.textContent.slice(1)}`
          }
        }
      }
    }
  } else {
    // proceso si ya estamos escribiendo una palabra

    // si ya tenemos completada esa palabra
    if (letrasEscritas + 1 === palabraPorEscribir.length) {
      // selecciono todos los párrafos que hay en mi documento
      const pNaves = document.querySelectorAll(".textNave");
      for (const pNave of pNaves) {
        // los recorro para ver cada uno de ellos
        if (pNave.textContent === palabraPorEscribir) {
          // compruebo si el texto de ese párrafo es la palabra que he conseguido escribir, en caso de que sea, hemos encontrado el párrafo que queríamos
          // ya que tenemos el párrafo cogemos el elemento padre y lo eliminamos
          pNave.parentElement.children[0].src = "/assets/explosion.gif";
          console.log(pNave.parentElement.offsetTop);
          pNave.parentElement.style.top = `${pNave.parentElement.offsetTop}px`;
          NAVES_ACTUALES.splice(NAVES_ACTUALES.indexOf(palabraPorEscribir), 1);

          setTimeout(() => {
            pNave.parentElement.remove();
            // eliminamos del array de palabras que han ido saliendo la que ya hemos acertado
          }, 1000);
        }
      }
      // resetear los valores por defecto para poder volver a escribir una nueva palabra
      escribiendo = false;
      palabraPorEscribir = "";
      letrasEscritas = 0;
    } else {
      // va a ocurrir cuando no hayamos completado todavía la palabra peeero si hayamos empezado a escribir una palabra
      if (palabraPorEscribir[letrasEscritas] === e.key) {
        // comprobando si la letra que nos toca comprobar ahora la estamos escribiendo bien
        // hemos escrito una letra correcta más
        letrasEscritas++;
        const pNaves = document.querySelectorAll(".textNave");
        for (const pNave of pNaves) {
          if (pNave.textContent === palabraPorEscribir) {
            pNave.innerHTML = `<span>${pNave.textContent.slice(0, letrasEscritas)}</span>${pNave.textContent.slice(letrasEscritas)}`
          }
        }
      }
    }
  }
});

export let comprobar = setInterval(() => {
  const naves = document.querySelectorAll(".nave");
  for (const nave of naves) {
    if (nave.offsetTop > document.querySelector(".limite").offsetTop) {
      quitarVida();
      nave.remove();
      NAVES_ACTUALES.splice(NAVES_ACTUALES.indexOf(nave.children[1].textContent), 1);
    }
  }
}, 1000);