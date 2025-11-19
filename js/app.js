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
        // Define global functions FIRST - before DOM is ready
        window.toggleMobileMenu = function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            const nav = document.querySelector('.nav-links');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const body = document.body;
            
            if (!nav || !toggle) {
                console.warn('Menu elements not found');
                return;
            }
            
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            } else {
                toggle.classList.add('active');
                nav.classList.add('active');
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
            }
        };
        
        window.closeMobileMenu = function() {
            const nav = document.querySelector('.nav-links');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const body = document.body;
            
            if (nav) nav.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
            if (body) {
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        };
        
        // Wait for DOM
        const initMenu = () => {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (!menuToggle || !navLinks) {
                setTimeout(initMenu, 100);
                return;
            }
            
            // Force button to be clickable
            menuToggle.style.cssText = 'pointer-events: auto !important; cursor: pointer !important; z-index: 9999 !important; position: relative !important;';
            menuToggle.setAttribute('tabindex', '0');
            menuToggle.setAttribute('role', 'button');
            
            // Add onclick if not already there
            if (!menuToggle.getAttribute('onclick')) {
                menuToggle.setAttribute('onclick', 'window.toggleMobileMenu(event); return false;');
            }
            
            // Also add event listeners as backup
            menuToggle.addEventListener('click', window.toggleMobileMenu);
            menuToggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                window.toggleMobileMenu(e);
            });
            
            // Make all links clickable and add close handlers
            navLinks.querySelectorAll('a').forEach(link => {
                link.style.cssText = 'pointer-events: auto !important; cursor: pointer !important; z-index: 1002 !important; position: relative !important;';
                
                // Add onclick to close menu
                const originalOnclick = link.getAttribute('onclick') || '';
                link.setAttribute('onclick', originalOnclick + 'window.closeMobileMenu();');
                
                // Also add event listener
                link.addEventListener('click', function() {
                    setTimeout(window.closeMobileMenu, 100);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                const nav = document.querySelector('.nav-links');
                const toggle = document.querySelector('.mobile-menu-toggle');
                
                if (!nav || !nav.classList.contains('active')) return;
                
                // Don't close if clicking on a link
                if (e.target.closest('a') && nav.contains(e.target.closest('a'))) {
                    return;
                }
                
                // Close if clicking outside menu
                if (!nav.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
                    window.closeMobileMenu();
                }
            });

            // Close on escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const nav = document.querySelector('.nav-links');
                    if (nav && nav.classList.contains('active')) {
                        window.closeMobileMenu();
                    }
                }
            });
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMenu);
        } else {
            initMenu();
        }
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