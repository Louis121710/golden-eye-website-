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
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        if (!menuToggle || !navLinks) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Ensure button is clickable
        menuToggle.style.pointerEvents = 'auto';
        menuToggle.style.cursor = 'pointer';
        menuToggle.style.zIndex = '9999';
        menuToggle.setAttribute('tabindex', '0');
        menuToggle.setAttribute('role', 'button');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Toggle menu function
        const toggleMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            const isActive = navLinks.classList.contains('active');
            
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

        // Button click handler - simple and direct
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleMenu(e);
        });

        // Close menu function
        const closeMenu = () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        };
        
        // Make all links clickable and close menu on click
        navLinks.querySelectorAll('a').forEach(link => {
            // Ensure link is clickable
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
            link.style.zIndex = '1002';
            link.style.position = 'relative';
            
            // Close menu when link is clicked (don't prevent navigation)
            link.addEventListener('click', () => {
                setTimeout(closeMenu, 100);
            }, { passive: true });
        });

        // Close menu when clicking on backdrop (outside menu)
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active')) {
                // Check if click is on a link - if so, let it navigate
                if (e.target.closest('a') && navLinks.contains(e.target.closest('a'))) {
                    return; // Let the link handle navigation
                }
                
                // Check if click is outside menu and not on toggle button
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    closeMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
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