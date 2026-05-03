/* =============================================
   GOKUL K G — PORTFOLIO SCRIPT
   Features: Loader, Cursor, Scroll Animations,
   Counter, Skill Bars, Nav, Modals, Form
============================================= */

// === LOADER ===
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1200);
});

// === CUSTOM CURSOR ===
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

if (cursor && cursorTrail) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .blog-card, .skill-category');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// === DARK MODE TOGGLE ===
const themeBtn = document.getElementById('themeToggle');
const toggleIcon = document.querySelector('.toggle-icon');

// Persist preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    if (toggleIcon) toggleIcon.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// === NAV: SCROLL BEHAVIOR ===
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('nav ul a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Sticky nav
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// === MOBILE NAV ===
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener('click', closeMobileNav);

function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
}
window.closeMobileNav = closeMobileNav;

// === SCROLL ANIMATIONS (IntersectionObserver) ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

            setTimeout(() => {
                el.classList.add('visible');

                // Animate skill bars
                el.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            }, delay);

            observer.unobserve(el);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(
    '.skill-category, .project-card, .testimonial-card, .blog-card, .fade-up'
).forEach(el => observer.observe(el));

// === COUNTER ANIMATION ===
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-num');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) counterObserver.observe(statsRow);

// === PROJECT MODAL ===
window.openModal = function(title, text, tech, meta) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = text;
    document.getElementById('modalTag').textContent = tech || '';
    document.getElementById('modalMeta').textContent = '';
    document.getElementById('modalFooter').textContent = meta || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
};

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

// === BLOG MODAL ===
window.openBlogModal = function(title, body) {
    const modal = document.getElementById('blogModal');
    document.getElementById('blogModalTitle').textContent = title;
    document.getElementById('blogModalBody').textContent = body;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeBlogModal = function() {
    document.getElementById('blogModal').classList.remove('open');
    document.body.style.overflow = '';
};

document.getElementById('blogModal').addEventListener('click', (e) => {
    if (e.target.id === 'blogModal') closeBlogModal();
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeBlogModal();
        closeMobileNav();
    }
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const span = btn.querySelector('span');

        btn.classList.add('success');
        span.textContent = 'Message Sent! ✓';
        btn.disabled = true;

        setTimeout(() => {
            btn.classList.remove('success');
            span.textContent = 'Send Message';
            btn.disabled = false;
            contactForm.reset();
        }, 3500);
    });
}

// === SMOOTH SCROLL for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
