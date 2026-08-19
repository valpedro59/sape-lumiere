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
