// ── Mobile Navigation Toggle ──
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('header');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ── Hero Background Slideshow ──
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

setInterval(nextSlide, 5000);

// ── Gallery Modal Setup ──
const modal = document.getElementById('galleryModal');
const modalImg = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imageCounter = document.querySelector('.image-counter');

let currentImages = [];
let currentImageIndex = 0;

// ── Show image helper ──
function showImage(index) {
    if (!currentImages.length) return;
    // Clamp with wrap-around
    currentImageIndex = (index + currentImages.length) % currentImages.length;
    if (modalImg) {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = currentImages[currentImageIndex];
            modalImg.style.transition = 'opacity 0.25s ease';
            modalImg.style.opacity = '1';
        }, 100);
    }
    if (imageCounter) {
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
}

// ── Open gallery for a card ──
function openGallery(card) {
    const productName = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Gallery';
    const thumbnails = card.querySelectorAll('.gallery-thumbnails img');
    currentImages = Array.from(thumbnails).map(img => img.src);
    currentImageIndex = 0;

    if (!currentImages.length) return;

    if (modalTitle) modalTitle.textContent = productName + ' Gallery';
    showImage(0);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ── Attach click events to all service cards ──
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        openGallery(card);
    });
});

// ── Overlay button (stop propagation not needed since card handles it) ──
const overlayBtns = document.querySelectorAll('.overlay-btn');
overlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.service-card');
        openGallery(card);
    });
});

// ── Close modal ──
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close when clicking outside modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ── Prev / Next buttons ──
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
});

// ── Keyboard navigation ──
document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'block') return;
    if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
    if (e.key === 'ArrowLeft')  showImage(currentImageIndex - 1);
    if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ── Touch Swipe Support ──
(function addSwipeSupport() {
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50;

    modal.addEventListener('touchstart', (e) => {
        const t = e.changedTouches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;

        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        // Ignore mostly vertical swipes
        if (Math.abs(dy) > Math.abs(dx)) return;

        if (dx < 0) {
            showImage(currentImageIndex + 1); // swipe left = next
        } else {
            showImage(currentImageIndex - 1); // swipe right = prev
        }
    }, { passive: true });
})();

// ── Back to Top Button ──
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// ── WhatsApp Contact Form ──
function sendToWhatsApp(event) {
    event.preventDefault();

    const name    = document.getElementById('name').value;
    const email   = document.getElementById('email').value;
    const phone   = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const myNumber = "254724217164";

    const encodedMessage = encodeURIComponent(
        `*New Inquiry from Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Message:* ${message}`
    );

    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}