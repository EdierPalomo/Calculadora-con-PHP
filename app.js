const pantalla = document.getElementById('pantalla');
const historial = document.getElementById('historial');
const teclado = document.querySelector('.teclado');

const estado = {
    valorActual: '0',
    valorAnterior: null,
    operador: null,
    reiniciarPantalla: false,
};

const simbolosOperador = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
};

function actualizarVista() {
    pantalla.textContent = estado.valorActual;

    if (estado.valorAnterior !== null && estado.operador !== null) {
        historial.textContent = `${estado.valorAnterior} ${simbolosOperador[estado.operador]}`;
    } else {
        historial.textContent = '';
    }

    document.querySelectorAll('.btn-operador').forEach((boton) => {
        boton.classList.toggle('activo', boton.dataset.operador === estado.operador && estado.reiniciarPantalla);
    });
}

function ingresarNumero(digito) {
    if (estado.reiniciarPantalla) {
        estado.valorActual = digito === '.' ? '0.' : digito;
        estado.reiniciarPantalla = false;
        actualizarVista();
        return;
    }

    if (digito === '.' && estado.valorActual.includes('.')) return;

    if (estado.valorActual === '0' && digito !== '.') {
        estado.valorActual = digito;
    } else {
        estado.valorActual += digito;
    }

    actualizarVista();
}

function borrarUltimo() {
    if (estado.reiniciarPantalla) return;

    estado.valorActual = estado.valorActual.length > 1
        ? estado.valorActual.slice(0, -1)
        : '0';

    actualizarVista();
}

function aplicarPorcentaje() {
    const numero = parseFloat(estado.valorActual);
    if (Number.isNaN(numero)) return;

    estado.valorActual = String(numero / 100);
    actualizarVista();
}

function limpiarTodo() {
    estado.valorActual = '0';
    estado.valorAnterior = null;
    estado.operador = null;
    estado.reiniciarPantalla = false;
    actualizarVista();
}

async function seleccionarOperador(nuevoOperador) {
    if (estado.operador !== null && !estado.reiniciarPantalla) {
        await calcularResultado();
    }

    estado.valorAnterior = estado.valorActual;
    estado.operador = nuevoOperador;
    estado.reiniciarPantalla = true;
    actualizarVista();
}

async function calcularResultado() {
    if (estado.operador === null || estado.valorAnterior === null) return;

    const expresionCompleta = `${estado.valorAnterior} ${simbolosOperador[estado.operador]} ${estado.valorActual} =`;

    try {
        const respuesta = await fetch('procesar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                numero1: estado.valorAnterior,
                numero2: estado.valorActual,
                operador: estado.operador,
            }),
        });

        const datos = await respuesta.json();

        if (!datos.exito) {
            pantalla.textContent = datos.mensaje;
            historial.textContent = expresionCompleta;
            estado.valorActual = '0';
            estado.valorAnterior = null;
            estado.operador = null;
            estado.reiniciarPantalla = true;
            return;
        }

        estado.valorActual = String(datos.resultado);
        estado.valorAnterior = null;
        estado.operador = null;
        estado.reiniciarPantalla = true;
        actualizarVista();
        historial.textContent = expresionCompleta;
    } catch {
        pantalla.textContent = 'Error de conexión';
        estado.reiniciarPantalla = true;
    }
}

teclado.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (!boton) return;

    const { numero, operador, accion } = boton.dataset;

    if (numero !== undefined) ingresarNumero(numero);
    if (operador !== undefined) seleccionarOperador(operador);
    if (accion === 'limpiar') limpiarTodo();
    if (accion === 'borrar') borrarUltimo();
    if (accion === 'porcentaje') aplicarPorcentaje();
    if (accion === 'calcular') calcularResultado();
});

document.addEventListener('keydown', (evento) => {
    if ((evento.key >= '0' && evento.key <= '9') || evento.key === '.') {
        ingresarNumero(evento.key);
    } else if (['+', '-', '*', '/'].includes(evento.key)) {
        seleccionarOperador(evento.key);
    } else if (evento.key === 'Enter' || evento.key === '=') {
        evento.preventDefault();
        calcularResultado();
    } else if (evento.key === 'Backspace') {
        borrarUltimo();
    } else if (evento.key === 'Escape') {
        limpiarTodo();
    }
});