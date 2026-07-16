/* ==========================================================================
   animation.js — cross-page interaction layer:
   scroll reveal, typing effect, mouse glow, magnetic buttons, theme toggle,
   mobile nav, hero field-grid backdrop.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initScrollReveal();
  initMouseGlow();
  initMagnetic();
  initTypingEffect();
  initHeroGrid();
  initActiveNavLink();
});

/* ---------------- Theme toggle (dark default, light optional) ---------------- */
function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  const saved = localStorage.getItem("cropsense-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("cropsense-theme", next);
  });
}

/* ---------------- Mobile nav ---------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("nav-open");
    links.style.cssText = open
      ? "display:flex;position:absolute;top:68px;left:0;right:0;flex-direction:column;background:var(--bg);padding:18px 28px;border-bottom:1px solid var(--line);gap:16px;"
      : "";
  });
}

/* ---------------- Scroll reveal via IntersectionObserver ---------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .chart-card");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("in", "grown"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in", "grown");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => io.observe(t));
}

/* ---------------- Mouse glow on cards ---------------- */
function initMouseGlow() {
  document.querySelectorAll(".card-glow").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
}

/* ---------------- Magnetic buttons ---------------- */
function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
  });
}

/* ---------------- Typing effect for hero tagline ---------------- */
function initTypingEffect() {
  const el = document.querySelector("[data-typing]");
  if (!el) return;
  const words = JSON.parse(el.getAttribute("data-typing"));
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) { deleting = true; setTimeout(tick, 1400); return; }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
}

/* ---------------- Hero field-grid backdrop: pixel cells shimmer like an NDVI raster ---------------- */
function initHeroGrid() {
  const host = document.querySelector(".hero-grid");
  if (!host) return;
  const cols = 26, rows = 12;
  const cellW = 100 / cols, cellH = 100 / rows;
  const colors = ["#8a5a34", "#c98a3f", "#d9b23f", "#8fbf4e", "#46a866"];
  let svg = `<svg viewBox="0 0 100 46" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">`;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const noise = Math.sin(r * 1.3 + c * 0.7) * 0.5 + 0.5;
      const colorIdx = Math.min(colors.length - 1, Math.floor(noise * colors.length));
      const delay = ((r + c) % 10) * 0.15;
      svg += `<rect x="${c * cellW}" y="${r * cellH}" width="${cellW - 0.15}" height="${cellH - 0.15}"
        fill="${colors[colorIdx]}" opacity="0.16">
        <animate attributeName="opacity" values="0.10;0.30;0.10" dur="5s" begin="${delay}s" repeatCount="indefinite" />
      </rect>`;
    }
  }
  svg += `</svg>`;
  host.innerHTML = svg;
}

/* ---------------- Highlight current page in nav ---------------- */
function initActiveNavLink() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
}
