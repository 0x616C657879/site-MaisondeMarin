document.addEventListener("DOMContentLoaded", function() {
    
    /* --- 1. DIAPORAMA HERO (FADE TRÈS DOUX) --- */
    const heroBg = document.getElementById('hero-bg');
    // Mettez ici les noms exacts de vos plus belles photos romantiques
    const images = [
        'photos/chambre.jpg',
        'photos/spa.jpg',
        'photos/vue.jpg',
        'photos/piscine_vue.jpg'
    ];
    let currentIndex = 0;

    if (heroBg) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            heroBg.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 5000); // Change d'image toutes les 5 secondes
    }

    /* --- 2. APPARITION AU SCROLL ÉLÉGANTE --- */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});