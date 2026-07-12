/* --- CONFIGURATION DU DIAPORAMA DE L'ENTÊTE --- */
const photosHero = [
    'vue.jpg',
    'spa.jpg',
    'piscine.jpg',
    'campagne.jpg'
];

const dossier = 'photos/';
const container = document.getElementById('slideshow');
let indexActuel = 0;

if (container) {
    photosHero.forEach((nomPhoto, index) => {
        const divImage = document.createElement('div');
        divImage.classList.add('slide');
        if (index === 0) divImage.classList.add('active');
        divImage.style.backgroundImage = `url('${dossier}${nomPhoto}')`;
        container.appendChild(divImage);
    });

    const lesSlides = document.querySelectorAll('.slide');
    if (lesSlides.length > 1) {
        setInterval(() => {
            lesSlides[indexActuel].classList.remove('active');
            indexActuel = (indexActuel + 1) % lesSlides.length;
            lesSlides[indexActuel].classList.add('active');
        }, 5000);
    }
}

/* --- SCRIPT BOUCLE INFINIE AVIS --- */
document.addEventListener("DOMContentLoaded", function() {
    const marquee = document.getElementById("marquee-content");
    if(marquee) marquee.innerHTML += marquee.innerHTML; 
});

/* --- SCRIPT D'ANIMATION DES BULLES EN CANVAS --- */
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('bubbleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let bubblesArray = [];
    const BUBBLE_COUNT = 60; // Nombre de bulles générées
    let scrollY = window.scrollY;

    // Ajuste la taille du canvas à la section
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Met à jour la position du défilement pour l'effet parallaxe
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Définition d'une bulle
    class Bubble {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 12 + 4; // Taille variée
            this.baseSpeedY = Math.random() * 1 + 0.5; // Vitesse de remontée
            this.parallaxSpeed = this.radius * 0.05; // Plus la bulle est grosse, plus l'effet parallaxe est fort
            this.oscillationSpeed = Math.random() * 0.02 + 0.01;
            this.angle = Math.random() * Math.PI * 2;
        }
        update() {
            // Mouvement naturel de la bulle
            this.y -= this.baseSpeedY;
            this.angle += this.oscillationSpeed;
            this.x += Math.sin(this.angle) * 0.5; // Oscillation gauche-droite

            // Si la bulle sort de l'écran par le haut, on la replace en bas
            const currentVisualY = this.y - (scrollY * this.parallaxSpeed);
            if (currentVisualY + this.radius < 0) {
                this.y = canvas.height + (scrollY * this.parallaxSpeed) + this.radius;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            // Calcul de la position finale affichée en tenant compte du défilement
            const drawY = this.y - (scrollY * this.parallaxSpeed);
            
            // N'affiche la bulle que si elle est dans la zone du Canvas (Optimisation)
            if (drawY > -this.radius && drawY < canvas.height + this.radius) {
                ctx.beginPath();
                ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
                
                // Remplissage semi-transparent
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fill();
                
                // Bordure de la bulle
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.stroke();
                
                // Petit reflet blanc en haut à gauche
                ctx.beginPath();
                ctx.arc(this.x - this.radius * 0.3, drawY - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fill();
            }
        }
    }

    // Création des bulles
    function initBubbles() {
        bubblesArray = [];
        for (let i = 0; i < BUBBLE_COUNT; i++) {
            bubblesArray.push(new Bubble());
        }
    }

    // Boucle d'animation principale
    function animateBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bubblesArray.length; i++) {
            bubblesArray[i].update();
            bubblesArray[i].draw();
        }
        requestAnimationFrame(animateBubbles);
    }

    initBubbles();
    animateBubbles();
});