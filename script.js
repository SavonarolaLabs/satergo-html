// Scroll Animation System
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.collectAnimatedElements();
        this.addEventListeners();
        this.markAsLoaded();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, this.observerOptions);
    }

    collectAnimatedElements() {
        const elements = document.querySelectorAll('[class*="reveal-"]');
        elements.forEach(element => {
            this.animatedElements.push(element);
            this.observer.observe(element);
        });
    }

    revealElement(element) {
        const delay = parseInt(element.getAttribute('data-reveal-delay')) || 0;

        setTimeout(() => {
            element.classList.add('is-revealed');
        }, delay);

        // Unobserve element after animation
        this.observer.unobserve(element);
    }

    addEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Button hover effects
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover);
            button.addEventListener('mouseleave', this.handleButtonLeave);
        });

        // Download button interactions
        document.querySelectorAll('.downloads-tiles-item-content a').forEach(link => {
            link.addEventListener('click', this.handleDownloadClick);
        });
    }

    handleButtonHover(e) {
        const button = e.target;
        button.style.transform = 'translateY(-1px)';
    }

    handleButtonLeave(e) {
        const button = e.target;
        button.style.transform = 'translateY(0)';
    }

    handleDownloadClick(e) {
        // Add download animation
        const button = e.target;
        const originalText = button.textContent;

        if (!button.href || button.href.includes('#')) {
            e.preventDefault();

            button.style.opacity = '0.6';
            button.textContent = 'Coming Soon...';

            setTimeout(() => {
                button.style.opacity = '1';
                button.textContent = originalText;
            }, 2000);
        }
    }

    markAsLoaded() {
        document.body.classList.add('is-loaded');
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.collectParallaxElements();
        this.bindEvents();
    }

    collectParallaxElements() {
        // Add subtle parallax to hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            this.elements.push({
                element: hero,
                speed: 0.5
            });
        }
    }

    bindEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;

        this.elements.forEach(({ element, speed }) => {
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Platform Icon Animations
class PlatformIcons {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
    }

    addHoverEffects() {
        document.querySelectorAll('.tiles-item').forEach(tile => {
            const icon = tile.querySelector('.platform-icon svg');

            tile.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });

            tile.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                }
            });
        });
    }
}

// Header Scroll Effects
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.lastScrollY = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            this.header.style.background = 'rgba(20, 21, 28, 0.95)';
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.header.style.background = 'rgba(20, 21, 28, 0.9)';
            this.header.style.boxShadow = 'none';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            this.typeText(heroTitle);
        }
    }

    typeText(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = '1';

        let index = 0;
        const timer = setInterval(() => {
            element.innerHTML = text.slice(0, index + 1);
            index++;

            if (index >= text.length) {
                clearInterval(timer);
                element.classList.add('is-revealed');
            }
        }, 50);
    }
}

// Mouse Movement Effects - Disabled to match original

// Feature Image Animations
class FeatureAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageHovers();
    }

    setupImageHovers() {
        document.querySelectorAll('.feature-image').forEach(image => {
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05) rotateY(5deg)';
                image.style.transition = 'transform 0.5s ease';
                image.style.boxShadow = '0 16px 64px rgba(94, 94, 233, 0.3)';
            });

            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotateY(0deg)';
                image.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new PlatformIcons();
    new HeaderEffects();
    new FeatureAnimations();
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any position-dependent animations
    window.dispatchEvent(new Event('scroll'));
}, 250);

window.addEventListener('resize', handleResize);

// Donation functionality
function showDonationInfo() {
    alert('To support Satergo development, please visit:\nhttps://github.com/Satergo/Satergo\n\nOr contact the team via Telegram for donation information.');
}
