/* =========================================================
   PIMP TON SHACK — main.js (v2.0)
   ========================================================= */

// 1. Classe JS pour activer les animations CSS
document.documentElement.classList.add('js-enabled');

// 2. Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// 3. Animation au scroll (IntersectionObserver)
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el) => observer.observe(el));

// 4. Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

if (lightbox && lightboxImg) {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption || item.querySelector('figcaption')?.textContent || '';
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightbox.hidden = false;
        // Force reflow
        void lightbox.offsetWidth;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

// 5. Formulaire de contact (EmailJS)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

// ⚠️ Remplace ces 3 valeurs par les tiennes depuis emailjs.com
const EMAILJS_PUBLIC_KEY = "3yZDariq9h6FV8bpv";
const EMAILJS_SERVICE_ID = "service_bpxj0in";
const EMAILJS_TEMPLATE_ID = "template_mh634zm";

if (form && window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone ? form.phone.value.trim() : '';
    const service = form.service ? form.service.value : '';
    const message = form.message.value.trim();

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const messageWords = message
  .split(/\s+/)
  .filter(word => word.length > 0);

const wordCount = messageWords.length;

if (!name || !emailIsValid || !service || service === 'none' || wordCount < 25) {
  if (!name || !emailIsValid) {
    statusEl.textContent = "Vérifie que ton nom et ton courriel sont bien remplis.";
  } else if (!service || service === 'none') {
    statusEl.textContent = "Veuillez sélectionner un type de projet.";
  } else if (wordCount < 25) {
    statusEl.textContent = `Décris un peu plus ton projet : il faut au minimum 25 mots (actuellement ${wordCount}).`;
  }

  statusEl.className = "form-status error";

  if (!name) {
    form.querySelector('[name="name"]').focus();
  } else if (!emailIsValid) {
    form.querySelector('[name="email"]').focus();
  } else if (!service || service === 'none') {
    form.querySelector('[name="service"]').focus();
  } else {
    form.querySelector('[name="message"]').focus();
  }

  return;
}

    // Loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    if (btnText && btnSpinner) {
      btnText.hidden = true;
      btnSpinner.hidden = false;
    }
    submitBtn.disabled = true;
    statusEl.textContent = "Envoi en cours...";
    statusEl.className = "form-status";

    const templateParams = { name, email, message };
    if (phone) templateParams.phone = phone;
    if (service) templateParams.service = service;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        statusEl.textContent = "✓ Message envoyé, merci ! On te répond sous 24h.";
        statusEl.className = "form-status success";
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        statusEl.textContent = "Oups, l'envoi a échoué. Réessaie plus tard ou appelle-nous direct.";
        statusEl.className = "form-status error";
      })
      .finally(() => {
        if (btnText && btnSpinner) {
          btnText.hidden = false;
          btnSpinner.hidden = true;
        }
        submitBtn.disabled = false;
      });
  });
}

// 6. CTA sticky — masquer quand on est sur le contact
const ctaSticky = document.querySelector('.cta-sticky');
if (ctaSticky && window.location.pathname.includes('contact')) {
  ctaSticky.style.display = 'none';
}
