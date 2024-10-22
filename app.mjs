//Obtenemos elementos del DOM
const elementos = document.getElementsByClassName('botonesCalculadora');
const borrarTodo = document.getElementById('botonAC');
const borrarUno = document.getElementById('botonDEL');
const botonCalcular = document.getElementById('botonIgu'); 
const botonAns = document.getElementById('botonAns');

//Variables para las funciones
let valorActual = '';
let valorAns = "";


//Funcion que actualiza el valor de la pantalla
function escribirEnPantalla(valor) {
    valorActual += valor.target.innerText;
    mostrarResultado();
}

//Funcion que muestra el valor de valorActual
function mostrarResultado() {
    const resultado = document.getElementById('pantallaCalculadora');
    resultado.innerText = valorActual;
}

//Funcion para limpiar pantalla
function limpiar() {
    valorActual = '';
    operacionActual = '';
    mostrarResultado();
}

//Funcion para borrar un unico numero
function borrarU() {
    valorActual = valorActual.slice(0, -1);
    mostrarResultado();
}

//Funcion para hacer los calculos
function calcular() {
    if (valorActual == '') {
        valorActual = 'Inserte una operacion valida';
        mostrarResultado();

        setTimeout(() => {
            valorActual = ''; 
            mostrarResultado(); 
        }, 1300); 
    } else {
        try {
            // Reemplazamos la 'x' por '*' y '÷' por '/' para que funcione con eval()
            let valorEvaluado = valorActual.replace(/x/g, '*').replace(/÷/g, '/');

            // Usamos eval para calcular la expresión incluyendo los números negativos
            let resultado = eval(valorEvaluado);

            // Si el resultado es válido, lo mostramos
            if (!isNaN(resultado)) {
                valorAns = resultado;
                valorActual = resultado.toString(); // Actualizamos con el resultado
                mostrarResultado();
            } else {
                throw new Error("Operacion no valida");
            }
        } catch (error) {
            valorActual = "Operacion no valida";
            mostrarResultado();

            setTimeout(() => {
                valorActual = ''; 
                mostrarResultado(); 
            }, 1300);
        }
    }
}

//Funcion para recuperar el resultado anterior
function recuperar(){
    valorActual = valorAns.toString();
    mostrarResultado();
}

// Asignamos los Event Listeners
for (let elemento of elementos) {
    elemento.addEventListener('click', escribirEnPantalla);
}
borrarTodo.addEventListener('click', limpiar);
borrarUno.addEventListener('click', borrarU);
botonCalcular.addEventListener('click', calcular);
botonAns.addEventListener('click', recuperar);

