// Registriere einen Listener, der ausgeführt wird, sobald das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {

    // Referenz auf das Element, das das "About"-Overlay öffnen soll
    const aboutTrigger = document.querySelector('.about-trigger');
    // Referenz auf das Overlay-Element selbst (wird ein-/ausgeblendet)
    const aboutOverlay = document.querySelector('.about-overlay');

    // Füge dem Trigger einen Klick-Listener hinzu, der das Overlay sichtbar macht
    aboutTrigger.addEventListener('click', function() {
        // Aktiviert die CSS-Klasse, die das Overlay einblendet (sichtbar machen)
        aboutOverlay.classList.add('sichtbar');
    });

    // Füge dem Overlay einen Klick-Listener hinzu, um es wieder zu schließen
    aboutOverlay.addEventListener('click', function() {
        // Entfernt die Sichtbarkeitsklasse, so dass das Overlay ausgeblendet wird
        aboutOverlay.classList.remove('sichtbar');
    });


    // Wähle alle Akkordeon-Header (Liste von Interaktionspunkten für das Akkordeon)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Iteriere über jeden Header und hänge einen Klick-Handler an
    accordionHeaders.forEach(header => {
        // Beim Klick auf einen Header soll das zugehörige Akkordeon-Item aufgeklappt werden
        header.addEventListener('click', function() {
            // Finde das nächsthöhere Akkordeon-Item-Element, das diesen Header enthält
            const item = header.closest('.accordion-item');
            // Toggel die .active-Klasse, um den Inhalt ein- oder auszublenden
            item.classList.toggle('active');
        });
    });


    // Referenzen zu den Elementen, die das Modal öffnen/schließen
    const openModalBtn = document.querySelector('.btn-open-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.modal-close');

    // Öffnet das Modal, indem die Sichtbarkeitsklasse gesetzt wird
    openModalBtn.addEventListener('click', function() {
        // Sichtbar machen des Modal-Overlays
        modalOverlay.classList.add('sichtbar');
    });

    // Schließt das Modal über den Close-Button
    closeModalBtn.addEventListener('click', function() {
        // Sichtbarkeitsklasse entfernen -> Modal verschwindet
        modalOverlay.classList.remove('sichtbar');
    });

    // Schließen durch Klick auf den dunklen Hintergrund des Overlays
    modalOverlay.addEventListener('click', function(event) {
        // Schließe nur, wenn wirklich der Overlay-Hintergrund (nicht das Modal-Innere) angeklickt wurde
        if (event.target === modalOverlay) {
            // Entfernt die Sichtbarkeitsklasse und schließt damit das Modal
            modalOverlay.classList.remove('sichtbar');
        }
    });


}); // Ende DOMContentLoaded-Handler