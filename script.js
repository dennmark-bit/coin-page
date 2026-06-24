// Culture Coin — light interactivity

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll — gracefully degrades. Honors prefers-reduced-motion.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealStyle = document.createElement("style");
revealStyle.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(revealStyle);

const revealTargets = document.querySelectorAll(
  ".section__title, .tier, .how-card, .earn-item, .redeem-block, .partner-logo"
);

if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition =
      "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    io.observe(el);
  });

  // Safety net: if anything is still hidden after 2s (e.g. anchor scroll bypassed the observer), force it visible.
  setTimeout(() => {
    revealTargets.forEach((el) => {
      if (getComputedStyle(el).opacity === "0") {
        el.classList.add("is-visible");
      }
    });
  }, 2000);
}
