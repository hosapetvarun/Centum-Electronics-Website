const searchInput = document.getElementById('searchInput');
if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSearch, 200);
    });
}