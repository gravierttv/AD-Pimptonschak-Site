/* =========================================================
   PIMP TON SHACK — main.js
   ========================================================= */

// On ajoute cette classe tout de suite : elle sert à dire au CSS
// "le JS fonctionne, tu peux activer les animations".
// Si jamais le JS ne se charge pas, le site reste quand même
// visible et utilisable (juste sans les animations).
document.documentElement.classList.add('js-enabled');

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
}

// ===== 2. Animation au scroll (planches et cartes de service) =====
// IntersectionObserver "regarde" le viewport et nous prévient
// quand un élément qu'on lui a donné à surveiller devient visible.
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // on n'anime qu'une seule fois
    }
  });
}, { threshold: 0.2 }); // se déclenche quand 20% de l'élément est visible

revealElements.forEach((el) => observer.observe(el));

// ===== 3. Formulaire de contact =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

// ⚠️ À FAIRE : crée un compte gratuit sur https://www.emailjs.com/
// Connecte ta boîte courriel (celle de ton père), crée un "service"
// et un "template", puis remplace les 3 valeurs ci-dessous par les tiennes.
const EMAILJS_PUBLIC_KEY = "3yZDariq9h6FV8bpv";
const EMAILJS_SERVICE_ID = "service_bpxj0in";
const EMAILJS_TEMPLATE_ID = "template_mh634zm";

if (form && window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // empêche le rechargement de la page

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validation simple avant d'envoyer quoi que ce soit
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !message || !emailIsValid) {
      status.textContent = "Vérifie que tous les champs sont bien remplis (et le courriel valide).";
      status.className = "form-status error";
      return;
    }

    status.textContent = "Envoi en cours...";
    status.className = "form-status";

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { name, email, message })
      .then(() => {
        status.textContent = "Message envoyé, merci !";
        status.className = "form-status success";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Oups, l'envoi a échoué. Réessaie plus tard.";
        status.className = "form-status error";
      });
  });
}
