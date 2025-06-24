// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation d'apparition au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animation spéciale pour les cartes d'étapes
                if (entry.target.classList.contains('step-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observer toutes les sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observer les cartes d'étapes
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les cartes d'avantages
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Effet de parallaxe sur le header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const leaves = document.querySelectorAll('.leaf');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Animation des feuilles avec le scroll
        leaves.forEach((leaf, index) => {
            const speed = 0.3 + (index * 0.1);
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Effet de survol interactif sur les cartes d'étapes
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Effet de pulsation sur l'icône
            const icon = this.querySelector('.step-icon i');
            if (icon) {
                icon.style.animation = 'pulse 0.5s ease-in-out';
            }
            
            // Effet de brillance
            this.style.background = 'linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)';
            
            // Animation du numéro
            const number = this.querySelector('.step-number');
            if (number) {
                number.style.transform = 'translateX(-50%) scale(1.1)';
                number.style.background = 'linear-gradient(135deg, #2f855a, #38a169)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon i');
            if (icon) {
                icon.style.animation = 'stepIconFloat 3s ease-in-out infinite';
            }
            
            this.style.background = 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)';
            
            const number = this.querySelector('.step-number');
            if (number) {
                number.style.transform = 'translateX(-50%) scale(1)';
                number.style.background = 'linear-gradient(135deg, #38a169, #2f855a)';
            }
        });
    });

    // Effet de survol sur les cartes d'avantages
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.advantage-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#2f855a';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.advantage-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#38a169';
            }
        });
    });

    // Effet de survol sur les images
    const images = document.querySelectorAll('.section-image, .gallery-item img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.3) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1) contrast(1)';
        });
    });

    // Animation de typing pour le titre principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const titleText = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid #68d391';
        
        let i = 0;
        const typeWriter = () => {
            if (i < titleText.length) {
                mainTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Effet de particules interactives
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = '#68d391';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'particleFloat 2s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    // Ajouter l'animation CSS pour les particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Créer des particules au clic
    document.addEventListener('click', function(e) {
        if (e.target.closest('.step-card, .advantage-card')) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createParticle(
                        e.clientX + (Math.random() - 0.5) * 20,
                        e.clientY + (Math.random() - 0.5) * 20
                    );
                }, i * 100);
            }
        }
    });

    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation de compteur pour les étapes
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach(number => {
        const targetNumber = parseInt(number.textContent);
        number.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = targetNumber / 20;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            current = targetNumber;
                            clearInterval(timer);
                        }
                        number.textContent = Math.floor(current);
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });

    // Effet de vague sur les sections
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
    });

    // Animation des icônes du footer
    const footerIcons = document.querySelectorAll('.footer-icons i');
    footerIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Effet de rotation sur les icônes de section
    const sectionIcons = document.querySelectorAll('.section-icon');
    sectionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // Ajout d'un effet de loading au début
    const loader = document.createElement('div');
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.background = 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.zIndex = '9999';
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <i class="fas fa-seedling" style="font-size: 4rem; animation: bounce 1s infinite;"></i>
            <p style="margin-top: 20px; font-size: 1.5rem;">Chargement...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);

    console.log('🌱 Site du bouturage chargé avec succès!');
});

