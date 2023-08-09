import { NAVES_ACTUALES } from "../../../main";
import { words } from "../../data/words";
import "./Nave.css"

export const Nave = () => {
  const divNave$$ = document.createElement("div");
  const imgNave$$ = document.createElement("img");
  const textNave$$ = document.createElement("p");

  const palabraRandom = words[Math.floor(Math.random() * words.length)];

  NAVES_ACTUALES.push(palabraRandom);
  console.log(NAVES_ACTUALES);

  /* imgNave$$.src =
    palabraRandom.length <= 5
      ? "/assets/pequeña.png"
      : palabraRandom.length >= 9
      ? "/assets/grande.png"
      : "/assets/mediana.png"; */

  if (palabraRandom.length <= 5) {
    imgNave$$.src = "/assets/pequeña.png";
    imgNave$$.className = "pequeña";
  } else if (palabraRandom.length >= 9) {
    imgNave$$.src = "/assets/grande.png";
    imgNave$$.className = "grande"
  } else {
    imgNave$$.src = "/assets/mediana.png";
    imgNave$$.className = "mediana"
  }

  divNave$$.className = "nave";
  textNave$$.className = "textNave"
  textNave$$.textContent = palabraRandom;

  divNave$$.appendChild(imgNave$$);
  divNave$$.appendChild(textNave$$);
  document.body.appendChild(divNave$$);

  console.log(window.innerHeight);

  divNave$$.style.top = `${window.innerHeight}px`;
  divNave$$.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
};
