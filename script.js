/* ========================================
   Sadaf Rahimi Portfolio — Premium Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PAGE LOADER ============
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.querySelector('.page-loader');
            if (loader) loader.classList.add('hidden');
            document.body.classList.remove('loading');
            triggerHeroAnimation();
        }, 400);
    });

    // ============ CUSTOM CURSOR ============
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .skill-card, .contact-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });

    // ============ HERO ANIMATION ============
    function triggerHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero .reveal-text');
        heroElements.forEach(el => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => el.classList.add('visible'), delay);
        });
    }

    // ============ NAVIGATION ============
    const nav = document.getElementById('nav');
    const navPills = document.querySelectorAll('.nav-pill');
    const sections = document.querySelectorAll('.section');

    // Scroll-based nav styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active nav pill on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom > 150) {
                current = section.id;
            }
        });

        if (current) {
            navPills.forEach(pill => {
                pill.classList.remove('active');
                if (pill.dataset.section === current) {
                    pill.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============ MOBILE HAMBURGER MENU ============
    const hamburger = document.getElementById('nav-hamburger');
    const navInner = document.getElementById('nav-inner');

    if (hamburger && navInner) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navInner.classList.toggle('open');
            nav.classList.toggle('mobile-expanded');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navInner.classList.contains('open')) {
                hamburger.classList.remove('active');
                navInner.classList.remove('open');
                nav.classList.remove('mobile-expanded');
            }
        });
    }

    // Smooth scroll for nav pills
    navPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = pill.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu after clicking a pill
            if (hamburger && navInner) {
                hamburger.classList.remove('active');
                navInner.classList.remove('open');
                nav.classList.remove('mobile-expanded');
            }
        });
    });

    // ============ SCROLL REVEAL ANIMATIONS ============
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    const el = entry.target;
                    // If it's a polaroid, grab its actual computed transform from the stylesheet before adding .visible
                    if (el.classList.contains('polaroid')) {
                        const style = window.getComputedStyle(el);
                        // Save the transform inline so it overrides the standard .reveal-up.visible transform
                        el.style.transform = style.transform;
                    }
                    el.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-line, .section-title, .contact-title');
    revealElements.forEach(el => {
        if (!el.closest('.hero')) {
            revealObserver.observe(el);
        }
    });

    // ============ STAT COUNTER ANIMATION ============
    const statNumbers = document.querySelectorAll('.stat-number');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));

    function animateCounter(el, target) {
        const duration = 1500;
        const start = performance.now();

        function step() {
            const elapsed = performance.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(eased * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    // ============ PARALLAX ON HERO ============
    const heroImg = document.querySelector('.hero-img');

    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.3;
            heroImg.style.transform = `scale(1.03) translateY(${offset}px)`;
        }
    });

    // Mouse parallax on hero sparkles
    const heroSparkles = document.querySelectorAll('.hero-sparkle');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        heroSparkles.forEach((sparkle, i) => {
            const factor = (i + 1) * 12;
            sparkle.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // ============ TILT EFFECT ON SKILL CARDS ============
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;

            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;

            // Move glow effect to follow mouse
            const glow = card.querySelector('.skill-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(212, 114, 138, 0.12) 0%, transparent 50%)`;
                glow.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const glow = card.querySelector('.skill-glow');
            if (glow) glow.style.opacity = '0';
        });
    });

    // ============ MAGNETIC HOVER ON PORTFOLIO CARDS ============
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            const rotateX = y * -4;
            const rotateY = x * 4;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============ VIDEO AUTOPLAY HANDLING ============
    const videos = document.querySelectorAll('video.reel-media');

    // IntersectionObserver to play/pause videos when in view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    // Autoplay blocked — mute and retry
                    video.muted = true;
                    video.play().catch(() => { });
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    videos.forEach(video => {
        videoObserver.observe(video);

        // Force play on load
        video.addEventListener('loadeddata', () => {
            video.play().catch(() => {
                video.muted = true;
                video.play().catch(() => { });
            });
        });
    });

    // ============ SMOOTH SCROLL INDICATOR HIDE ============
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });

});
