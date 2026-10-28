/* =====================================================================
   CONFIG: edit this block only.
   - repos: GitHub repository links for each card. An empty list falls back
     to your GitHub repositories page (used for the Book Reading List card).
   - live: paste the deployed link (or leave "" to hide the button).
   - EMAIL: your public contact email ("" hides the email card).
   ===================================================================== */
const GITHUB_PROFILE = "https://github.com/AarohiPushkar";
const REPOS_PAGE = GITHUB_PROFILE + "?tab=repositories";
const EMAIL = "";

const projects = [
  {
    title: "Python Programs Collection",
    description:
      "Three beginner Python programs, each in its own repository with a README: a factorial calculator with input validation, a Fibonacci sequence generator, and a Structure-to-Dictionary program that stores student data in a dictionary and prints it with f-strings.",
    tech: ["Python", "Dictionaries", "Loops", "f-strings", "README"],
    repos: [
      { label: "Factorial Repo", url: "https://github.com/AarohiPushkar/Python_Basic_25BCON0213" },
      { label: "Fibonacci Repo", url: "https://github.com/AarohiPushkar/Fibonacci-25BCON0213" },
      { label: "Struct-Dict Repo", url: "https://github.com/AarohiPushkar/Struct-dict-25BCON0213" }
    ],
    live: ""
  },
  {
    title: "Messy Python Code Improvement",
    description:
      "A deliberately messy Python script (messy_py.py) cleaned up with AI assistance: clearer names, simpler logic, consistent formatting, with a comparison table of before and after.",
    tech: ["Python", "Refactoring", "Cursor AI"],
    repos: [{ label: "GitHub Repo", url: "https://github.com/AarohiPushkar/Correcting-grade-25BCON0213" }],
    live: ""
  },
  {
    title: "Bug Fixing Using Cursor AI",
    description:
      "Student grade utilities with three planted bugs (a denominator error, a boundary comparison and a condition-order problem), found and fixed with Cursor AI using a RED, FIX, GREEN unittest workflow. All nine tests pass.",
    tech: ["Python", "Debugging", "unittest", "Cursor AI"],
    repos: [{ label: "GitHub Repo", url: "https://github.com/AarohiPushkar/Correcting-grade-25BCON0213" }],
    live: ""
  },
  {
    title: "Interactive Quiz Application",
    description:
      "A browser quiz built in Lecture 10. It shows one question at a time, checks each answer, keeps score and shows the final result.",
    tech: ["HTML", "CSS", "JavaScript", "Quiz"],
    repos: [{ label: "GitHub Repo", url: "https://github.com/AarohiPushkar/Quiz--25BCON0213" }],
    live: ""
  },
  {
    title: "Book Reading List Application",
    description:
      "A reading list web app from Lecture 11 where you add books and track what you want to read. The README includes the deployed link.",
    tech: ["HTML", "CSS", "JavaScript", "Book", "Vercel"],
    repos: [],
    live: ""
  }
];

