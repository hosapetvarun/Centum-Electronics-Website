// Hamburger
document.getElementById('hamburger').addEventListener('click', () => toggleMenu());
document.getElementById('menuOverlay').addEventListener('click', () => toggleMenu(true));
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

// Nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target && target.startsWith('#')) {
            scrollToSection(target.substring(1));
        }
        toggleMenu(true);
    });
});

// Active section highlighting
const sections = ['hero', 'showcase1', 'showcase2', 'showcase3', 'products', 'applications', 'why'];
const navLinks = document.querySelectorAll('.header-nav a[data-section], .mobile-menu a[data-section]');
let lastSection = 'hero';
window.addEventListener('scroll', () => {
    let current = 'hero';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120) current = id;
        }
    });
    if (current !== lastSection) {
        navLinks.forEach(link => {
            const section = link.dataset.section;
            link.style.color = section === current ? '#EAB308' : 'rgba(255,255,255,0.7)';
        });
        lastSection = current;
    }
});