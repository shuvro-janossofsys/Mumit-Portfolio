// Gallery Data
const galleryData = [
    {
        id: 'fight-2025',
        title: "WBC MUAY THAI Tournament",
        date: "2025, Colombo",
        image: "assets/images/wbc-muay-thai.jpg",
        shortDesc: "Represented Bangladesh in international tournament",
        fullStory: `
            <h3>International Debut</h3>
            <p>My first international competition representing Bangladesh in Muay Thai at the WBC tournament in Colombo was a defining moment in my career.</p>
            <p>Facing opponents from across Asia, I had to adapt quickly to different fighting styles and techniques.</p>
            <h3>Key Moments</h3>
            <ul>
                <li>Round 1: Studied opponent's patterns</li>
                <li>Round 2: Adjusted my stance for better defense</li>
                <li>Round 3: Executed perfect counter-attacks</li>
            </ul>
        `,
        stats: {
            "Opponents": "",
            "Wins": "",
            "Knockouts": ""
        }
    },
    {
        id: 'double-horse-2025',
        title: "Double Horse Knockouts",
        date: "2025, Dhaka",
        image: "assets/images/double-horse-knockouts.jpg",
        shortDesc: "Fastest knockout of the night",
        fullStory: `
            <h3>Quick Victory</h3>
            <p>The Double Horse Knockouts event was where I showcased my fastest knockout to date, ending the match in the first round.</p>
            <p>My training in counter-punching paid off as I capitalized on my opponent's opening within seconds.</p>
        `,
        stats: {
            "Round": "",
            "Duration": "",
            "Strikes": ""
        }
    },
    {
        id: 'federation-cup-2023',
        title: "Got Sponsored by Federation Cup",
        date: "2023, Dhaka",
        image: "assets/images/federation-cup-kung-fu.jpg",
        shortDesc: "Gold medal in Sanda Kick-boxing",
        fullStory: `
            <h3>National Championship</h3>
            <p>The Federation Cup Kung Fu Championship at Shaheed Suhrawardi Indoor Stadium was my breakthrough performance in Sanda Kick-boxing.</p>
            <p>My southpaw stance gave me an advantage against traditional fighters, allowing me to secure the gold medal.</p>
        `,
        stats: {
            "Matches": "",
            "Wins": "",
            "Gold": ""
        }
    },
    {
        id: 'savate-2022',
        title: "National Savate Championship",
        date: "2022, Dhaka",
        image: "assets/images/national-savate-championship.jpg",
        shortDesc: "Became national Kick-boxing Champion",
        fullStory: `
            <h3>National Title</h3>
            <p>The Bangabandhu National Savate Championship was where I claimed my first national title in Kick-boxing.</p>
            <p>The training camp leading to this event focused on perfecting my footwork and combinations.</p>
            <h3>Final Match</h3>
            <p>The championship match went the distance, with my superior conditioning giving me the edge in the later rounds.</p>
        `,
        stats: {
            "Rounds": "",
            "Duration": "",
            "Gold": ""
        }
    },
    {
        id: 'MMA-Coach-2024',
        title: "Kickboxing & Boxing Coach at Legacy MMA Gym",
        date: "2024, Dhanmondi",
        image: "assets/images/legacy-mma-gym-coach.jpg",
        shortDesc: "Coaching at Legacy MMA Gym",
        fullStory: `
            <h3>National Title</h3>
            <p>The Bangabandhu National Savate Championship was where I claimed my first national title in Kick-boxing.</p>
            <p>The training camp leading to this event focused on perfecting my footwork and combinations.</p>
            <h3>Final Match</h3>
            <p>The championship match went the distance, with my superior conditioning giving me the edge in the later rounds.</p>
        `,
        stats: {
            "Rounds": "",
            "Duration": "",
            "Gold": ""
        }
    }
    
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const storyModal = document.getElementById('storyModal');
const modalBody = document.querySelector('.modal-body');
const closeModalBtn = document.querySelector('.close-modal');

// Initialize Gallery with Mobile Support
function initGallery() {
    if (!galleryGrid) return;

    // Create gallery items
    galleryGrid.innerHTML = galleryData.map(item => `
        <div class="gallery-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${item.title}</h3>
                <p>${item.shortDesc}</p>
                <button class="view-story">View Story</button>
            </div>
        </div>
    `).join('');

    // Set up event listeners based on device type
    const isMobile = window.innerWidth <= 768;
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Handle both click and touch events
        item.addEventListener('click', handleGalleryItemClick);
        item.addEventListener('touchend', handleGalleryItemTouch, {passive: false});
    });

    // Only enable lightbox on desktop
    if (!isMobile) {
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                lightbox(this);
            });
        });
    }
}

