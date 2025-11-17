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
        // Remove any existing backdrop
        const existingBackdrop = document.querySelector('.mobile-menu-backdrop');
        if (existingBackdrop) {
            existingBackdrop.remove();
        }
        
        // On mobile, navigation is always visible - no menu toggle needed
        // Just ensure links are clickable
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            // Remove any active classes that might interfere
            navLinks.classList.remove('active');
            
            // Ensure all links are clickable
            navLinks.querySelectorAll('a').forEach(link => {
                link.style.pointerEvents = 'auto';
                link.style.cursor = 'pointer';
                link.style.userSelect = 'none';
                link.style.webkitUserSelect = 'none';
                
                // Remove any event listeners that might block
                link.onclick = null;
            });
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