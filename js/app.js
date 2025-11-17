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
        
        const toggleMenu = () => {
            const isActive = navLinks.classList.contains('active');
            console.log('Toggle menu - current state:', isActive);
            
            if (isActive) {
                // Close menu
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
                if (backdrop) {
                    backdrop.style.opacity = '0';
                    backdrop.style.visibility = 'hidden';
                }
                console.log('Menu closed');
            } else {
                // Open menu
                menuToggle.classList.add('active');
                navLinks.classList.add('active');
                body.style.overflow = 'hidden';
                if (backdrop) {
                    backdrop.style.opacity = '1';
                    backdrop.style.visibility = 'visible';
                }
                console.log('Menu opened');
            }
        };
        
        // Create backdrop first
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 48, 96, 0.6); z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; pointer-events: none;';
        document.body.appendChild(backdrop);
        
        // Enable pointer events when visible
        const updateBackdrop = () => {
            if (navLinks.classList.contains('active')) {
                backdrop.style.opacity = '1';
                backdrop.style.visibility = 'visible';
                backdrop.style.pointerEvents = 'auto';
            } else {
                backdrop.style.opacity = '0';
                backdrop.style.visibility = 'hidden';
                backdrop.style.pointerEvents = 'none';
            }
        };

        // Toggle menu on button click - use multiple event types
        const handleToggle = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log('Menu toggle triggered');
            toggleMenu();
        };

        menuToggle.addEventListener('click', handleToggle);
        menuToggle.addEventListener('touchend', handleToggle);
        
        // Also try mousedown for better mobile support
        menuToggle.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                setTimeout(() => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }, 100);
            });
        });

        backdrop.addEventListener('click', () => {
            console.log('Backdrop clicked - closing menu');
            toggleMenu();
        });

        // Watch for menu state changes
        const observer = new MutationObserver(updateBackdrop);
        observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
        
        // Initial backdrop state
        updateBackdrop();

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu();
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