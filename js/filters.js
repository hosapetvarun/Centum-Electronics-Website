const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        currentFilter = filter;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchTerm = searchInput.value;
        renderProducts();
    });
});