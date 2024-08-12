document.addEventListener('DOMContentLoaded', function () {
    const eventosContainer = document.getElementById('eventos-container');
    pintar(data.events, 'eventos-container');

    const checkboxes = document.querySelectorAll('.category-filter');
    const searchBar = document.getElementById('search-bar');

    function filterCards() {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const searchTerm = searchBar.value.toLowerCase();

        const filteredEvents = data.events.filter(event => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
            const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        eventosContainer.innerHTML = '';

        if (filteredEvents.length > 0) {
            pintar(filteredEvents, 'eventos-container');
        } else {
            eventosContainer.innerHTML = '<div class="text-center">Your search had no matches.</div>';
        }

    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterCards);
    });

    searchBar.addEventListener('input', filterCards);
});
