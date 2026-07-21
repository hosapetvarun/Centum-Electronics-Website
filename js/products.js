let currentFilter = 'all';
let searchTerm = '';
let previewIndex = 0;
let previewProducts = [];

function createProductCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.dataset.sku = p.sku;
    card.dataset.name = p.name;
    card.dataset.desc = p.desc;
    card.dataset.category = p.category;
    card.dataset.id = p.id;

    const catIcon = p.category === 'screws' ? 'fa-bolt' :
                    p.category === 'nuts' ? 'fa-circle-notch' :
                    p.category === 'washers' ? 'fa-circle' : 'fa-arrows-up-down';

    card.innerHTML = `
        <div class="image-wrap" data-id="${p.id}" data-action="image">
            <img src="${p.image || 'screws/screw1.webp'}" alt="${p.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23f1f5f9%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%2394a3b8%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${p.sku}%3C/text%3E%3C/svg%3E'" />
            <span class="badge-stock"><i class="fas fa-check-circle"></i> In Stock</span>
            <span class="badge-category"><i class="fas ${catIcon}"></i> ${p.category}</span>
        </div>
        <div class="info">
            <h4>${p.name}</h4>
            <div class="sku">${p.sku}</div>
            <div class="desc">${p.desc}</div>
            <div class="card-actions">
                <button class="btn-sm" data-id="${p.id}" data-action="quickview">Quick View</button>
                <button class="spec-toggle" data-id="${p.id}" data-action="specs" aria-label="View specifications"><i class="fas fa-chart-simple"></i></button>
            </div>
        </div>
    `;
    return card;
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    const noMsg = document.getElementById('noProductsMessage');
    const title = document.getElementById('listingTitle');
    const sub = document.getElementById('listingSub');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (grid.children.length === 0) {
        productsData.forEach(p => {
            const card = createProductCard(p);
            grid.appendChild(card);
        });
    }

    const cards = grid.querySelectorAll('.product-card');
    let visibleCount = 0;
    const searchLower = searchTerm.toLowerCase().trim();

    cards.forEach(card => {
        const sku = card.dataset.sku || '';
        const name = card.dataset.name || '';
        const desc = card.dataset.desc || '';
        const category = card.dataset.category || '';

        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = searchTerm === '' ||
            name.toLowerCase().includes(searchLower) ||
            sku.toLowerCase().includes(searchLower) ||
            desc.toLowerCase().includes(searchLower);

        const visible = matchesFilter && matchesSearch;
        card.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
    });

    const categoryNames = {
        all: 'All Products',
        screws: 'Screws',
        nuts: 'Nuts',
        washers: 'Washers',
        pins: 'Pins'
    };
    const catLabel = categoryNames[currentFilter] || 'Products';
    title.innerHTML = catLabel + ' <span>Collection</span>';
    sub.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''} in this category.`;

    noMsg.style.display = visibleCount === 0 ? 'block' : 'none';

    filterBtns.forEach(btn => {
        const isActive = btn.dataset.filter === currentFilter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });
}

function filterCategory(category, scrollToProducts = true) {
    currentFilter = category;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchTerm = searchInput.value;
    }
    renderProducts();
    if (scrollToProducts) {
        scrollToSection('products');
    }
}

function handleSearch() {
    const input = document.getElementById('searchInput');
    if (input) {
        searchTerm = input.value;
        renderProducts();
    }
}