/* =========================================================
   LOADER SEQUENCE  (home page only)
========================================================= */
const loader       = document.getElementById('loader');
const loaderFill    = document.getElementById('loaderFill');
const loaderPercent = document.getElementById('loaderPercent');
const loaderLines   = document.getElementById('loaderLines');

if (loader && loaderLines) {
  const bootLines = [
    'booting portfolio_engine.js',
    'loading assets ... ok',
    'compiling components ... ok',
    'connecting to creativity.sh',
    'ready.'
  ];

  bootLines.forEach((line, i) => {
    const span = document.createElement('span');
    span.style.animationDelay = `${i * 0.25}s`;
    span.innerHTML = i === bootLines.length - 1
      ? `<span class="ok">></span> ${line}`
      : `<span class="ok">$</span> ${line}`;
    loaderLines.appendChild(span);
  });

  document.body.style.overflow = 'hidden';

  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startTyping();
        revealOnLoad();
      }, 350);
    }
    loaderFill.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';
  }, 140);
}

/* =========================================================
   NAVBAR: scroll state + mobile toggle + active link
========================================================= */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
function updateActiveLink(){
  let current = 'home';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* =========================================================
   TYPING ROLE EFFECT  (home page only)
========================================================= */
const typedEl = document.getElementById('typedRole');
const roles   = ['Frontend Developer', 'Data Analyst', 'UI Engineer', 'Problem Solver', 'Creative Coder'];
let roleIndex = 0, charIndex = 0, deleting = false;

function startTyping(){ typeStep(); }

function typeStep(){
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      return setTimeout(typeStep, 1400);
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeStep, deleting ? 40 : 80);
}

/* =========================================================
   CURSOR GLOW (hero area only)
========================================================= */
const cursorGlow  = document.getElementById('cursorGlow');
const heroSection = document.querySelector('.hero');

if (cursorGlow && heroSection) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX - 190}px, ${e.clientY - 190}px)`;
    const withinHero = e.clientY < heroSection.getBoundingClientRect().bottom;
    cursorGlow.style.opacity = withinHero ? '1' : '0';
  });
}

/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function revealOnLoad(){
  revealEls.forEach(el => revealObserver.observe(el));
}

/* If we're on the home page but the loader isn't present, reveal immediately */
if (!loader) revealOnLoad();

/* =========================================================
   COUNT-UP STATS + SKILL BARS
========================================================= */
const countEls = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target; return; }
      el.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
    countObserver.unobserve(el);
  });
}, { threshold: 0.4 });
countEls.forEach(el => countObserver.observe(el));

const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
skillFills.forEach(el => skillObserver.observe(el));

/* =========================================================
   WORK FILTER
========================================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      card.classList.toggle('hide', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

/* =========================================================
   CONTACT FORM
========================================================= */
const contactForm = document.getElementById('contactForm');
const formSubmit  = document.getElementById('formSubmit');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = formSubmit.querySelector('span');
    const icon  = formSubmit.querySelector('i');

    label.textContent = 'Sending...';
    formSubmit.style.opacity = '0.75';

    setTimeout(() => {
      label.textContent = 'Message Sent';
      icon.className = 'fa-solid fa-check';
      formSubmit.style.opacity = '1';

      setTimeout(() => {
        contactForm.reset();
        label.textContent = 'Send Message';
        icon.className = 'fa-solid fa-paper-plane';
      }, 2200);
    }, 900);
  });
}

/* =========================================================
   FOOTER YEAR
========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
