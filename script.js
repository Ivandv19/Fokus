// Seleccionar elementos del DOM
const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const botonIniciarPausar = document.querySelector('#start-pause');
const inputMusicaEnfoque = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

// Configurar audio
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

// Variables de tiempo
let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

// Reproducción de música para el modo enfoque
inputMusicaEnfoque.addEventListener('change', () => {
    // Verifica si la música está pausada
    if (musica.paused) {
        // Si está pausada, inicia la reproducción
        musica.play();
    } else {
        // Si ya está reproduciéndose, la pausa
        musica.pause();
    }
});

// Event Listeners para los botones de enfoque y descanso
botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

// Función para cambiar el contexto de la aplicación
function cambiarContexto(contexto) {
    // Llama a la función mostrarTiempo para actualizar el tiempo en la interfaz
    mostrarTiempo();

    // Itera sobre todos los botones y les quita la clase 'active'
    botones.forEach(function (botonContexto) {
        botonContexto.classList.remove('active');
    });

    // Actualiza el atributo 'data-contexto' en el elemento HTML para reflejar el nuevo contexto
    html.setAttribute('data-contexto', contexto);

    // Cambia la imagen del banner según el contexto seleccionado
    banner.setAttribute('src', `/imagenes/${contexto}.png`);

    // Cambia el contenido del título según el contexto
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
            break;

        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
            break;

        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
            `;
            break;

        // Si el contexto no coincide con ninguno de los casos anteriores, no se realiza ninguna acción adicional
        default:
            break;
    }
}

// Función para la cuenta regresiva
const cuentaRegresiva = () => {
    // Verifica si el tiempo ha llegado a cero
    if (tiempoTranscurridoEnSegundos <= 0) {
        // Reproduce el audio de fin de tiempo
        audioTiempoFinalizado.play();
        // Muestra una alerta indicando que el tiempo ha finalizado
        alert('¡Tiempo finalizado!');
        // Llama a la función reiniciar para resetear el temporizador
        reiniciar();
        // Sale de la función
        return;
    }

    // Cambia el texto del botón para que indique 'Pausar' mientras el temporizador está en marcha
    textoIniciarPausar.textContent = 'Pausar';

    // Disminuye en 1 el tiempo transcurrido en segundos
    tiempoTranscurridoEnSegundos -= 1;

    // Muestra en la consola el tiempo restante para seguimiento y depuración
    console.log('Temporizador: ' + tiempoTranscurridoEnSegundos);

    // Llama a la función mostrarTiempo para actualizar el tiempo en pantalla
    mostrarTiempo();
};

// Event Listener para el botón de iniciar/pausar
botonIniciarPausar.addEventListener('click', iniciarOpausar);

// Función para iniciar o pausar la cuenta regresiva
function iniciarOpausar() {
    // Verifica si ya existe un intervalo activo
    if (idIntervalo) {
        // Reproduce el audio de pausa
        audioPausa.play();
        // Llama a la función reiniciar para detener y resetear el temporizador
        reiniciar();
        // Sale de la función
        return;
    }

    // Reproduce el audio de inicio
    audioPlay.play();

    // Inicia la cuenta regresiva, llamando a la función cuentaRegresiva cada segundo
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

// Función para reiniciar la cuenta regresiva
function reiniciar() {
    // Detiene el temporizador limpiando el intervalo activo
    clearInterval(idIntervalo);

    // Cambia el texto del botón a 'Comenzar' para indicar que el temporizador está detenido
    textoIniciarPausar.textContent = 'Comenzar';

    // Cambia el ícono del botón a una imagen de "play" para indicar que se puede iniciar de nuevo
    iconoIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png');

    // Reinicia idIntervalo a null para indicar que no hay un intervalo activo
    idIntervalo = null;
}

// Función para mostrar el tiempo en pantalla
function mostrarTiempo() {
    // Convierte el tiempo transcurrido (en segundos) a un objeto Date en milisegundos
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);

    // Formatea el tiempo para mostrar solo minutos y segundos en el formato de México (es-MX)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', { minute: '2-digit', second: '2-digit' });

    // Muestra el tiempo formateado en el elemento HTML
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

// Llama a la función mostrarTiempo para mostrar el tiempo inicial en pantalla
mostrarTiempo();