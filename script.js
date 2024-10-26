// script.js

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out-cubic'
});

// Smooth scroll for navigation with offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        const headerOffset = window.innerWidth <= 768 ? 70 : 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Smooth scroll for buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (name && email && message) {
        // Example success message
        alert(`Thank you, ${name}! Your message has been sent. We will get back to you soon.`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields before submitting.');
    }
});

// Newsletter form submission handling
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Newsletter subscription logic here
    alert('You have successfully subscribed to our newsletter!');
    newsletterForm.reset();
});

// Image slider functionality
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

prevButton.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextButton.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Reset interval when manually changing slides
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize the first slide
slides[0].classList.add('active');

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Modify the scroll event listener to only affect hero section
document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for hero section only
    const heroElements = document.querySelectorAll('.hero');
    heroElements.forEach(element => {
        const speed = 0.8;
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking nav links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Float Menu Functionality
const floatMenuWrapper = document.querySelector('.float-menu-wrapper');
const progressBar = document.querySelector('.progress-bar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    // Calculate scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    // Show/hide float menu based on scroll direction and position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 300) { // Show after 300px scroll
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            floatMenuWrapper.classList.remove('visible');
        } else {
            // Scrolling up
            floatMenuWrapper.classList.add('visible');
        }
    } else {
        // At the top
        floatMenuWrapper.classList.remove('visible');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Smooth scroll for float menu links
document.querySelectorAll('.float-nav a, .float-cta').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Add after your existing code

// Sign In/Sign Up Form
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
}

// Form submission handling
const forms = document.querySelectorAll('.contact form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
});

// Google Sign-In
function handleCredentialResponse(response) {
    // Handle Google Sign-In response
    console.log("Google Sign-In Response:", response);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large", width: "100%" }
    );
    
    google.accounts.id.renderButton(
        document.getElementById("g_id_signup"),
        { theme: "outline", size: "large", width: "100%" }
    );
};

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const showMessageBtn = document.getElementById('showMessage');
    const showContactBtn = document.getElementById('showContact');
    const contactContainer = document.getElementById('contact-container');

    if (showMessageBtn && showContactBtn && contactContainer) {
        showMessageBtn.addEventListener('click', () => {
            contactContainer.classList.add('right-panel-active');
        });

        showContactBtn.addEventListener('click', () => {
            contactContainer.classList.remove('right-panel-active');
        });
    }
});

// --- Contact Form Interactivity ---

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            try {
                // Simulate form submission delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });

        // Add floating label behavior
        const formInputs = contactForm.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            // Check if input has value on load
            if (input.value) {
                input.classList.add('has-value');
            }

            // Check if input has value on change
            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }
});
