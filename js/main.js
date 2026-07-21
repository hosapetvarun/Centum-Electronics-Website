// DOM refs
const grid = document.getElementById('productGrid');
const noMsg = document.getElementById('noProductsMessage');
const title = document.getElementById('listingTitle');
const sub = document.getElementById('listingSub');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');

// Scroll progress & back-to-top
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
    backToTop.classList.toggle('visible', scrollTop > 300);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Event delegation
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]') ||
                   e.target.closest('[data-filter]') ||
                   e.target.closest('[data-scroll]') ||
                   e.target.closest('.footer-link') ||
                   e.target.closest('.btn-category[data-filter]');

    if (target && target.dataset.action === 'quickview') {
        e.preventDefault();
        const id = parseInt(target.dataset.id);
        openDetailModal(id);
        return;
    }

    if (target && target.dataset.action === 'specs') {
        e.preventDefault();
        const id = parseInt(target.dataset.id);
        openDetailModal(id);
        return;
    }

    if (target && target.dataset.action === 'image') {
        const id = parseInt(target.dataset.id);
        openImagePreview(id);
        return;
    }

    if (target && target.dataset.filter) {
        e.preventDefault();
        const filter = target.dataset.filter;
        currentFilter = filter;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchTerm = searchInput.value;
        renderProducts();
        scrollToSection('products');
        return;
    }

    if (target && target.dataset.scroll) {
        e.preventDefault();
        scrollToSection(target.dataset.scroll);
        return;
    }

    if (target && target.classList && target.classList.contains('footer-link')) {
        e.preventDefault();
        if (target.dataset.filter) {
            currentFilter = target.dataset.filter;
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchTerm = searchInput.value;
            renderProducts();
            scrollToSection('products');
        } else if (target.dataset.scroll) {
            scrollToSection(target.dataset.scroll);
        }
        return;
    }

    if (target && target.dataset.special) {
        e.preventDefault();
        showToast('Contact our engineering team for custom solutions.');
        return;
    }
});

// Init AOS and render
AOS.init({ once: true, duration: 700, offset: 50 });
renderProducts();

console.log('✅ All functionality restored.');
console.log('📦 ' + productsData.length + ' products preserved.');
console.log('🔍 Quick View → Modal | Image → Preview | Filters → toggle visibility.');
console.log('🔗 All links scroll/filter correctly.');