/* ===================== Helpers ===================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ===================== Theme toggle ===================== */
const root = document.documentElement;
const themeButton = $("#themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeButton.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  themeButton.setAttribute("aria-label", themeButton.textContent);
  try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
}
let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) { /* ignore */ }
applyTheme(savedTheme);
themeButton.addEventListener("click", function () {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* ===================== Mobile nav ===================== */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
navToggle.addEventListener("click", function () {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* ===================== Profile photo fallback ===================== */
const photo = $("#profilePhoto");
function showInitials() { $(".avatar-ring").classList.add("no-photo"); }
photo.addEventListener("error", showInitials);
if (photo.complete && photo.naturalWidth === 0) showInitials();

/* ===================== Links from config ===================== */
$("#githubHero").href = GITHUB_PROFILE;
$("#contactGithub").href = GITHUB_PROFILE;
if (EMAIL) {
  const emailCard = $("#contactEmail");
  emailCard.href = "mailto:" + EMAIL;
  $("#contactEmailText").textContent = EMAIL;
  emailCard.hidden = false;
}
$("#year").textContent = new Date().getFullYear();

/* ===================== Typing effect ===================== */
const phrases = ["C / C++ Programmer", "Python Developer", "HTML & CSS Builder", "Always Learning"];
const typedEl = $("#typedText");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const word = phrases[phraseIndex];
  typedEl.textContent = word.slice(0, charIndex);
  let delay = deleting ? 45 : 90;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
  charIndex += deleting ? -1 : 1;
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ===================== Project cards, search and filter ===================== */
const grid = $("#projectGrid");
const searchInput = $("#projectSearch");
const chipBox = $("#filterChips");
const noResults = $("#noResults");
const resultCount = $("#resultCount");
let activeTech = "All";

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function buildCards() {
  projects.forEach(function (p, i) {
    const card = makeEl("article", "card");
    card.dataset.index = String(i);
    card.appendChild(makeEl("span", "card-num", "0" + (i + 1)));
    card.appendChild(makeEl("h3", "", p.title));
    card.appendChild(makeEl("p", "", p.description));

    const tags = makeEl("div", "tags");
    p.tech.forEach(function (t) { tags.appendChild(makeEl("span", "tag", t)); });
    card.appendChild(tags);

    const links = makeEl("div", "card-links");
    const repoList = p.repos && p.repos.length ? p.repos : [{ label: "GitHub Repo", url: REPOS_PAGE }];
    repoList.forEach(function (r) {
      const a = makeEl("a", "btn btn-ghost", r.label);
      a.href = r.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.appendChild(a);
    });
    if (p.live) {
      const live = makeEl("a", "btn btn-primary", "Live App");
      live.href = p.live;
      live.target = "_blank";
      live.rel = "noopener noreferrer";
      links.appendChild(live);
    }
    card.appendChild(links);

    // 3D tilt and spotlight following the mouse
    card.addEventListener("mousemove", function (e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      card.style.transform = "rotateX(" + (0.5 - y) * 8 + "deg) rotateY(" + (x - 0.5) * 10 + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function () { card.style.transform = ""; });

    grid.appendChild(card);
  });
}

function buildChips() {
  const all = ["All"];
  projects.forEach(function (p) {
    p.tech.forEach(function (t) { if (all.indexOf(t) === -1) all.push(t); });
  });
  all.forEach(function (t) {
    const chip = makeEl("button", "chip" + (t === "All" ? " active" : ""), t);
    chip.type = "button";
    chip.addEventListener("click", function () {
      activeTech = t;
      $$(".chip").forEach(function (c) { c.classList.toggle("active", c === chip); });
      filterProjects();
    });
    chipBox.appendChild(chip);
  });
}

function filterProjects() {
  const term = searchInput.value.trim().toLowerCase();
  let shown = 0;
  $$(".card").forEach(function (card) {
    const p = projects[Number(card.dataset.index)];
    const haystack = (p.title + " " + p.description + " " + p.tech.join(" ")).toLowerCase();
    const matchesText = term === "" || haystack.indexOf(term) !== -1;
    const matchesTech = activeTech === "All" || p.tech.indexOf(activeTech) !== -1;
    const visible = matchesText && matchesTech;
    card.hidden = !visible;
    card.style.display = visible ? "" : "none";
    if (visible) {
      shown++;
      card.style.animation = "none";
      void card.offsetWidth; // restart the pop animation
      card.style.animation = "";
    }
  });
  noResults.hidden = shown !== 0;
  resultCount.textContent = "Showing " + shown + " of " + projects.length + " projects";
}

buildCards();
buildChips();
searchInput.addEventListener("input", filterProjects);
filterProjects();

/* ===================== Scroll effects ===================== */
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    const fill = entry.target.querySelector(".bar i");
    if (fill) fill.style.width = entry.target.dataset.level + "%";
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(function (el) { observer.observe(el); });

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(target * t);
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

const progress = $("#scrollProgress");
const sections = $$("main section[id]");
window.addEventListener("scroll", function () {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  let current = "home";
  sections.forEach(function (s) { if (window.scrollY + 140 >= s.offsetTop) current = s.id; });
  $$(".nav-links a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
}, { passive: true });

/* ===================== Cursor glow ===================== */
const glow = $("#cursorGlow");
window.addEventListener("mousemove", function (e) {
  glow.style.opacity = "1";
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
}, { passive: true });

/* ===================== Animated particle background ===================== */
(function particles() {
  const canvas = $("#bgCanvas");
  const ctx = canvas.getContext("2d");
  if (!ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let w, h, dots = [];
  const mouse = { x: -999, y: -999 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 17000));
    dots = [];
    for (let i = 0; i < count; i++) {
      dots.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
    }
  }
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  resize();

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const light = root.getAttribute("data-theme") === "light";
    const rgb = light ? "30,111,217" : "120,180,255";
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      const mdx = d.x - mouse.x, mdy = d.y - mouse.y;
      if (mdx * mdx + mdy * mdy < 14000) { d.x += mdx * 0.02; d.y += mdy * 0.02; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + rgb + ",0.8)";
      ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const dx = d.x - dots[j].x, dy = d.y - dots[j].y;
        const dist = dx * dx + dy * dy;
        if (dist < 16000) {
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.22 * (1 - dist / 16000)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ===================== AI chatbot (calls /api/chat) ===================== */
const chatLog = $("#chatLog");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");
const chatSend = $("#chatSend");
const chatHistory = []; // {role: "user" | "model", text}

function addMessage(text, kind) {
  const div = makeEl("div", "msg " + kind, text); // textContent only, so no HTML injection
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
  return div;
}

async function sendQuestion(question) {
  addMessage(question, "user");
  chatSend.disabled = true;
  const typing = makeEl("div", "msg bot typing");
  typing.append(makeEl("i"), makeEl("i"), makeEl("i"));
  chatLog.appendChild(typing);
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, history: chatHistory.slice(-8) })
    });
    let data = {};
    try { data = await response.json(); } catch (e) { /* non-JSON error body */ }
    if (!response.ok || !data.reply) {
      throw new Error(data.error || "The chatbot service returned status " + response.status + ".");
    }
    typing.remove();
    addMessage(data.reply, "bot");
    chatHistory.push({ role: "user", text: question }, { role: "model", text: data.reply });
  } catch (err) {
    typing.remove();
    addMessage("Sorry, I couldn't get an answer right now. " + err.message + " Please try again in a moment.", "error");
  } finally {
    chatSend.disabled = false;
    chatInput.focus();
  }
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const q = chatInput.value.trim();
  if (!q) return;
  chatInput.value = "";
  sendQuestion(q);
});
$$("#suggestions button").forEach(function (b) {
  b.addEventListener("click", function () { sendQuestion(b.textContent); });
});
