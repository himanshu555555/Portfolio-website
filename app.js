// Enhanced scroll navigation with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    
    // Smooth scroll behavior for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting with improved logic
    function updateActiveNav() {
        let scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Header background opacity on scroll
    function updateHeaderBackground() {
        const scrollY = window.pageYOffset;
        const opacity = Math.min(scrollY / 100, 1);
        header.style.background = `rgba(251, 251, 253, ${0.8 + (0.2 * opacity)})`;
    }
    
    // Throttled scroll event handler for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                updateHeaderBackground();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize on load
    updateActiveNav();
    updateHeaderBackground();
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skills-list li');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .timeline-item, .skills-list li');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('project-card') ? 'translateY(-8px)' : 
                                  this.classList.contains('skills-list') ? 'translateX(8px)' : 'translateY(-4px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Add smooth reveal animation for hero content
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});