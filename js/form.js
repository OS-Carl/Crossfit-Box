document.addEventListener('DOMContentLoaded', function() {
    // FORMULARIO DE LA SECCIÓN DE CONTACTO
    const formContact = document.getElementById('main-contact-form');
    const messageDivContact = document.getElementById('form-message-main-contact');
    const submitButtonContact = document.getElementById('submit-main-contact');

    if (formContact) { // Asegurarse de que el formulario exista
        formContact.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío tradicional (recarga de página)

            messageDivContact.textContent = ''; // Limpiar cualquier mensaje previo
            submitButtonContact.disabled = true; // Desactivar el botón
            submitButtonContact.textContent = 'Enviando...'; // Cambiar texto del botón

            const formData = new FormData(formContact); // Recopilar los datos del formulario

            // Usar Fetch API para enviar los datos de forma asíncrona (AJAX)
            fetch(formContact.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Verificar si la respuesta de la red fue exitosa (código 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json(); // Parsear la respuesta JSON del script PHP
            })
            .then(data => {
                // Mostrar el mensaje al usuario basado en la respuesta del PHP
                messageDivContact.textContent = data.message;
                if (data.success) {
                    messageDivContact.style.color = 'green'; // Mensaje de éxito en verde
                    formContact.reset(); // Limpiar el formulario si el envío fue exitoso
                } else {
                    messageDivContact.style.color = 'red'; // Mensaje de error en rojo
                }
            })
            .catch(error => {
                // Capturar y mostrar errores de red o del proceso de fetch
                console.error('Error en el envío del formulario de contacto:', error); // Para depuración
                messageDivContact.textContent = 'Ocurrió un error inesperado al conectar con el servidor. Por favor, inténtalo de nuevo.';
                messageDivContact.style.color = 'red';
            })
            .finally(() => {
                // Esto se ejecuta siempre, ya sea éxito o error
                submitButtonContact.disabled = false; // Reactivar el botón
                submitButtonContact.textContent = 'Enviar mensaje'; // Restaurar el texto original
            });
        });
    }
});