// Event Handlers
function handleGalleryItemClick(e) {
    if (window.innerWidth > 768) { // Desktop behavior
        e.preventDefault();
        const storyId = this.dataset.id;
        showStoryModal(storyId);
    }
}

function handleGalleryItemTouch(e) {
    if (window.innerWidth <= 768) { // Mobile behavior
        e.preventDefault();
        const storyId = this.dataset.id;
        showStoryModal(storyId);
    }
}

// Modal Functions
function showStoryModal(storyId) {
    const story = galleryData.find(item => item.id === storyId);
    if (!story) return;

    modalBody.innerHTML = `
        <div class="story-header">
            <h2>${story.title}</h2>
            <p class="story-date">${story.date}</p>
        </div>
        <div class="story-content">
            <img src="${story.image}" alt="${story.title}" ${window.innerWidth > 768 ? 'onclick="lightbox(this)"' : ''}>
            <div class="story-text">${story.fullStory}</div>
            ${story.stats ? `
            <div class="story-stats">
                <h4>Statistics:</h4>
                ${Object.entries(story.stats).map(([key, value]) => `
                    <div class="stat-item">
                        <span class="stat-value">${value}</span>
                        <span class="stat-label">${key}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    `;

    storyModal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Add swipe to close on mobile
    if (window.innerWidth <= 768) {
        setupSwipeToClose(storyModal);
    }
}

function closeModal() {
    storyModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Lightbox Function
function lightbox(imgElement) {
    const imgSrc = imgElement.src;
    const imgAlt = imgElement.alt;
    
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imgSrc}" alt="${imgAlt}">
        </div>
    `;
    
    document.body.appendChild(lightboxOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    lightboxOverlay.querySelector('.close-lightbox').addEventListener('click', () => {
        document.body.removeChild(lightboxOverlay);
        document.body.style.overflow = 'auto';
    });
    
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            document.body.removeChild(lightboxOverlay);
            document.body.style.overflow = 'auto';
        }
    });

    // Swipe to close on mobile
    if (window.innerWidth <= 768) {
        setupSwipeToClose(lightboxOverlay);
    }
}

// Mobile Swipe Function
function setupSwipeToClose(element) {
    let touchStartX = 0;
    
    element.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, {passive: true});

    element.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (Math.abs(touchEndX - touchStartX) > 50) {
            if (element === storyModal) {
                closeModal();
            } else {
                document.body.removeChild(element);
                document.body.style.overflow = 'auto';
            }
        }
    }, {passive: true});
}

// Event Listeners
closeModalBtn?.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === storyModal) {
        closeModal();
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    
    // Reinitialize on resize (for device orientation changes)
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 || window.innerWidth > 768) {
            initGallery();
        }
    });
});

// ========== PRELOADER ==========
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
        preloader.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }, 500);
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a')?.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// ========== STICKY NAVIGATION ==========
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 100) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]')?.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks?.classList.remove('active');
            menuToggle?.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMATED COUNTERS ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize counters when section is in view
const recordSection = document.querySelector('.record-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (recordSection) {
    observer.observe(recordSection);
}

// ========== VIDEO BACKGROUND FALLBACK ==========
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
    heroVideo.play().catch(error => {
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.innerHTML = '<img src="assets/images/hero-fallback.jpg" alt="Muntaha Boxing">';
        }
    });
}

// Video Background Adjustment
function adjustVideoBackground() {
  const video = document.querySelector('#hero-video');
  if (!video) return;

  const videoRatio = video.videoWidth / video.videoHeight;
  const containerRatio = window.innerWidth / window.innerHeight;

  if (window.innerWidth <= 768) {
    if (containerRatio > videoRatio) {
      // Wider container than video (landscape video on portrait screen)
      video.style.width = 'auto';
      video.style.height = '100%';
      video.style.left = '50%';
      video.style.transform = 'translateX(-50%)';
    } else {
      // Taller container than video (portrait video on landscape screen)
      video.style.width = '100%';
      video.style.height = 'auto';
      video.style.top = '50%';
      video.style.transform = 'translateY(-50%)';
    }
  } else {
    // Reset for desktop
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.left = '0';
    video.style.top = '0';
    video.style.transform = 'none';
  }
}

// Initialize on load and resize
window.addEventListener('load', function() {
  const video = document.querySelector('#hero-video');
  if (video) {
    video.addEventListener('loadedmetadata', adjustVideoBackground);
    window.addEventListener('resize', adjustVideoBackground);
  }
});

// ========== CONTACT FORM ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('Message sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormMessage('Failed to send message. Please try again later.', 'error');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ========== INITIALIZE ANIMATIONS ==========
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        offset: 120
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});