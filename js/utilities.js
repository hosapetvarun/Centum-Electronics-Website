let toastTimeout;

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

function toggleMenu(open) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const hamburger = document.getElementById('hamburger');
    const isOpen = open !== undefined ? open : mobileMenu.classList.contains('open');
    if (isOpen) {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    } else {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    }
}