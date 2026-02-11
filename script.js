// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('header');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero Background Slideshow
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

// Gallery Modal Functionality
const modal = document.getElementById('galleryModal');
const modalImg = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imageCounter = document.querySelector('.image-counter');

let currentImages = [];
let currentImageIndex = 0;

const viewGalleryBtns = document.querySelectorAll('.view-gallery-btn');

viewGalleryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.service-card');
        const productName = card.querySelector('h3').textContent;
        const thumbnails = card.querySelectorAll('.gallery-thumbnails img');
        
        currentImages = Array.from(thumbnails).map(img => img.src);
        currentImageIndex = 0;
        
        if (modalTitle) modalTitle.textContent = productName + ' Gallery';
        showImage(currentImageIndex);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

function showImage(index) {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[index];
        if(imageCounter) imageCounter.textContent = `Image ${index + 1} of ${currentImages.length}`;
    }
}

// Close Functionality
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Modal Overlay Close
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navigation logic - Cycles back to end if going backwards from first image
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showImage(currentImageIndex);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
// Add this at the bottom to handle the new "Close & Return" button
const mobileClose = document.getElementById('mobileCloseBtn');

if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}
function sendToWhatsApp(event) {
    event.preventDefault(); // Prevents the page from refreshing

    // 1. Get the values from the input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // 2. Your WhatsApp Number (Format: 254...)
    const myNumber = "254710802808"; 

    // 3. Format the message for WhatsApp
    const encodedMessage = encodeURIComponent(
        `*New Inquiry from Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Message:* ${message}`
    );

    // 4. Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodedMessage}`;

    // 5. Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
}