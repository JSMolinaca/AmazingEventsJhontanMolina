document.addEventListener('DOMContentLoaded', () => {
    const eventosPasados = data.events.filter(evento => parseFecha(evento.date) < hoy);
    mostrarEventos(eventosPasados, 'eventos-container');
  });
  