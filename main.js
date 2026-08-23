// Compte à rebours du hero — cible lue depuis data-target sur #countdown
document.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const target = new Date(countdownEl.dataset.target);

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minEl = document.getElementById("cd-min");
  const secEl = document.getElementById("cd-sec");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = new Date();
    const diff = Math.max(0, target - now);

    if (diff === 0) {
      clearInterval(interval);
      countdownEl.classList.add("ended");
      countdownEl.innerHTML =
        '<p class="hero-ended-msg">Le Festival Sapé &amp; Lumière a commencé — bienvenue !</p>';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minEl.textContent = pad(minutes);
    secEl.textContent = pad(seconds);
  }

  tick();
  const interval = setInterval(tick, 1000);
});

// Navbar

const menuBtn = document.getElementById("menu-burger");
const navBar = document.querySelector(".navbar");

// Icônes FontAwesome (codes HTML)
const iconBurger = '<i class="fa-solid fa-bars"></i>';
const iconClose = '<i class="fa-solid fa-xmark"></i>';

const closeMenu = () => {
  navBar.classList.remove("show");
  document.body.classList.remove("nav-open");
  menuBtn.innerHTML = `<span>${iconBurger}</span>`;
};

menuBtn.addEventListener("click", (e) => {
  // Empêche l'événement de se propager au document (évite la fermeture immédiate)
  e.stopPropagation();
  const isOpen = navBar.classList.toggle("show");
  document.body.classList.toggle("nav-open", isOpen);

  menuBtn.innerHTML = `<span>${isOpen ? iconClose : iconBurger}</span>`;
});

// 2. Fermer si on clique ailleurs dans la page
document.addEventListener("click", (e) => {
  // Si la navbar est ouverte ET que le clic n'est ni sur la navbar ni sur le bouton
  if (
    navBar.classList.contains("show") &&
    !navBar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    closeMenu();
  }
});

// 3. Optionnel : Fermer le menu si on clique sur un lien de navigation
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// Programme
// Cette fonction consiste a afficher l'onglet inactif au clic tout en cachant le precedent ouvert

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".day-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // 1. Suppression de la classe 'active' partout
    tabs.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    // 2. Ajout de la classe active sur le bouton du click
    tab.classList.add("active");
    // 3. Affichage du contenu de l'onglet
    const targetId = document.getElementById("day-" + tab.dataset.day);
    targetId.classList.add("active");
  });
});

// FAQ

const faqQuestions = document.querySelectorAll(".question-item");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    // 1. on cheque si l'element cllicke est ouvert
    const isActive = question.classList.contains("active");
    // 2. on ferme tous les autres elements
    faqQuestions.forEach((item) => {
      item.classList.remove("active");
      // On cherche la reponse sur l'element click pour la fermer
      const answer = item.querySelector(".answer");
      if (answer) answer.classList.remove("active");
      const arrow = item.querySelector(".arrow");
      if (arrow) arrow.textContent = "+";
    });
    if (!isActive) {
      question.classList.add("active");
      const answer = question.querySelector(".answer");
      if (answer) answer.classList.add("active");
      const arrow = question.querySelector(".arrow");
      if (arrow) arrow.textContent = "−";
    }
  });
});

// Contact — validation du formulaire
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const fields = {
    firstname: {
      el: document.getElementById("firstname"),
      validate: (v) => v.trim().length >= 2,
      message: "Prénom trop court (2 caractères min.)",
    },
    lastname: {
      el: document.getElementById("lastname"),
      validate: (v) => v.trim().length >= 2,
      message: "Nom trop court (2 caractères min.)",
    },
    email: {
      el: document.getElementById("email"),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: "Adresse e-mail invalide",
    },
    message: {
      el: document.getElementById("message"),
      validate: (v) => v.trim().length >= 10,
      message: "Message trop court (10 caractères min.)",
    },
  };

  // ajoute un emplacement d'erreur sous chaque champ concerné (une seule fois)
  Object.values(fields).forEach(({ el }) => {
    const group = el.closest(".form-group");
    if (group && !group.querySelector(".field-error")) {
      const span = document.createElement("span");
      span.className = "field-error";
      group.appendChild(span);
    }
  });

  function showError(field, message) {
    const group = field.el.closest(".form-group");
    group.classList.add("has-error");
    group.querySelector(".field-error").textContent = message;
  }

  function clearError(field) {
    const group = field.el.closest(".form-group");
    group.classList.remove("has-error");
    group.querySelector(".field-error").textContent = "";
  }

  // validation au fil de la saisie, une fois que le champ a déjà été quitté
  Object.values(fields).forEach((field) => {
    field.el.addEventListener("blur", () => {
      if (field.el.value.trim() === "") return; // le 1er essai vide est géré au submit
      field.validate(field.el.value)
        ? clearError(field)
        : showError(field, field.message);
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    Object.values(fields).forEach((field) => {
      const value = field.el.value;
      const valid = field.validate(value);

      if (!valid) {
        isValid = false;
        showError(
          field,
          value.trim() === "" ? "Ce champ est requis" : field.message,
        );
        if (!firstInvalidField) firstInvalidField = field.el;
      } else {
        clearError(field);
      }
    });

    if (!isValid) {
      firstInvalidField.focus();
      return;
    }

    // Formulaire valide — pas de backend sur ce projet, on simule l'envoi
    const existingFeedback = contactForm.querySelector(".form-success");
    if (existingFeedback) existingFeedback.remove();

    const feedback = document.createElement("p");
    feedback.className = "form-success";
    feedback.textContent =
      "Merci, votre message a bien été envoyé — nous revenons vers vous rapidement.";
    contactForm.appendChild(feedback);

    contactForm.reset();
    Object.values(fields).forEach(clearError);

    setTimeout(() => feedback.remove(), 5000);
  });
}

// Billetterie — liens WhatsApp pré-remplis selon le pass choisi
const WHATSAPP_NUMBER = "242050714271"; // à remplacer par le numéro officiel du festival

document.querySelectorAll(".price-card").forEach((card) => {
  const passName = card.dataset.pass;
  const btn = card.querySelector(".btn-whatsapp");
  if (!passName || !btn) return;

  const message = `Bonjour, je souhaite réserver un Pass ${passName} pour le Festival Sapé & Lumière.`;
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  btn.target = "_blank";
  btn.rel = "noopener";
});

// Lineup
const filterButtons = document.querySelectorAll(".filter-btn");
const lineupItems = document.querySelectorAll(".lineup-item");
const lineupGrid = document.getElementById("lineup-grid");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Gérer la classe active sur les boutons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // 2. Récupérer le nom de la catégorie cliquée
    const targetCategory = button.getAttribute("data-cat");

    // 3. La mosaïque 2-2 (spans CSS) n'a de sens que sur "Tous" : elle est
    // conçue pour exactement ces 4 artistes. Sur un filtre, on la désactive.
    lineupGrid.classList.toggle("mosaic", targetCategory === "all");

    // 4. Filtrer les artistes et repérer ceux qui restent visibles
    const visibleItems = [];
    lineupItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-cat");
      const show = targetCategory === "all" || targetCategory === itemCategory;

      item.style.display = show ? "block" : "none";
      item.classList.remove("solo");
      if (show) visibleItems.push(item);
    });

    // 5. S'il ne reste que 1 ou 2 artistes après filtrage, chacun prend toute
    // la largeur de la grille — sinon il reste un trou pour une 3e image
    // qui n'existe pas dans cette catégorie.
    if (targetCategory !== "all" && visibleItems.length < 3) {
      visibleItems.forEach((item) => item.classList.add("solo"));
    }
  });
});
