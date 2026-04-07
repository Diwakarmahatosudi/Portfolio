/* ============================================
   DIWAKAR MAHATO SUDI — PORTFOLIO JS
   Premium Interactive Portfolio with Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── PAGE LOADER ───
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(revealHeroElements, 300);
        }, 1500);
    });

    // Fallback: hide loader after 3s
    setTimeout(() => {
        if (loader && !loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            setTimeout(revealHeroElements, 300);
        }
    }, 3000);

    // ─── HERO TEXT REVEAL ───
    function revealHeroElements() {
        const reveals = document.querySelectorAll('.reveal-text');
        reveals.forEach((el) => {
            const delay = parseFloat(el.dataset.delay || 0) * 1000;
            setTimeout(() => {
                el.classList.add('revealed');
            }, delay);
        });
    }

    // ─── STICKY HEADER (ALWAYS VISIBLE — NEVER HIDES) ───
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ─── SCROLL PROGRESS BAR ───
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ─── SCROLL-DRIVEN CODE RUNNER ───
    const codeRunner = document.getElementById('codeRunner');
    if (codeRunner) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            if (scrollTop > 300) {
                codeRunner.classList.add('active');
            } else {
                codeRunner.classList.remove('active');
            }
            
            const viewportHeight = window.innerHeight;
            const runnerY = 80 + (scrollPercent * (viewportHeight - 160));
            codeRunner.style.top = runnerY + 'px';
            
            // Add slight rotation based on scroll speed for "racing" feel
            const rotation = Math.sin(scrollPercent * Math.PI * 4) * 5;
            codeRunner.style.transform = `rotate(${rotation}deg)`;
        });
    }

    // ─── SCROLL TO TOP BUTTON ───
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }

    // ─── ACTIVE NAV LINK ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        const offset = 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - offset) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ─── EXPERIENCE TABS ───
    const tabList = document.getElementById('tabList');
    if (tabList) {
        const tabButtons = tabList.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabList.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-button');
            if (!clickedTab) return;

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.setAttribute('hidden', true);
                panel.classList.remove('active');
            });

            clickedTab.classList.add('active');
            clickedTab.setAttribute('aria-selected', 'true');

            const targetPanel = document.getElementById(clickedTab.getAttribute('aria-controls'));
            if (targetPanel) {
                targetPanel.removeAttribute('hidden');
                targetPanel.classList.add('active');
            }
        });
    }

    // ─── MOBILE NAVIGATION ───
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ─── TYPED.JS ───
    if (document.getElementById('typed-tagline') && typeof Typed !== 'undefined') {
        new Typed('#typed-tagline', {
            strings: [
                'Software Developer.',
                'Web Designer.',
                'AWS Certified Professional.',
                'AI Enthusiast.',
                'Full-Stack Developer.',
                'Problem Solver.'
            ],
            typeSpeed: 45,
            backSpeed: 25,
            backDelay: 2000,
            loop: true,
            smartBackspace: true,
        });
    }

    // ─── SCROLL REVEAL (Intersection Observer) ───
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 80);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // ─── 3D TILT EFFECT ON PROJECT CARDS ───
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -8;
                const rotateY = (x - centerX) / centerX * 8;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(() => { card.style.transition = ''; }, 500);
            });
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // ─── MAGNETIC BUTTON EFFECT ───
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });
            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }

    // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const top = target.offsetTop - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── TEXT SCRAMBLE EFFECT ON HOVER (Nav Links) ───
    const scrambleLinks = document.querySelectorAll('.nav-link[data-text]');
    scrambleLinks.forEach(link => {
        const originalText = link.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let interval;

        link.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                link.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                if (iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 2;
            }, 30);
        });

        link.addEventListener('mouseleave', () => {
            clearInterval(interval);
            link.textContent = originalText;
        });
    });

    // ─── PARALLAX EFFECT ON GRADIENT ORBS ───
    const orbs = document.querySelectorAll('.orb');
    if (window.matchMedia('(pointer: fine)').matches && orbs.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 20;
                orb.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
            });
        });
    }

    // ─── SKILL ITEMS STAGGER ANIMATION ───
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const items = entry.target.parentElement.querySelectorAll('.skill-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) translateX(0)';
                    }, i * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillItems.length > 0) {
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        skillObserver.observe(skillItems[0]);
    }

    // ─── SIDE ELEMENTS REVEAL ───
    const sideLinks = document.getElementById('sideLinks');
    if (sideLinks) {
        sideLinks.style.opacity = '0';
        sideLinks.style.transform = 'translateY(20px)';
        sideLinks.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            sideLinks.style.opacity = '1';
            sideLinks.style.transform = 'translateY(0)';
        }, 2500);
    }

    const sideEmail = document.querySelector('.side-email');
    if (sideEmail) {
        sideEmail.style.opacity = '0';
        sideEmail.style.transform = 'translateY(20px)';
        sideEmail.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            sideEmail.style.opacity = '1';
            sideEmail.style.transform = 'translateY(0)';
        }, 2700);
    }

    // ─── PARTICLES.JS (STAR BACKGROUND) ───
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 120,
                    density: { enable: true, value_area: 900 }
                },
                color: { value: ['#64ffda', '#7c4dff', '#ffffff', '#a8b2d1'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 2.5,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 130,
                    color: '#64ffda',
                    opacity: 0.12,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 180, line_opacity: 0.4 },
                    push: { particles_nb: 4 },
                    repulse: { distance: 100, duration: 0.4 }
                }
            },
            retina_detect: true
        });
    }

    // ─── MATRIX CODE RAIN ───
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');
        
        function resizeMatrix() {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
        resizeMatrix();
        window.addEventListener('resize', resizeMatrix);

        const chars = '01アイウエオカキクケコ</>{}[];=+-.#import class function const let var return';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.fillStyle = '#64ffda';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);
    }

    // ─── FLOATING CODE SNIPPETS (Parallax on scroll) ───
    function createFloatingCode() {
        const snippets = [
            'const dev = "Diwakar";',
            'function build() { }',
            'import React from "react";',
            '<div className="portfolio">',
            'git push origin main',
            'npm start',
            '// TODO: be awesome',
            'async function deploy()',
            'class Developer {',
            'return success;',
            'console.log("Hello!");',
            'docker build -t app .',
            'aws s3 sync . s3://bucket',
            'SELECT * FROM projects',
        ];
        
        const container = document.createElement('div');
        container.className = 'floating-code-container';
        container.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;';
        document.body.appendChild(container);

        snippets.forEach((snippet, i) => {
            const el = document.createElement('span');
            el.className = 'floating-code-snippet';
            el.textContent = snippet;
            el.style.cssText = `
                position: absolute;
                font-family: var(--font-mono, 'JetBrains Mono', monospace);
                font-size: ${10 + Math.random() * 4}px;
                color: rgba(100, 255, 218, ${0.03 + Math.random() * 0.04});
                white-space: nowrap;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: rotate(${-10 + Math.random() * 20}deg);
                user-select: none;
            `;
            container.appendChild(el);
        });

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const codeElements = container.querySelectorAll('.floating-code-snippet');
            codeElements.forEach((el, i) => {
                const speed = 0.02 + (i * 0.008);
                el.style.transform = `translateY(${-scrollY * speed}px) rotate(${-5 + Math.sin(scrollY * 0.001 + i) * 5}deg)`;
            });
        });
    }
    createFloatingCode();

    // ─── SECTION GLOW EFFECT ON SCROLL ───
    const allSections = document.querySelectorAll('section');
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--glow-opacity', '1');
            } else {
                entry.target.style.setProperty('--glow-opacity', '0');
            }
        });
    }, { threshold: 0.3 });

    allSections.forEach(section => {
        section.style.position = 'relative';
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 60%; height: 60%;
            background: radial-gradient(circle, rgba(100, 255, 218, 0.03), transparent 70%);
            pointer-events: none;
            opacity: var(--glow-opacity, 0);
            transition: opacity 1s ease;
            z-index: -1;
        `;
        section.appendChild(glow);
        glowObserver.observe(section);
    });

    // ─── CERT CARD SHIMMER ON HOVER ───
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(100, 255, 218, 0.06), rgba(15, 15, 26, 0.8) 60%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ─── PROJECT IMAGE RIPPLE EFFECT ───
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position: absolute;
                width: 0; height: 0;
                border-radius: 50%;
                background: rgba(100, 255, 218, 0.3);
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                transform: translate(-50%, -50%);
                animation: ripple-expand 0.6s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ─── COUNTER ANIMATION FOR STATS ───
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.textContent = target + '+';
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // ─── GLITCH TEXT ANIMATION ON HERO NAME ───
    const heroName = document.querySelector('.hero-name');
    if (heroName && window.matchMedia('(pointer: fine)').matches) {
        heroName.addEventListener('mouseenter', () => {
            heroName.classList.add('glitch-active');
            setTimeout(() => heroName.classList.remove('glitch-active'), 500);
        });
    }

    // ─── PARALLAX SCROLL FOR FEATURED PROJECTS ───
    const featuredProjects = document.querySelectorAll('.featured-project');
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            featuredProjects.forEach(project => {
                const rect = project.getBoundingClientRect();
                const scrollPercent = rect.top / window.innerHeight;
                const img = project.querySelector('.project-image');
                if (img && scrollPercent < 1 && scrollPercent > -1) {
                    img.style.transform = `translateY(${scrollPercent * 20}px)`;
                }
            });
        });
    }

    // Add ripple keyframes
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        @keyframes ripple-expand {
            to { width: 300px; height: 300px; opacity: 0; }
        }
        .glitch-active {
            animation: glitch-text 0.5s ease;
        }
        @keyframes glitch-text {
            0%, 100% { text-shadow: none; }
            10% { text-shadow: -3px 0 #64ffda, 3px 0 #7c4dff; }
            20% { text-shadow: 3px 0 #64ffda, -3px 0 #7c4dff; }
            30% { text-shadow: -2px 0 #ff5f56, 2px 0 #64ffda; }
            40% { text-shadow: 2px 0 #7c4dff, -2px 0 #ff5f56; }
            50% { text-shadow: -1px 0 #64ffda, 1px 0 #7c4dff; transform: skew(-0.5deg); }
            60% { text-shadow: 1px 0 #ff5f56, -1px 0 #64ffda; transform: skew(0.5deg); }
            70% { text-shadow: none; transform: skew(0); }
        }
    `;
    document.head.appendChild(extraStyles);

    // ─── TORCH TOGGLE — DARK/LIGHT MODE ───
    const torchToggle = document.getElementById('torchToggle');
    
    // Create flash overlay element
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'theme-flash';
    document.body.appendChild(flashOverlay);

    // Check saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    if (torchToggle) {
        torchToggle.addEventListener('click', (e) => {
            // Get button position for flash origin
            const rect = torchToggle.getBoundingClientRect();
            const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            
            // Set flash position
            flashOverlay.style.setProperty('--flash-x', x + '%');
            flashOverlay.style.setProperty('--flash-y', y + '%');
            
            // Trigger flash
            flashOverlay.classList.add('active');
            setTimeout(() => flashOverlay.classList.remove('active'), 600);
            
            // Toggle theme
            document.body.classList.toggle('light-mode');
            
            // Save preference
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        });
    }

    // ─── PARALLAX MOUSE TILT ON PROJECT IMAGES ───
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const tiltX = y * 15;
            const tiltY = -x * 15;
            img.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ─── GLOBAL SCROLL POPUPS (EVERYTHING POPS UP) ───
    const globalPopupElements = document.querySelectorAll(`
        .section-heading, .about-text p, .skill-item, .about-image,
        .tab-panel, .cert-card, .contact-inner > *
    `);
    
    const globalPopupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                globalPopupObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    
    globalPopupElements.forEach(el => {
        // Only add if it doesn't already have data-scroll (which handles its own stagger)
        if (!el.hasAttribute('data-scroll')) {
            el.classList.add('global-popup');
            globalPopupObserver.observe(el);
        }
    });

    // ─── APPLE-STYLE SPRING PHYSICS PROJECT CARD STAGGER REVEAL ───
    const springContainers = document.querySelectorAll('.project-grid, .featured-projects');
    
    const springObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all project cards inside this entering container
                const children = entry.target.querySelectorAll('.project-card, .featured-project');
                children.forEach((child, index) => {
                    // StaggerChildren feature: 0.1s pop up delay per card
                    setTimeout(() => {
                        child.classList.add('spring-visible');
                    }, index * 100);
                });
                springObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    springContainers.forEach(container => {
        springObserver.observe(container);
    });

    // ─── MAGNETIC BUTTON EFFECT (ENHANCED) ───
    document.querySelectorAll('.magnetic-btn, .torch-toggle').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ─── TEXT REVEAL — CLEAN WORD-BASED ANIMATION ───
    const heroTitle = document.querySelector('.hero-name');
    if (heroTitle) {
        // Split by WORDS not characters to preserve layout
        const originalHTML = heroTitle.innerHTML;
        const nameText = heroTitle.childNodes[0].textContent.trim(); // "Diwakar Mahato Sudi"
        const dotSpan = heroTitle.querySelector('.name-dot');
        
        heroTitle.innerHTML = '';
        nameText.split(' ').forEach((word, i) => {
            const wrapper = document.createElement('span');
            wrapper.style.cssText = `
                display: inline-block;
                overflow: hidden;
                vertical-align: top;
                margin-right: 0.25em;
            `;
            const inner = document.createElement('span');
            inner.textContent = word;
            inner.style.cssText = `
                display: inline-block;
                animation: word-slide-up 0.8s ${0.8 + i * 0.15}s both cubic-bezier(0.16, 1, 0.3, 1);
            `;
            wrapper.appendChild(inner);
            heroTitle.appendChild(wrapper);
        });
        if (dotSpan) {
            const dotClone = dotSpan.cloneNode(true);
            dotClone.style.cssText = `
                display: inline-block;
                animation: word-slide-up 0.8s ${0.8 + 3 * 0.15}s both cubic-bezier(0.16, 1, 0.3, 1);
            `;
            heroTitle.appendChild(dotClone);
        }

        const wordRevealStyle = document.createElement('style');
        wordRevealStyle.textContent = `
            @keyframes word-slide-up {
                from { transform: translateY(110%); }
                to { transform: translateY(0); }
            }
        `;
        document.head.appendChild(wordRevealStyle);
    }

    // ─── APPLE-STYLE HERO PARALLAX — SHRINK + FADE ON SCROLL ───
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            const progress = Math.min(scrollY / heroHeight, 1);

            // Apple-style: hero content shrinks and fades as you scroll
            const scale = 1 - progress * 0.15;
            const opacity = 1 - progress * 1.2;
            const blur = progress * 5;
            heroContent.style.transform = `scale(${scale}) translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = Math.max(opacity, 0);
            heroContent.style.filter = `blur(${blur}px)`;
        }, { passive: true });
    }

    // ─── APPLE-STYLE SECTION SCALE REVEALS ───
    const appleSections = document.querySelectorAll('.about-section, .projects-section, .certifications-section, .contact-section');
    
    const appleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('apple-visible');
                appleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
    
    appleSections.forEach(section => {
        section.classList.add('apple-section');
        appleObserver.observe(section);
    });

    // Inject Apple animation styles
    const appleStyles = document.createElement('style');
    appleStyles.textContent = `
        .apple-section {
            opacity: 0;
            transform: translateY(80px) scale(0.96);
            transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .apple-section.apple-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    `;
    document.head.appendChild(appleStyles);

    // ─── SMOOTH PARALLAX DEPTH ON SCROLL ───
    const floatingSnippets = document.querySelectorAll('.floating-code');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        floatingSnippets.forEach((el, i) => {
            const speed = 0.02 + (i * 0.015);
            el.style.transform = `translateY(${scrollY * speed}px) rotate(${-15 + i * 10 + scrollY * 0.01}deg)`;
        });
    }, { passive: true });


    // ─── ENHANCED SCROLL REVEAL WITH STAGGER ───
    // Override the default scroll observer with staggered delays
    const staggerElements = document.querySelectorAll('[data-scroll]');
    const staggerObserver = new IntersectionObserver((entries) => {
        // Sort entries by their top position for correct stagger order
        const visibleEntries = entries.filter(e => e.isIntersecting);
        visibleEntries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, index * 120);
            staggerObserver.unobserve(entry.target);
        });
    }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    staggerElements.forEach(el => {
        el.classList.remove('is-visible');
        staggerObserver.observe(el);
    });

});
