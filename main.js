//Matrix Code
// Obtener el elemento canvas del documento
const canvas = document.getElementById("canv");
// Obtener el contexto 2D del canvas
const ctx = canvas.getContext("2d");

// Definir el ancho y alto del canvas basado en el ancho y alto del cuerpo del documento
const w = (canvas.width = document.body.offsetWidth);
const h = (canvas.height = document.body.offsetHeight);

// Calcular el número de columnas para la animación basado en el ancho del canvas
const cols = Math.floor(w / 15) + 1;
// Inicializar un array para almacenar las posiciones verticales de cada columna
const ypos = Array(cols).fill(0);

// Definir caracteres para la animación de Matrix
const matrixCharacters =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;'\",.<>?/`~";

// Estado para indicar si la animación está activa o no
let animationActive = true;

// Función principal para la animación de Matrix
function matrix() {
    // Si la animación no está activa, salir de la función
    if (!animationActive) {
        return;
    }

    // Rellenar el canvas con un color negro transparente para crear el efecto de desvanecimiento
    ctx.fillStyle = "#0001";
    ctx.fillRect(0, 0, w, h);

    // Configurar estilos para el texto de la animación
    ctx.fillStyle = "#0f0";
    ctx.font = "10pt monospace";

    // Iterar sobre cada columna
    ypos.forEach((y, ind) => {
        // Obtener un carácter aleatorio de la cadena de caracteres de Matrix
        const text =
            matrixCharacters[
                Math.floor(Math.random() * matrixCharacters.length)
            ];

        // Calcular la posición horizontal (x) basada en el índice de la columna
        const x = ind * 15;

        // Dibujar el carácter en la posición actual (x, y)
        ctx.fillText(text, x, y);

        // Actualizar la posición vertical de la columna
        if (y > 100 + Math.random() * 10000) {
            // Reiniciar la posición si la columna ha llegado demasiado abajo
            ypos[ind] = 0;
        } else {
            // Incrementar la posición vertical de la columna
            ypos[ind] = y + 15;
        }
    });
}

// Agregar un evento de clic al canvas para detener/reanudar la animación
canvas.addEventListener("click", () => {
    // Cambiar el estado de la animación al hacer clic
    animationActive = !animationActive;

    // Si la animación se reanuda, reiniciar las posiciones verticales
    if (animationActive) {
        ypos.fill(0);
        matrix();
    }
});

// Establecer un intervalo para ejecutar la función matrix cada 50 milisegundos
setInterval(matrix, 50);
