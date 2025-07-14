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
            image: "https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/518086123_2808091252734932_4719525419133692349_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeFsBoI0CsdeMrgfbDq_TbQyg0rMZ1XKCeODSsxnVcoJ42yKmGkhV6oSKiHjcF9V9gj9xGnVjDn_O74PQELb4_rt&_nc_ohc=BRRyDlNSTukQ7kNvwHHSMMU&_nc_oc=AdkzZQqW9XT91p5P8RNf6WDTkC3ALSEErLBCkQZjqFMd-Liti9lYVNgdUrP9RWNEoBU&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=vgIp2P9DETyxcXv_iTLsiA&oh=00_AfQ3CcvioM0fSUcm2EJ75Cc9Wh1ksUib56P8JAeUtVPUrg&oe=687A695F",
            description: "This project focuses on creating a collection of Filipino short stories designed to engage students and foster a love for reading. It serves as a thesis project for academic purposes.",
            technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            features: [
                "Interactive Story Reader",
                "Multiple Reading Modes",
                "Text Customization",
                "Story Management",
                "Text-to-Speech (TTS)",
                "Story Details Modal",
                "Sidebar Navigation",
                "Progress Saving",
                "Visual Design",
                "Accessibility & Usability"
            ]
        },

        2: {
            title: "Portfolio Website",
            image: "https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/518745659_2808108119399912_2624044521247303479_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeEWAcqpFWkkuXKPSMgy0METOnW8zhUTWVw6dbzOFRNZXKfnaYSn_c8Q5qEdrBGLQY-PNfSuFzqbIz4ZOHG0CrUE&_nc_ohc=Bp3LpBaOHLUQ7kNvwHEkGU7&_nc_oc=AdmQe1bpctbPWvOEWqzUJVxc7zz_hiGgKbRRsPpYtxLt0wsfsxUZMx_v4jKdXnb-J0g&_nc_zt=23&_nc_ht=scontent.fmnl9-2.fna&_nc_gid=dBVX8x_UShkgCeEf164POg&oh=00_AfRWUapF2es2f57PmZ0vW6lRd3357jpZfHweFZ_CoRERaA&oe=687A6667",
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
            image: "https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/518638492_2808118932732164_8581552625169110812_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeE-5PQpDYwlRLyFYA6kjbss9IJsICub27D0gmwgK5vbsPGF0syCQsXpaYlEkP4-RAdwLB-Wapr_qBlfBwPkebZH&_nc_ohc=3g-NLaQgs3cQ7kNvwFwGDV1&_nc_oc=AdnQvsufPgHSsSnrB2afBznGDlbSBpv-IfnHokRinFZQ-xnm1--B2TKLM6h4w_CGdqM&_nc_zt=23&_nc_ht=scontent.fmnl9-2.fna&_nc_gid=OumpWwp1UwhWHvVMR5D2CA&oh=00_AfRuOkZTJOwdM5YA8jkm2Ge_23pse5FlKEZblVkSAox2Hw&oe=687A3AA3",
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
            image: "https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-6/517658571_2808091672734890_1137505978138209620_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeGT3S5kBoLEqpuIkFkhl0VwE1eWtfS4Th0TV5a19LhOHeyA0RJQaPEKpZs869Flx_vXAcgLTzHu9aJfmVINshcM&_nc_ohc=fkUyIJjO3qUQ7kNvwGCKVPr&_nc_oc=AdntCsWx4uYfFK9UvX1wWTpMCiEDUdkrPbbxMzvQamMvR9POSw5grsyHgkvVFesxFO0&_nc_zt=23&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=cOE6zcCJqu_9pabTNojsig&oh=00_AfSBYuQCTOEu1-Qt3tKj-bCbAPQ-cXdf5xvOoaOWUoGeCA&oe=687A519F",
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
            image: "https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/518357750_2808069699403754_8541216769361108359_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeGRNf6HP68xawaY5wTb0J5pFn1aTcGuJI4WfVpNwa4kjoLKTGyViyIZg2v2Q4OlvT1vAdg9GFPMYZxMVBYwlFbW&_nc_ohc=bl11H4Ud4NQQ7kNvwGY3_zI&_nc_oc=AdnwT2oupspcxWAL5TyVAYXVT1dL4EtGZnv7ZsIuf7Bsz4qNvtFpWo4FzyZtSPauplQ&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=0ylkkgmMmfVObrmsjHRygQ&oh=00_AfRFMUKH81e1LCvJG3MhlK1PG3FJhTZJRByto5zeBhHXzQ&oe=687A3E1C",
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
            image: "https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-6/518150484_2808134169397307_7256050505931035019_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeFqnRY7BK5gMsKQ5OTrV9jVwPR-bQsTNyzA9H5tCxM3LHaoljSZ5wiys9vKdbDpVkoPCTLiM1JR-nVkDll3pkxp&_nc_ohc=Qp4lgw3YrJgQ7kNvwEr17eo&_nc_oc=AdkPlNyHyQe2jmwa60nd2O6Jfb-Q6_oaesSnwua7E5FdtsorAaz7utOLLp_v3IvuEbA&_nc_zt=23&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=BhCY5K9g6SMIlgPzQd3TPw&oh=00_AfTuntbCcu2vcnW0ZkCoNfvKQE3vqMA2cKE4ss14IJM1Gg&oe=687A4201",
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
