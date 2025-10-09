// Formspree Form Handling
document.getElementById('emailForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.querySelector('#emailForm .submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    formStatus.style.display = 'block';
    formStatus.textContent = 'Sending message...';
    formStatus.className = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    try {
        const formData = new FormData(this);
        
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Redirect to thank you page on success
            window.location.href = 'thank-you.html';
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Error: ' + error.message;
        formStatus.className = 'form-error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Smooth scrolling (keep existing)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const projectsSection = document.getElementById('projects');
        const projectsPosition = projectsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (projectsPosition < screenPosition) {
            projectsSection.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    };
    
    // Initial state for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load in case section is already visible
});

// Project Modals
document.addEventListener('DOMContentLoaded', function() {
    // Project data (would normally come from a database or API)
    const projects = {
        1: {
            title: "Story Website - AKLAT-TURO",
            image: "assets/img/aklat.png",
            description: "This project focuses on creating a collection of Filipino short stories designed to engage students and foster a love for reading. It serves as a thesis project for academic purposes.",
            technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            features: [
                "Interactive Story Reader",
                "Multiple Reading Modes",
                "Text Customization",
                "Story Management",
                "Activity and Learning Materials",
                "Story Details Modal",
                "Sidebar Navigation",
                "Progress Saving",
                "Visual Design",
                "Accessibility & Usability"
            ]
        },

        2: {
            title: "Portfolio Website",
            image: "assets/img/port2.jpg",
            description: "A responsive portfolio design with smooth animations and dark/light mode toggle. This project showcases my skills and projects effectively.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Bootstrap", "Font Awesome"],
            features: [
                "Modern, Responsive Design",
                "Dark/Light Mode Toggle",
                "Dynamic Hero Section",
                "Services Showcase",
                "Portfolio Gallery",
                "Smooth Scrolling Navigation",
                "Animated Elements",
                "Technical Features"
            ]
        },

        3: {
            title: "Small Gallery Template",
            image: "assets/img/simple_project.jpg",
            description: "This project is Website/web applications, Users will be able to see thier Gallery on Website, and this small project is school purposes only.",
            technologies: ["HTML", "CSS", "JavaScript"],
            features: [
                "Basic Profile Structure",
                "Navigation Menu",
                "Content Sections",
                "Music Playlist",
                "Technical Setup"
            ]
        },

        4: {
            title: "Flutter Spotify UI",
            image: "assets/img/spotify.jpg",
            description: "This project is Website/web applications, Users will be able to select tracks and our UI updates accordingly. You’ll use provider to share state throughout this application and keep track of the currently selected song.",
            technologies: ["Flutter", "Dart", "Swift", "Ruby"],
            features: [
                "Color Scheme",
                "Layout",
                "Typography",
                "Visual Hierarchy",
                "Interactive Components (Likely)",
                "Whitespace"
            ]
        },

        5: {
            title: "Online Bookings",
            image: "assets/img/online.jpg",
            description: "I developed this capstone project as a request for another group. It features an online reservation system (for events, rooms, restaurants, facilities, etc.) and uses AI to enhance customer service. We integrated this system using REST API to enable seamless data transfer with other subsystems, such as HR, Logistics, and Core.",
            technologies: ["PHP", "MySQL", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Bootstrap"],
            features: [
                "online reservation system",
                "User authentication and profiles",
                "Product search and filtering",
                "Admin dashboard",
                "Secure payment processing with Paymongo",
                "Order history and tracking",
                "AI to enhance customer service"
            ]
        },

        6: {
            title: "Front Desk",
            image: "assets/img/kiosk.jpg",
            description: "We developed a kiosk-based ordering system for both hotel and restaurant services. For the hotel, it facilitates room bookings, while for the restaurant, it handles food orders. Additionally, we implemented AI to forecast and predict weekly, monthly, and yearly income, We integrated this system using REST API to enable seamless data transfer with other subsystems, such as HR, Logistics, and Core.",
            technologies: ["PHP", "MySQL", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Bootstrap"],
            features: [
                "kiosk-based ordering for both hotel and restaurant",
                "User authentication and profiles",
                "Product search and filtering",
                "Admin dashboard for both hotel and restaurant",
                "Secure payment processing with Paymongo",
                "Order history and tracking",
                "billing and invoicing",
                "Booking management",
                "Food ordering system",
                "AI integration for income prediction"
            ]
        },
        // Add more projects here...
    };

    // Modal elements
    const projectModal = document.getElementById('projectModal');
    const demoModal = document.getElementById('demoModal');
    const closeButtons = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    // View Details buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                document.getElementById('modalProjectImage').src = project.image;
                document.getElementById('modalProjectTitle').textContent = project.title;
                document.getElementById('modalProjectDescription').textContent = project.description;
                
                const techContainer = document.getElementById('modalProjectTech');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
                
                const featuresContainer = document.getElementById('modalProjectFeatures');
                featuresContainer.innerHTML = '<h3>Key Features:</h3><ul></ul>';
                const featuresList = featuresContainer.querySelector('ul');
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                projectModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Request Demo buttons
    document.querySelectorAll('.request-demo-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                document.getElementById('demoProjectTitle').textContent = project.title;
                demoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            projectModal.style.display = 'none';
            demoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === demoModal) {
            demoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add this to your existing script.js file
    document.getElementById('demoRequestForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('demoFormStatus');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
    
        // Show loading state
        formStatus.style.display = 'block';
        formStatus.textContent = 'Sending request...';
        formStatus.className = '';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
    
        try {
            const formData = new FormData(this);
            
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        
            if (response.ok) {
            // Redirect to thank you page on success
            window.location.href = 'thank-you.html';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Error: ' + error.message;
            formStatus.className = 'form-error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // Update the request demo button click handler to set the project title
    document.querySelectorAll('.request-demo-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                document.getElementById('demoProjectTitle').textContent = project.title;
                document.getElementById('demoSubject').value = `New Demo Request for ${project.title}`;
                document.getElementById('demoProject').value = project.title;
                demoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Existing filter and animation code...
});

// Enhanced Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Smooth Scrolling with offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Project Filtering with better animations
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            const filterValue = this.getAttribute('data-filter');
            
            // Enhanced filter animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Enhanced Intersection Observer for animations
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

// Observe all project cards and skill items
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card, .skill-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced Form Validation
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                validateField(this);
            });
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const formGroup = field.parentElement;
        
        // Remove existing validation classes
        formGroup.classList.remove('valid', 'invalid');
        
        if (value === '') {
            formGroup.classList.add('invalid');
            return false;
        }
        
        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                formGroup.classList.add('invalid');
                return false;
            }
        }
        
        formGroup.classList.add('valid');
        return true;
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormValidation();
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Enhanced Cursor Effect (optional)
function createCursorFollower() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--secondary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--secondary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = (e.clientX - 20) + 'px';
        cursorFollower.style.top = (e.clientY - 20) + 'px';
    });
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.background = 'rgba(100, 255, 218, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.background = 'transparent';
        });
    });
}

