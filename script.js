document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 600, // Slightly faster animations
        easing: 'ease-in-out-cubic', // A smoother easing
        once: true,
        mirror: false
    });

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // --- Experience Tabs ---
    const tabsContainer = document.querySelector('.tabs-container');
    const tabList = document.querySelector('.tab-list');
    const tabButtons = tabList.querySelectorAll('.tab-button');
    const tabPanels = tabsContainer.querySelectorAll('.tab-panel');

    if (tabList) { // Check if tabs exist on the page
        tabList.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('button');
            if (!clickedTab) return;

            // Deactivate all
            tabButtons.forEach(button => {
                button.setAttribute('aria-selected', 'false');
                button.classList.remove('active');
            });
            tabPanels.forEach(panel => {
                panel.setAttribute('hidden', true);
                panel.classList.remove('active');
            });

            // Activate clicked tab
            clickedTab.classList.add('active');
            clickedTab.setAttribute('aria-selected', 'true');

            // Show corresponding panel
            const targetPanelId = clickedTab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);
            
            targetPanel.removeAttribute('hidden');
            targetPanel.classList.add('active');
        });
    }
    
    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = 100; // 100px offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href includes the current ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    // --- Contact Modal Functionality ---
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModalBtn');
    const closeBtn = modal ? modal.querySelector('.close-btn') : null; // Check if modal exists

    // Function to close modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent main page scrolling
        });
    }

    // Close when clicking the 'x'
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside the modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Optional: Reset form after submission (if using Formspree)
    const contactForm = modal ? modal.querySelector('.contact-form') : null;
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Wait a moment for Formspree submission, then close
            setTimeout(() => {
                contactForm.reset();
                closeModal();
            }, 500); 
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });

    // --- Typed.js (Typing Effect) ---
    if (document.getElementById('typed-tagline')) {
        new Typed('#typed-tagline', {
            strings: [
                'Computer Science Student.',
                'Software Developer.',
                'Web Developer.',
                'AI Researcher.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true,
        });
    }

    // --- Particles.js (Animated Background) ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffd369" // Use gold accent
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8892b0", // Use slate color
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Grab effect on hover
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // Push particles on click
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_opacity": 0.5
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // --- 3D TILT JAVASCRIPT HAS BEEN REMOVED ---
    // The new "lift & grow" effect is pure CSS!
    
});
