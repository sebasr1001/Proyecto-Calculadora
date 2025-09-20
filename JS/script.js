// === VARIABLES GLOBALES ===
let displayValue = '0';           // Valor mostrado en pantalla
let primerOperando = null;        // Primer número en la operación
let operador = null;              // Operador actual (+, -, *, /)
let esperandoSegundoOperando = false; // Bandera para controlar entrada del segundo número

// Obtenemos todos los botones (ajusta el selector según tu HTML)
const botones = document.querySelectorAll("button");

// Función para actualizar la pantalla
function actualizarPantalla() {
    const pantalla = document.querySelector(".pantalla"); // Ajusta al id o clase de tu display
    pantalla.textContent = displayValue;
}

// Inicializamos la pantalla al cargar
actualizarPantalla();

// --- 4. MANEJO DE EVENTOS DE CLIC ---
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valorBoton = boton.textContent;

        if (boton.classList.contains('operador')) {
            manejarOperador(valorBoton);
        } else if (boton.classList.contains('igual')) {
            manejarIgual();
        } else if (boton.classList.contains('clear')) {
            reiniciarCalculadora();
        } else if (valorBoton === '.') {
            inputDecimal(valorBoton);
        } else {
            inputNumero(valorBoton);
        }

        actualizarPantalla();
    });
});

// --- 5. FUNCIONES LÓGICAS ---
function inputNumero(numero) {
    if (esperandoSegundoOperando) {
        displayValue = numero;
        esperandoSegundoOperando = false;
    } else {
        displayValue = displayValue === '0' ? numero : displayValue + numero;
    }
}

function inputDecimal(punto) {
    if (esperandoSegundoOperando) {
        displayValue = '0.';
        esperandoSegundoOperando = false;
        return;
    }
    if (!displayValue.includes(punto)) {
        displayValue += punto;
    }
}

function manejarOperador(proximoOperador) {
    const valorActual = parseFloat(displayValue);

    if (operador && esperandoSegundoOperando) {
        operador = proximoOperador;
        return;
    }

    if (primerOperando === null) {
        primerOperando = valorActual;
    } else if (operador) {
        const resultado = calcular(primerOperando, valorActual, operador);
        displayValue = `${parseFloat(resultado.toFixed(7))}`;
        primerOperando = resultado;
    }

    esperandoSegundoOperando = true;
    operador = proximoOperador;
}

function calcular(primero, segundo, op) {
    if (op === '+') return primero + segundo;
    if (op === '-') return primero - segundo;
    if (op === '*') return primero * segundo;
    if (op === '%') return primero % segundo;
    return segundo;
}

function manejarIgual() {
    if (primerOperando === null || operador === null) {
        return;
    }

    if (operador === '/' && displayValue === '0') {
        displayValue = 'Error';
        setTimeout(reiniciarCalculadora, 1500);
        return;
    }

    const segundoOperando = parseFloat(displayValue);
    const resultado = calcular(primerOperando, segundoOperando, operador);
    displayValue = `${parseFloat(resultado.toFixed(7))}`;
    primerOperando = null;
    operador = null;
    esperandoSegundoOperando = false;
}

function reiniciarCalculadora() {
    displayValue = '0';
    primerOperando = null;
    operador = null;
    esperandoSegundoOperando = false;
}
