import { comprobar, spawnNaves } from "../../../main";
import "./Vidas.css"

export const Vidas = () => {

    const imgVida$$ = document.createElement("img");
    const divNegro$$ = document.createElement("div");

    imgVida$$.src = "/assets/heart.svg";
    imgVida$$.className = "vida";
    divNegro$$.className = "negro";

    divNegro$$.style.top = "-40px";

    document.body.appendChild(imgVida$$);
    document.body.appendChild(divNegro$$);

}


export const quitarVida = () => {

    const divNegro$$ = document.querySelector(".negro");

    if (divNegro$$.style.top === "-40px") {
        divNegro$$.style.top = "-25px";
    } else if (divNegro$$.style.top === "-25px") {
        divNegro$$.style.top = "-15px";
    } else if (divNegro$$.style.top === "-15px") {
        divNegro$$.style.top = "-5px";
    } else {
        clearInterval(spawnNaves);
        clearInterval(comprobar);
        document.body.innerHTML = `
            <div class="dead">
                <h1>Has perdido máquina</h1>
            </div>
        `
    }

}