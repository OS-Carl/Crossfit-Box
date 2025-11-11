document.addEventListener('DOMContentLoaded', function() {
  const scrollTextContainer = document.querySelector('.scroll-text-container');
  const scrollTextElement = document.querySelector('.scroll-text');
  const originalText = "CROSSFIT-FUNCIONAL-OPEN BOX-GYMNASTICS-OLY-MUSCULACIÓN-CRÍOTERAPIA-CLASES PERSONALIZADAS-TALLERES ESPECIALES-";
  let repeatedText = originalText;

  if (scrollTextContainer && scrollTextElement) {
    const containerWidth = scrollTextContainer.offsetWidth;
    let textWidth = scrollTextElement.offsetWidth; // Inicialmente 0

    // Repetir el texto hasta que sea al menos el doble del ancho del contenedor
    while (textWidth < containerWidth * 2) {
      repeatedText += originalText;
      scrollTextElement.textContent = repeatedText;
      textWidth = scrollTextElement.offsetWidth;
    }

    let speed = 1;
    let position = containerWidth;

    function animateScrollText() {
      position -= speed;
      scrollTextElement.style.transform = `translateX(${position}px)`;

      if (position < -textWidth) {
        position = containerWidth;
      }

      requestAnimationFrame(animateScrollText);
    }

    animateScrollText();
  } else {
    console.error("No se encontraron los elementos...");
  }
});