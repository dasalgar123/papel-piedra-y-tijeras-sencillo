class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Juego {
    constructor() {
        this.jugadas = ["piedra", "papel", "tijeras"];
        this.jugador = null;
    }

    registrarJugador(nombre) {
        this.jugador = new Jugador(nombre);
    }

    generarJugadaComputadora() {
        const indice = Math.floor(Math.random() * 3);
        return this.jugadas[indice];
    }

    determinarGanador(jugadaJugador, jugadaComputadora) {
        if (jugadaJugador === jugadaComputadora) {
            return "Empate";
        } else if (
            (jugadaJugador === "piedra" && jugadaComputadora === "tijeras") ||
            (jugadaJugador === "papel" && jugadaComputadora === "piedra") ||
            (jugadaJugador === "tijeras" && jugadaComputadora === "papel")
        ) {
            return `${this.jugador.nombre} gana`;
        } else {
            return "Computadora gana";
        }
    }
}

// Manejo de la interfaz
const juego = new Juego();
const btnRegistrar = document.getElementById("btnRegistrar");
const btnEntrar = document.getElementById("btnEntrar");
const btnGuardar = document.getElementById("btnGuardar");
const btnVolver = document.getElementById("btnVolver");
const btnReiniciar = document.getElementById("btnReiniciar");
const nombreJugadorInput = document.getElementById("nombreJugador");
const nombreDisplay = document.getElementById("nombreDisplay");
const resultadoDisplay = document.getElementById("resultado");
const opciones = document.querySelectorAll(".opcion");

// Función para mostrar pantallas
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(pantalla => pantalla.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");
}

// Eventos
btnRegistrar.addEventListener("click", () => {
    mostrarPantalla("registro");
});

btnGuardar.addEventListener("click", () => {
    const nombre = nombreJugadorInput.value;
    if (nombre.trim()) {
        juego.registrarJugador(nombre);
        nombreDisplay.textContent = `Jugador: ${nombre}`;
        mostrarPantalla("juego");
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
});

btnEntrar.addEventListener("click", () => {
    mostrarPantalla("juego");
});

btnVolver.addEventListener("click", () => {
    mostrarPantalla("inicio");
});

opciones.forEach(opcion => {
    opcion.addEventListener("click", (e) => {
        const jugadaJugador = e.target.getAttribute("data-jugada");
        const jugadaComputadora = juego.generarJugadaComputadora();
        const resultado = juego.determinarGanador(jugadaJugador, jugadaComputadora);
        resultadoDisplay.textContent = `Tú: ${jugadaJugador} | Computadora: ${jugadaComputadora} -> ${resultado}`;
    });
});

btnReiniciar.addEventListener("click", () => {
    resultadoDisplay.textContent = "";
    mostrarPantalla("inicio");
});
