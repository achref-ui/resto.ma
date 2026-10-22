const menuButton = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');

function setMenuOpen(isOpen) {
    if (!menuButton || !navLinks) return;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    navLinks.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
}

if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.addEventListener('click', event => {
        if (event.target instanceof Element && event.target.closest('a')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) setMenuOpen(false);
    });
}

const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll(
    '.highlight-card, .menu-item, .about-photo, .about-content, .review-card, .contact-panel'
);

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => {
        element.classList.add('js-reveal');
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add('is-visible'));
}
