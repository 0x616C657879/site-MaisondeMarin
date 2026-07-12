document.addEventListener("DOMContentLoaded", function() {
    
    /* --- 1. DIAPORAMA HERO (FADE DOUX) --- */
    const heroBg = document.getElementById('hero-bg');
    const images = [
        'photos/chambre.jpg',
        'photos/spa.jpg',
        'photos/vue.jpg',
        'photos/piscine_vue.jpg'
    ];
    let currentIndex = 0;

    if (heroBg) {
        // Change l'image toutes les 5 secondes
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            heroBg.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 5000);
    }

    /* --- 2. APPARITION AU SCROLL (INTERSECTION OBSERVER) --- */
    // Sélectionne tous les éléments avec la classe .reveal
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Se déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px" // Déclenche un peu avant le bas de l'écran
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optionnel : arrête d'observer une fois apparu
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});