let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerinicial = 40;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let NyancatAudio = new Audio('./sounds/Nyancat.mp3');

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("buenas");
let mostrarTiempo = document.getElementById("t-restante");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} s`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
            NyancatAudio.play();
            setTimeout(mostrarVirus, 3000);
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.gif">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasdestapadas++;
    if (tarjetasdestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[parseInt(id)];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.gif">`;
        clickAudio.play();
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[parseInt(id)];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.gif">`;
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasdestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
                mostrarTiempo.innerHTML = `¡Fantástico! Has ganado en ${timerinicial - timer} s`;
                winAudio.play();  // Reproducir sonido de victoria
                NyancatAudio.play();
                setTimeout(mostrarVirus, 3000);  // Llamar a la función para mostrar el "virus"
            }
        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
                wrongAudio.play();
            }, 700);
        }
    }
}


function mostrarVirus() {
    const virusContainer = document.getElementById("virus-container");
    virusContainer.style.display = "block"; 

    let interval = setInterval(() => {
        crearVirusElement();
    }, 100); 
    setTimeout(() => {
        clearInterval(interval);
    }, 30000); 
}

function crearVirusElement() {
    let virusElement;
    const random = Math.random();

    if (random < 0.5) {
        
        virusElement = document.createElement("img");
        virusElement.src = './img/nyancat.gif';  
        virusElement.classList.add("virus");
    } else {
 
        virusElement = document.createElement("div");
        virusElement.innerText = "¡Arequipa!";  
        virusElement.classList.add("virus-text");
    }

   
    const virusWidth = 50;  
    const virusHeight = 20; 

    const posX = Math.random() * (window.innerWidth * 0.9 - virusWidth); 
    const posY = Math.random() * (window.innerHeight * 0.9 - virusHeight); 

    virusElement.style.left = posX + "px";
    virusElement.style.top = posY + "px";


    document.getElementById("virus-container").appendChild(virusElement);
}


const style = document.createElement("style");
style.innerHTML = `
#virus-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 30%; /* Ocupa todo el ancho de la pantalla */
    height: 30%; /* Ocupa todo el alto de la pantalla */
    z-index: 9999;
    pointer-events: none;
}

.virus, .virus-text {
    position: absolute;
    font-size: 20px;
}

.virus-text {
    font-size: 50px;
    color: red;
    font-weight: bold;
    font-family: 'Comic Sans MS', sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
`;

document.head.appendChild(style);
