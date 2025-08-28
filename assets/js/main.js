/**
 * Risolis - Modern Interactive Effects
 * Digital Innovation Solutions
 */

(function() {
    "use strict";

    // ===== NAVBAR SCROLL EFFECTS =====
    function toggleScrolled() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== PARALLAX EFFECTS =====
    function initParallaxEffects() {
        const heroParticles = document.querySelector('.hero-particles');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroParticles) {
                heroParticles.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
            
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // ===== ANIMATED COUNTER =====
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            // Only animate counters that have data-target attribute
            if (counter.hasAttribute('data-target')) {
                const target = +counter.getAttribute('data-target');
                const speed = 50; // Increased speed (was 200)
                let count = 0;
                const increment = target / speed;

                // Determine suffix based on counter content or parent context
                let suffix = '+';
                if (counter.closest('.footer-stats')) {
                    // Footer stats: first is "20+", second is "98%"
                    const footerItems = counter.closest('.footer-stats').querySelectorAll('.stat-number');
                    const index = Array.from(footerItems).indexOf(counter);
                    suffix = index === 1 ? '%' : '+';
                }

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };

                // Use IntersectionObserver to trigger animation when element is visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                            entry.target.classList.add('counted');
                            updateCounter();
                        }
                    });
                }, {
                    threshold: 0.5
                });

                observer.observe(counter);
            }
            // Elements without data-target are left as static text
        });
    }

    // ===== TYPING EFFECT =====
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const originalHTML = heroTitle.innerHTML;
        const textContent = heroTitle.textContent;
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < textContent.length) {
                heroTitle.innerHTML = originalHTML.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after page loads
        setTimeout(typeWriter, 100);
    }

    // ===== PARTICLE SYSTEM =====
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            heroSection.appendChild(particle);
            particles.push(particle);
        }
    }

    // ===== MOBILE NAVIGATION =====
    function initMobileNav() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('#navbarNav');
        const navbar = document.querySelector('.navbar');

        if (navbarToggler && navbarCollapse) {
            let isOpen = false;

            // Toggle mobile menu
            navbarToggler.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                isOpen = !isOpen;
                
                if (isOpen) {
                    navbarCollapse.classList.add('show');
                    navbarToggler.setAttribute('aria-expanded', 'true');
                } else {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });

            // Function to close mobile nav
            function closeMobileNav() {
                if (isOpen) {
                    isOpen = false;
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }

            // Close mobile nav when clicking on links
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    closeMobileNav();
                });
            });

            // Close mobile nav when clicking outside
            document.addEventListener('click', function(e) {
                if (isOpen && !navbar.contains(e.target)) {
                    closeMobileNav();
                }
            });

            // Close mobile nav on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isOpen) {
                    closeMobileNav();
                }
            });

            // Close mobile nav on window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 992 && isOpen) {
                    closeMobileNav();
                }
            });
        }
    }

    // ===== FORM HANDLING =====
    function initFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (!contactForm) return;

        // Real-time validation for contact form
        const contactInputs = contactForm.querySelectorAll('.form-control');
        contactInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });

        // Contact form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            contactInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }
            
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Submit to Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    button.textContent = 'Message Sent!';
                    button.style.backgroundColor = '#28a745';
                    
                    // Reset form and clear validation after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.backgroundColor = '';
                        contactForm.reset();
                        // Clear validation states
                        contactInputs.forEach(input => {
                            input.classList.remove('is-valid', 'is-invalid');
                            const feedback = input.nextElementSibling;
                            if (feedback && feedback.classList.contains('invalid-feedback')) {
                                feedback.classList.remove('show');
                            }
                        });
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Error handling
                console.error('Form submission error:', error);
                button.textContent = 'Error - Try Again';
                button.style.backgroundColor = '#dc3545';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 3000);
            });
        });

        // Newsletter form handling
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                const email = emailInput.value.trim();
                
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    emailInput.classList.add('is-invalid');
                    return;
                }
                
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="bi bi-check"></i>';
                submitBtn.disabled = true;
                
                // Show success message
                showNewsletterSuccess(newsletterForm);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    newsletterForm.reset();
                    emailInput.classList.remove('is-valid');
                }, 3000);
            });
        }
    }

    // Form field validation
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove previous validation classes
        field.classList.remove('is-valid', 'is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.classList.remove('show');
        }

        switch (field.type) {
            case 'text':
                if (field.hasAttribute('required') && value === '') {
                    isValid = false;
                    message = field.name === 'name' ? 'Please enter your name.' : 'This field is required.';
                } else if (field.name === 'name' && value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters long.';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value === '') {
                    isValid = false;
                    message = 'Please enter your email address.';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address.';
                }
                break;
            
            default:
                if (field.tagName.toLowerCase() === 'textarea') {
                    const minLength = field.getAttribute('minlength') || 10;
                    if (value === '') {
                        isValid = false;
                        message = 'Please enter your message.';
                    } else if (value.length < minLength) {
                        isValid = false;
                        message = `Message must be at least ${minLength} characters long.`;
                    }
                } else if (field.hasAttribute('required') && value === '') {
                    isValid = false;
                    message = 'This field is required.';
                }
        }

        if (isValid) {
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
            if (feedback) {
                feedback.textContent = message;
                feedback.classList.add('show');
            }
        }

        return isValid;
    }

    // Newsletter success message
    function showNewsletterSuccess(form) {
        // Remove existing success message
        const existingSuccess = form.querySelector('.newsletter-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'newsletter-success';
        successMsg.textContent = 'Thank you for subscribing!';
        
        // Position relative to form
        form.style.position = 'relative';
        form.appendChild(successMsg);
        
        // Show message
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 100);
        
        // Hide after 3 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.remove();
                }
            }, 300);
        }, 3000);
    }

    // ===== CARD HOVER EFFECTS =====
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .pricing-card, .feature-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===== SCROLL REVEAL ANIMATION =====
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.service-card, .pricing-card, .feature-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // ===== LOADING ANIMATION =====
    function initLoadingAnimation() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        // Add enhanced loading animation
        const loaderContent = loader.querySelector('.loader-content');
        const logo = loader.querySelector('.loader-logo');
        const spinner = loader.querySelector('.loader-spinner');

        if (logo) {
            logo.style.animation = 'logoFloat 2s ease-in-out infinite alternate';
        }

        if (spinner) {
            spinner.style.animation = 'spinnerRotate 1s linear infinite, spinnerPulse 2s ease-in-out infinite';
        }

        // Add progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'loader-progress';
        progressBar.innerHTML = '<div class="loader-progress-bar"></div>';
        if (loaderContent) {
            loaderContent.appendChild(progressBar);
        }

        // Add loading text
        const loadingText = document.createElement('div');
        loadingText.className = 'loader-text';
        loadingText.textContent = '';
        if (loaderContent) {
            loaderContent.appendChild(loadingText);
        }

        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            const progressBarElement = loader.querySelector('.loader-progress-bar');
            if (progressBarElement) {
                progressBarElement.style.width = progress + '%';
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 100);

        // Hide loader when everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                progress = 100;
                const progressBarElement = loader.querySelector('.loader-progress-bar');
                if (progressBarElement) {
                    progressBarElement.style.width = '100%';
                }
                
                setTimeout(() => {
                    loader.classList.add('loaded');
                    clearInterval(progressInterval);
                }, 300);
            }, 800);
        });

        // Fallback: hide after 5 seconds maximum
        setTimeout(() => {
            if (!loader.classList.contains('loaded')) {
                loader.classList.add('loaded');
                clearInterval(progressInterval);
            }
        }, 5000);
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    const headerBar = document.getElementById('headerScrollBar');
        
        if (!progressBar) return;

        let rafId = null;
        let lastScrollY = -1;
        
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Skip update if scroll position hasn't changed
            if (scrollTop === lastScrollY) {
                rafId = null;
                return;
            }
            lastScrollY = scrollTop;
            
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Prevent division by zero
            if (scrollHeight <= 0) {
                rafId = null;
                return;
            }
            
            const scrollPercentage = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
            
            // Use transform instead of width for better performance
            if (progressBar) {
                progressBar.style.transform = `scaleX(${scrollPercentage / 100})`;
                progressBar.style.transformOrigin = 'left';
            }

            // Update header scrollbar if present (visual indicator inside header)
            if (headerBar) {
                // For header, we want a shorter, faster-moving indicator so scale a bit differently
                const headerScale = Math.min(Math.max(scrollPercentage / 100, 0), 1);
                headerBar.style.transform = `scaleX(${headerScale})`;
            }
            
            rafId = null;
        }
        
        function requestScrollUpdate() {
            if (rafId === null) {
                rafId = requestAnimationFrame(updateScrollProgress);
            }
        }

        // Listen for scroll events with optimized throttling
        document.addEventListener('scroll', requestScrollUpdate, { passive: true });
        window.addEventListener('load', updateScrollProgress);
        window.addEventListener('resize', updateScrollProgress);
    }

    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Listen for scroll events
        document.addEventListener('scroll', toggleBackToTop);
        window.addEventListener('load', toggleBackToTop);
    }

    // ===== INITIALIZE ALL FUNCTIONS =====
    function init() {
        // Core functionality
        initSmoothScrolling();
        initMobileNav();
        initFormHandling();
        initBackToTop();
        initScrollProgress();

        // Visual effects
        initParallaxEffects();
        initCardEffects();
        initScrollReveal();
        animateCounters();
        createParticles();
        initLoadingAnimation();

        // Event listeners
        document.addEventListener('scroll', () => {
            toggleScrolled();
            updateActiveNavLink();
        });

        window.addEventListener('load', () => {
            toggleScrolled();
            updateActiveNavLink();
        });

        // Initialize AOS (Animate On Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }

    // ===== START APPLICATION =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();