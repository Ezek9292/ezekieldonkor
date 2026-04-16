// Main JavaScript Functionality

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeJourneyTabs();
    initializeContactForm();
    initializeScrollSpy();
    initializeReadMore();
});

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Journey tabs (Experience/Education)
function initializeJourneyTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.timeline-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tab}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';

        // Simulate form submission (replace with actual endpoint)
        try {
            await simulateSubmission(data);
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.classList.add('success');
            form.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        } catch (error) {
            formStatus.textContent = '✗ Failed to send message. Please try again.';
            formStatus.classList.add('error');
        }
    });
}

function simulateSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1500);
    });
}

// Scroll spy for active navigation links
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-70px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
}

// Read more toggle for project descriptions
function initializeReadMore() {
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const paragraph = link.parentElement;
            const fullText = paragraph.getAttribute('data-full');
            
            if (paragraph.classList.contains('expanded')) {
                paragraph.classList.remove('expanded');
                paragraph.innerHTML = fullText.substring(0, fullText.length - 50) + '... <span class="read-more-link">Read more</span>';
            } else {
                paragraph.classList.add('expanded');
                paragraph.innerHTML = fullText + ' <span class="read-more-link">Read less</span>';
            }
            
            // Re-attach event listener to the new link
            setTimeout(() => {
                const newLink = paragraph.querySelector('.read-more-link');
                if (newLink) {
                    newLink.addEventListener('click', arguments.callee);
                }
            }, 0);
        });
    });
}

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
