// =====================================================
// KRAMATRIX COMPANY PROFILE - INTERACTIVE JAVASCRIPT
// Massimo Vignelli-inspired interactions
// =====================================================

// ===================== THREE.JS PARTICLE SYSTEM (SLIDE 1 ONLY) =====================
let particleScene, particleCamera, particleRenderer, particleSystem;
let particles = [];
let mousePosition = { x: 0, y: 0 };
let isMouseDown = false;

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    // Setup Three.js
    particleScene = new THREE.Scene();
    particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    particleCamera.position.z = 5;

    particleRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    particleRenderer.setSize(window.innerWidth, window.innerHeight);
    particleRenderer.setClearColor(0x000000, 0);

    // Create Particles
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles = velocities;

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMat = new THREE.PointsMaterial({
        color: 0xFF4D00,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });
    
    particleSystem = new THREE.Points(particlesGeo, particlesMat);
    particleScene.add(particleSystem);

    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    canvas.addEventListener('mousedown', () => { isMouseDown = true; });
    canvas.addEventListener('mouseup', () => { isMouseDown = false; });

    // Start animation
    animateParticles();
}

function animateParticles() {
    requestAnimationFrame(animateParticles);

    if (!particleSystem) return;

    const positions = particleSystem.geometry.attributes.position.array;
    const handX = mousePosition.x * 5;
    const handY = mousePosition.y * 5;

    for (let i = 0; i < particles.length; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const dx = handX - positions[ix];
        const dy = handY - positions[iy];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (isMouseDown && distance < 2) {
            // Attraction - pull particles towards mouse
            particles[i].x += dx * 0.01;
            particles[i].y += dy * 0.01;
        } else if (!isMouseDown && distance < 1.5) {
            // Repulsion - push particles away from mouse
            particles[i].x -= dx * 0.02;
            particles[i].y -= dy * 0.02;
        }

        // Apply velocity
        positions[ix] += particles[i].x;
        positions[iy] += particles[i].y;
        positions[iz] += particles[i].z;

        // Friction
        particles[i].x *= 0.95;
        particles[i].y *= 0.95;
        particles[i].z *= 0.95;

        // Boundaries
        if (Math.abs(positions[ix]) > 5) particles[i].x *= -0.5;
        if (Math.abs(positions[iy]) > 5) particles[i].y *= -0.5;
        if (Math.abs(positions[iz]) > 3) particles[i].z *= -0.5;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleRenderer.render(particleScene, particleCamera);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (particleCamera && particleRenderer) {
        particleCamera.aspect = window.innerWidth / window.innerHeight;
        particleCamera.updateProjectionMatrix();
        particleRenderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize particles when page loads
window.addEventListener('load', () => {
    initParticles();
});

// ===================== CUSTOM CURSOR =====================
const cursorDot = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let circleX = 0;
let circleY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Check if cursor elements exist before accessing
    if (!cursorDot || !cursorCircle) {
        requestAnimationFrame(animateCursor);
        return;
    }
    
    // Dot follows mouse immediately
    dotX += (mouseX - dotX) * 0.9;
    dotY += (mouseY - dotY) * 0.9;
    
    // Circle follows with delay
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    cursorCircle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
}

// Only start cursor animation if elements exist
if (cursorDot && cursorCircle) {
    animateCursor();
}

// Cursor interactions on hover
if (cursorCircle) {
    document.querySelectorAll('button, a, .service-card, .stat-box, .value-card, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorCircle) {
                cursorCircle.style.width = '60px';
                cursorCircle.style.height = '60px';
                cursorCircle.style.transform = `translate(${circleX - 30}px, ${circleY - 30}px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursorCircle) {
                cursorCircle.style.width = '40px';
                cursorCircle.style.height = '40px';
                cursorCircle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px)`;
            }
        });
    });
}

// ===================== SLIDE NAVIGATION =====================
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentSlide = 0;
const totalSlides = slides.length;

// Update total slides display
if (totalSlidesEl) {
    totalSlidesEl.textContent = totalSlides.toString().padStart(2, '0');
}

// Update current slide indicator
function updateSlideIndicator() {
    if (!currentSlideEl || !slides || slides.length === 0) return;
    
    currentSlideEl.textContent = (currentSlide + 1).toString().padStart(2, '0');
    
    // Update controls color based on slide mode
    const activeSlide = slides[currentSlide];
    const controls = document.querySelector('.controls');
    
    if (activeSlide && controls) {
        if (activeSlide.classList.contains('dark-mode')) {
            controls.style.color = '#FFFFFF';
        } else {
            controls.style.color = '#000000';
        }
    }
}

