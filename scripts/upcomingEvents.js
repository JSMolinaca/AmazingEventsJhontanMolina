document.addEventListener('DOMContentLoaded', () => {
    const eventosFuturos = data.events.filter(evento => parseFecha(evento.date) >= hoy);
    pintar(eventosFuturos, 'eventos-container');
  });
  