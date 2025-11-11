document.addEventListener('DOMContentLoaded', function() {
    const slideshowInner = document.querySelector('.slideshow-inner');
    const images = slideshowInner.querySelectorAll('img');
    const totalImages = images.length;

    // Si no hay imágenes o solo una, no es necesario hacer el slideshow
    if (totalImages <= 1) {
        // Ocultar los controles si solo hay una imagen o ninguna
        const prevButton = document.querySelector('.slideshow-control.prev');
        const nextButton = document.querySelector('.slideshow-control.next');
        const dotsContainer = document.querySelector('.dots-container');
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
    }

    // --- Nuevos elementos de control (aseguramos la selección de tus botones) ---
    const prevButton = document.querySelector('.slideshow-control.prev');
    const nextButton = document.querySelector('.slideshow-control.next');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;
    // Calcula el ancho de la primera imagen, asumiendo que todas tienen el mismo ancho o se ajustan por CSS
    let slideWidth = images[0].clientWidth;
    let slideInterval; // Variable para almacenar el ID del intervalo, para poder detenerlo

    // --- Funciones de utilidad ---

    // Función para actualizar la posición del slideshow
    function updateSlidePosition() {
        slideshowInner.style.transition = 'transform 1s ease-in-out'; // Asegura la transición
        slideshowInner.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateDots(); // Actualiza los puntos cada vez que cambia el slide
    }

    // Función para mover al siguiente slide (usada por el intervalo y el botón 'next')
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalImages) {
            // Reinicia al principio "suavemente" para el ciclo continuo
            slideshowInner.style.transition = 'none'; // Desactiva la transición
            currentIndex = 0;
            slideshowInner.style.transform = `translateX(0)`; // Vuelve a la posición inicial
            // Forzar un reflow (redibujado del DOM) para aplicar el cambio inmediatamente sin transición
            void slideshowInner.offsetWidth; // Esto fuerza el reflow.
            slideshowInner.style.transition = 'transform 1s ease-in-out'; // Reactiva la transición
        }
        updateSlidePosition(); // Actualiza la posición y los puntos
    }

    // Función para mover al slide anterior (usada por el botón 'prev')
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1; // Vuelve al último slide
        }
        updateSlidePosition(); // Actualiza la posición y los puntos
    }

    // Función para ir a un slide específico (usada por los puntos)
    function goToSlide(n) {
        currentIndex = n;
        updateSlidePosition(); // Actualiza la posición y los puntos
    }

    // --- Generación de puntos (indicadores) ---
   function createDots() {
    // ...
    dot.addEventListener('click', () => { /* ... tu lógica ... */ }); // Mantenemos el click para desktop
    // ¡ESTA LÍNEA ES CRÍTICA PARA MÓVILES!
    dot.addEventListener('touchend', (e) => {
        e.preventDefault(); // ¡MUY IMPORTANTE! Evita el "ghost click"
        goToSlide(i); // Llama a tu función para ir al slide específico
        resetInterval(); // Reinicia el intervalo automático
    });
    // ...
}

            dotsContainer.appendChild(dot);
        }
        updateDots(); // Asegura que el punto inicial esté activo
    }

    // Función para actualizar la clase 'active-dot' en los puntos
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }

    // --- Control del Intervalo Automático ---

    // Función para iniciar/reiniciar el intervalo
    function startInterval() {
        slideInterval = setInterval(nextSlide, 4000); // 4 segundos
    }

    // Función para detener y reiniciar el intervalo (útil después de una interacción manual)
    function resetInterval() {
        clearInterval(slideInterval); // Detiene el intervalo actual
        startInterval(); // Inicia uno nuevo
    }

    // --- Listeners de Eventos ---

    // Botones de navegación
   if (prevButton) {
    prevButton.addEventListener('click', () => { /* ... tu lógica ... */ }); // Mantenemos el click para desktop
    // ¡ESTA LÍNEA ES CRÍTICA PARA MÓVILES!
    prevButton.addEventListener('touchend', (e) => {
        e.preventDefault(); // ¡MUY IMPORTANTE! Evita el "ghost click" (doble disparo)
        prevSlide(); // Llama a tu función para ir al slide anterior
        resetInterval(); // Reinicia el intervalo automático
    });
}


    if (nextButton) { // Asegura que el botón exista antes de añadir el listener
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval(); // Reinicia el intervalo
        });
    }

    // Escucha cambios en el tamaño de la ventana para ajustar el ancho del slide
    window.addEventListener('resize', () => {
        // Recalcula el ancho de la imagen principal del slideshow
        slideWidth = images[0].clientWidth;
        // Ajusta la posición actual del slideshow al nuevo ancho
        updateSlidePosition(); // Ajusta la posición actual
    });

    // --- Inicialización ---
    createDots(); // Crea los puntos al cargar la página
    startInterval(); // Inicia el slideshow automático
    updateSlidePosition(); // Establece la posición inicial del slideshow (muestra la primera imagen)
});
