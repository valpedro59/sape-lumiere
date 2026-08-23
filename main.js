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

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minEl.textContent = pad(minutes);
    secEl.textContent = pad(seconds);

    if (diff === 0) {
      clearInterval(interval);
      countdownEl.querySelector(".hero-note").textContent =
        "Le festival a commencé !";
    }
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
  menuBtn.innerHTML = `<span>${iconBurger}</span>`;
};

menuBtn.addEventListener("click", (e) => {
  // Empêche l'événement de se propager au document (évite la fermeture immédiate)
  e.stopPropagation();
  const isOpen = navBar.classList.toggle("show");

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
    });
    if (!isActive) {
      question.classList.add("active");
      const answer = question.querySelector(".answer");
      if (answer) answer.classList.add("active");
    }
  });
});

// Lineup
const filterButtons = document.querySelectorAll(".filter-btn");
const lineupItems = document.querySelectorAll(".lineup-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Gérer la classe active sur les boutons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // 2. Récupérer le nom de la catégorie cliquée
    const targetCategory = button.getAttribute("data-cat");

    // 3. Filtrer les artistes
    lineupItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-cat");

      // Si le bouton cliqué est "all" OU si la catégorie de l'artiste correspond
      if (targetCategory === "all" || targetCategory === itemCategory) {
        item.style.display = "block"; // Affiche l'artiste
      } else {
        item.style.display = "none"; // Masque l'artiste
      }
    });
  });
});
