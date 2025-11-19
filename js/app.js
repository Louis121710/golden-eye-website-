class GoldenEyeApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupContactForms();
        this.setupServiceOptions();
        this.setupMobileMenu();
        console.log('GoldenEye Website initialized');
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    setupMobileMenu() {
        // Wait a bit to ensure DOM is ready
        setTimeout(() => {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;
            
            if (!menuToggle || !navLinks) {
                console.warn('Mobile menu elements not found', { menuToggle, navLinks });
                return;
            }
            
            console.log('Setting up mobile menu', { menuToggle, navLinks });
            
            // Ensure button is clickable
            menuToggle.style.pointerEvents = 'auto';
            menuToggle.style.cursor = 'pointer';
            menuToggle.style.zIndex = '9999';
            menuToggle.setAttribute('tabindex', '0');
            
            // Toggle menu function
            const toggleMenu = (event) => {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                }
                
                const isActive = navLinks.classList.contains('active');
                console.log('Toggling menu', { isActive });
                
                if (isActive) {
                    // Close menu
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                } else {
                    // Open menu
                    menuToggle.classList.add('active');
                    navLinks.classList.add('active');
                    body.classList.add('menu-open');
                    body.style.overflow = 'hidden';
                }
            };

            // Remove any existing listeners by cloning the button
            const newToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newToggle, menuToggle);
            const freshToggle = document.querySelector('.mobile-menu-toggle');
            
            // Multiple event handlers for maximum compatibility
            const handleToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                toggleMenu(e);
                return false;
            };
            
            // Click event
            freshToggle.addEventListener('click', handleToggle, { passive: false, capture: true });
            
            // Touch events
            freshToggle.addEventListener('touchstart', handleToggle, { passive: false, capture: true });
            freshToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu(e);
            }, { passive: false });
            
            // Mouse events
            freshToggle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                toggleMenu(e);
            }, { passive: false });
            
            // Keyboard support
            freshToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu(e);
                }
            });

            // Close menu when clicking on a link (but allow navigation)
            const closeMenu = () => {
                freshToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            };
            
            navLinks.querySelectorAll('a').forEach(link => {
                // Force clickability
                link.style.pointerEvents = 'auto';
                link.style.cursor = 'pointer';
                link.style.webkitTapHighlightColor = 'rgba(0, 102, 204, 0.2)';
                link.style.zIndex = '1002';
                link.style.position = 'relative';
                link.style.touchAction = 'manipulation';
                
                // Remove any existing click handlers that might prevent navigation
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Close menu on link click, but don't prevent navigation
                newLink.addEventListener('click', (e) => {
                    console.log('Link clicked:', newLink.href);
                    // Don't prevent default - allow navigation
                    // Just close the menu after navigation starts
                    setTimeout(closeMenu, 50);
                }, { passive: true, capture: false });
                
                // Also handle touch events
                newLink.addEventListener('touchend', (e) => {
                    console.log('Link touched:', newLink.href);
                    setTimeout(closeMenu, 50);
                }, { passive: true });
            });

            // Close menu when clicking on backdrop (but not on links)
            const handleBackdropClick = (e) => {
                if (navLinks.classList.contains('active')) {
                    const isClickOnMenu = navLinks.contains(e.target);
                    const isClickOnToggle = freshToggle.contains(e.target);
                    const isClickOnLink = e.target.closest('a') !== null && navLinks.contains(e.target.closest('a'));
                    
                    // Don't close if clicking on a link - let it navigate
                    if (isClickOnLink) {
                        return;
                    }
                    
                    // Close if clicking outside menu or on backdrop
                    if (!isClickOnMenu && !isClickOnToggle) {
                        closeMenu();
                    } else if (isClickOnMenu && !isClickOnLink && e.target === navLinks) {
                        closeMenu();
                    }
                }
            };
            
            // Use capture phase but check for links first
            document.addEventListener('click', handleBackdropClick, true);

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    closeMenu();
                }
            });
            
            console.log('Mobile menu setup complete');
        }, 100);
    }

    handleScroll() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    setupContactForms() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    setupServiceOptions() {
        const serviceOptions = document.querySelector(".service-options");
        if (serviceOptions && serviceOptions.children.length === 0) {
            serviceOptions.innerHTML = [
                "Modern Guarding",
                "Armed Response",
                "Training",
                "CCTV",
                "Access Control Systems",
                "Intruder Detection Systems",
                "Fire Detection Systems",
                "Public Address / Evacuation Systems",
                "Investigations",
                "Risk Management in Rural Areas"
            ].map((service, index) => `
                <div class="service-option">
                    <input type="checkbox" id="service-${index}" name="services" value="${service}">
                    <label for="service-${index}">${service}</label>
                </div>
            `).join("");
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            company: formData.get('company'),
            email: formData.get('email'),
            contactNumber: formData.get('contactNumber'),
            services: formData.getAll('services'),
            message: formData.get('message')
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showFormMessage('Thank you for your message! We will contact you soon.', 'success');
                form.reset();
            } else {
                this.showFormMessage(result.message || 'Error sending message', 'error');
            }
        } catch (error) {
            this.showFormMessage('Network error. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showFormMessage(message, type) {
        // Create message element if it doesn't exist
        let messageDiv = document.getElementById('form-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'form-message';
            messageDiv.className = 'form-message';
            document.querySelector('form').appendChild(messageDiv);
        }
        
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new GoldenEyeApp();
});