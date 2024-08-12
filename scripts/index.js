document.addEventListener('DOMContentLoaded', function () {
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

        // Vuelve a pintar con los eventos filtrados
        pintar(filteredEvents, 'eventos-container');
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterCards);
    });

    searchBar.addEventListener('input', filterCards);
});
