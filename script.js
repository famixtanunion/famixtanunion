/* =============================================
   FAMIXTAN UNION — script.js
   ============================================= */

/* ---- NAV SCROLL EFFECT ---- */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ---- GALLERY: EMPTY-STATE DETECTION + LIGHTBOX ---- */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCap   = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  const img = item.querySelector('.gallery-img');
  if (!img) return;

  const markEmpty = () => item.classList.add('is-empty');
  const markFilled = () => item.classList.remove('is-empty');

  // No URL pasted in yet -> show the "paste a URL here" placeholder state
  if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
    markEmpty();
  }

  // If a pasted URL is broken/unreachable, fall back to the placeholder too
  img.addEventListener('error', markEmpty);
  img.addEventListener('load', () => {
    if (img.naturalWidth > 0) markFilled();
  });

  // Open the lightbox on click (ignored while the card is still empty)
  item.addEventListener('click', () => {
    if (item.classList.contains('is-empty')) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCap.textContent = img.dataset.caption || img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});