// Navigate to specific slide
function goToSlide(index) {
    if (!slides || slides.length === 0) return;
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        updateSlideIndicator();
        // Trigger animations for the new slide
        setTimeout(() => animateSlideContent(currentSlide), 300);
    }
}

// Next slide
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
}

// Previous slide
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
    }
});

// Track scroll position and update current slide
let isScrolling;
if (slidesContainer) {
    slidesContainer.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            if (!slidesContainer) return;
            const scrollPosition = slidesContainer.scrollTop;
            const slideHeight = window.innerHeight;
            const newSlideIndex = Math.round(scrollPosition / slideHeight);
            
            if (newSlideIndex !== currentSlide && newSlideIndex >= 0 && newSlideIndex < totalSlides) {
                currentSlide = newSlideIndex;
                updateSlideIndicator();
            }
        }, 100);
    });
}

// ===================== GSAP ANIMATIONS =====================
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate slide content when navigating
function animateSlideContent(slideIndex) {
    const slide = slides[slideIndex];
    if (!slide) return;
    
    // Animate stats numbers
    const statNumbers = slide.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (!stat.dataset.animated) {
            stat.dataset.animated = 'true';
            animateNumber(stat);
        }
    });
    
    // Add visible class to trigger CSS animations
    const content = slide.querySelector('.content');
    if (content && !content.classList.contains('animated')) {
        content.classList.add('animated');
    }
}

// Call animation on initial load
animateSlideContent(0);

// ===================== NUMBER ANIMATION =====================
function animateNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, stepDuration);
}

// ===================== HERO TEXT ANIMATION =====================
const giantText = document.querySelector('.giant-text');
if (giantText) {
    gsap.from(giantText, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
    });
}

const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    gsap.from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
    });
}

// ===================== FLOATING SHAPES ANIMATION =====================
const shapes = document.querySelectorAll('.shape');
shapes.forEach(shape => {
    gsap.to(shape, {
        y: -30,
        rotation: 5,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});

// ===================== PARALLAX EFFECT =====================
slidesContainer.addEventListener('scroll', () => {
    const scrolled = slidesContainer.scrollTop;
    
    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-circle') ? 0.3 : 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================== SMOOTH SCROLL BEHAVIOR =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================== BUTTON HOVER EFFECTS =====================
const buttons = document.querySelectorAll('.nav-btn, .contact-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===================== INTERSECTION OBSERVER FOR ANIMATIONS =====================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .stat-box, .timeline-item, .value-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// ===================== INITIAL SETUP =====================
// Update initial slide indicator
if (currentSlideEl && slides && slides.length > 0) {
    updateSlideIndicator();
}

// Disable default cursor on desktop
if (window.innerWidth > 768) {
    document.body.style.cursor = 'none';
    document.querySelectorAll('button, a').forEach(el => {
        el.style.cursor = 'none';
    });
}

// ===================== RESPONSIVE CURSOR =====================
// Show default cursor on mobile/tablet
function checkViewport() {
    if (window.innerWidth <= 768) {
        document.body.style.cursor = 'default';
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorCircle) cursorCircle.style.display = 'none';
    } else {
        document.body.style.cursor = 'none';
        if (cursorDot) cursorDot.style.display = 'block';
        if (cursorCircle) cursorCircle.style.display = 'block';
    }
}

checkViewport();
window.addEventListener('resize', checkViewport);

// ===================== CONSOLE BRANDING =====================
console.log('%c🎨 KRAMATRIX', 'font-size: 48px; font-weight: bold; color: #FF4D00;');
console.log('%cEmpowering Businesses with Innovative Digital Solutions', 'font-size: 16px; color: #333;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FF4D00;');
console.log('%cDesigned with Massimo Vignelli principles', 'font-style: italic; color: #666;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FF4D00;');
console.log('%cwww.kramatrix.com | info@kramatrix.com', 'color: #333;');

// ===================== PERFORMANCE MONITORING =====================
window.addEventListener('load', () => {
    console.log('%c✓ Company Profile Loaded Successfully', 'color: #00C851; font-weight: bold;');
    
    // Log performance metrics
    if (performance && performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`%c⚡ Load Time: ${loadTime}ms`, 'color: #FF4D00;');
    }
});
