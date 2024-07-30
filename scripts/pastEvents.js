document.addEventListener('DOMContentLoaded', () => {
    const eventosPasados = data.events.filter(evento => parseFecha(evento.date) < hoy);
    pintar(eventosPasados, 'eventos-container');
});