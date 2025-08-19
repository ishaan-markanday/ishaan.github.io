// main.js - Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeHero();
    initializeSkills();
    initializeExperience();
    initializeCertifications();
    initializeProjects();
    initializeContact();
    initializeScrollEffects();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Start animations after loading
        setTimeout(() => {
            startHeroAnimations();
        }, 500);
    }, 2000);
}

// Navigation
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 14, 39, 0.98)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Hero Section
function initializeHero() {
    loadPersonalData();
    initializeTerminal();
    createFloatingParticles();
}

function loadPersonalData() {
    // Update hero content with data
    const heroImage = document.getElementById('heroImage');
    if (heroImage && portfolioData.personal.profileImage) {
        heroImage.src = portfolioData.personal.profileImage;
        heroImage.alt = portfolioData.personal.name;
    }
    
    // Update stats
    updateStats();
}

function updateStats() {
    const projectsCount = document.getElementById('projectsCount');
    const certsCount = document.getElementById('certsCount');
    
    if (projectsCount) {
        animateCounter(projectsCount, portfolioData.projects.length);
    }
    
    if (certsCount) {
        animateCounter(certsCount, portfolioData.certifications.length);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

function initializeTerminal() {
    const terminalCommand = document.getElementById('terminalCommand');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!terminalCommand || !terminalOutput || !terminalCommands) return;
    
    let currentCommandIndex = 0;
    
    function typeCommand() {
        const command = terminalCommands[currentCommandIndex];
        if (!command) return;
        
        // Clear previous content
        terminalCommand.textContent = '';
        terminalOutput.textContent = '';
        
        // Type command
        let i = 0;
        const commandInterval = setInterval(() => {
            terminalCommand.textContent += command.command[i];
            i++;
            
            if (i >= command.command.length) {
                clearInterval(commandInterval);
                
                // Show output after a delay
                setTimeout(() => {
                    terminalOutput.textContent = command.output;
                    
                    // Move to next command after delay
                    setTimeout(() => {
                        currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
                        typeCommand();
                    }, 3000);
                }, 1000);
            }
        }, 100);
    }
    
    // Start terminal animation
    setTimeout(typeCommand, 1000);
}

function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 210, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
}

// Skills Section
function initializeSkills() {
    loadSkillsData();
    setupSkillsFilter();
}

function loadSkillsData() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;
    
    // Load technical skills by default
    displaySkills('technical');
}

function displaySkills(category) {
    const skillsGrid = document.getElementById('skillsGrid');
    const skills = portfolioData.skills[category] || [];
    
    skillsGrid.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.style.animationDelay = `${index * 0.1}s`;
        
        skillElement.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="${skill.icon || 'fas fa-code'}"></i>
                </div>
                <div class="skill-name">${skill.name}</div>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        skillsGrid.appendChild(skillElement);
        
        // Animate progress bar
        setTimeout(() => {
            const progressBar = skillElement.querySelector('.skill-progress-bar');
            progressBar.style.width = `${skill.level || 75}%`;
        }, index * 100 + 500);
    });
}

function setupSkillsFilter() {
    const categoryButtons = document.querySelectorAll('.skill-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Display skills for selected category
            const category = this.getAttribute('data-category');
            displaySkills(category);
        });
    });
}

// Experience Section
function initializeExperience() {
    loadExperienceData();
}

function loadExperienceData() {
    const timeline = document.getElementById('experienceTimeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    // Add professional experience
    portfolioData.experience.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.2}s`;
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="experience-header">
                    <h3 class="experience-position">${exp.position}</h3>
                    <h4 class="experience-company">${exp.company}</h4>
                    <p class="experience-period">${exp.period}</p>
                </div>
                <p class="experience-description">${exp.description}</p>
                <ul class="experience-achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
    
    // Add leadership experience
    if (portfolioData.leadership) {
        portfolioData.leadership.forEach((leadership, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.animationDelay = `${(portfolioData.experience.length + index) * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="experience-header">
                        <h3 class="experience-position">${leadership.role}</h3>
                        <h4 class="experience-company">${leadership.organization}</h4>
                        <p class="experience-period">${leadership.period}</p>
                    </div>
                    <p class="experience-description">${leadership.description}</p>
                    <ul class="experience-achievements">
                        ${leadership.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
        });
    }
}

// Certifications Section
function initializeCertifications() {
    loadCertificationsData();
}

function loadCertificationsData() {
    const certificationsGrid = document.getElementById('certificationsGrid');
    if (!certificationsGrid) return;
    
    certificationsGrid.innerHTML = '';
    
    portfolioData.certifications.forEach((cert, index) => {
        const certElement = document.createElement('div');
        certElement.className = 'certification-card';
        certElement.style.animationDelay = `${index * 0.1}s`;
        
        certElement.innerHTML = `
            <div class="cert-header">
                <div class="cert-icon" style="background-color: ${cert.color || '#00D2FF'}">
                    <i class="${cert.icon || 'fas fa-certificate'}"></i>
                </div>
                <div class="cert-info">
                    <h3>${cert.name}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                </div>
            </div>
            <p class="cert-date">${cert.date}</p>
            <span class="cert-status">${cert.status}</span>
        `;
        
        certificationsGrid.appendChild(certElement);
    });
}

// Projects Section
function initializeProjects() {
    loadProjectsData();
    setupProjectsFilter();
}

function loadProjectsData(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    let filteredProjects = portfolioData.projects;
    if (filter !== 'all') {
        filteredProjects = portfolioData.projects.filter(project => 
            project.category === filter
        );
    }
    
    filteredProjects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.setAttribute('data-category', project.category);
        projectElement.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        projectElement.innerHTML = `
            <div class="project-image">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}">` :
                    `<i class="fas fa-shield-alt"></i>`
                }
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.features ? `
                    <ul class="project-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
                <span class="project-status ${statusClass}">${project.status}</span>
            </div>
        `;
        
        projectsGrid.appendChild(projectElement);
    });
}

function setupProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            loadProjectsData(filter);
        });
    });
}

// Contact Section
function initializeContact() {
    setupContactForm();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simple form validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual submission logic)
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#27CA3F' : '#FF5F56'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    setupScrollToTop();
    setupScrollAnimations();
}

function setupScrollToTop() {
    const scrollToTop = document.getElementById('scrollToTop');
    if (!scrollToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupScrollAnimations() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-item, .certification-card, .project-card, .timeline-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

function startHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'fadeInUp 1s ease forwards';
        }, index * 200);
    });
}

// About Section Data Loading
function loadAboutData() {
    const aboutText = document.getElementById('aboutText');
    if (aboutText && portfolioData.personal.about) {
        aboutText.textContent = portfolioData.personal.about;
    }
}

// Initialize about data when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadAboutData();
});

// Utility function to update portfolio data dynamically
function updatePortfolioData(newData) {
    // Merge new data with existing data
    Object.assign(portfolioData, newData);
    
    // Reload affected sections
    if (newData.personal) loadAboutData();
    if (newData.skills) loadSkillsData();
    if (newData.experience) loadExperienceData();
    if (newData.certifications) loadCertificationsData();
    if (newData.projects) loadProjectsData();
}

// Export functions for external use
window.portfolioApp = {
    updateData: updatePortfolioData,
    reloadSection: {
        skills: loadSkillsData,
        experience: loadExperienceData,
        certifications: loadCertificationsData,
        projects: loadProjectsData
    }
};