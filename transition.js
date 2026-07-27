/* =========================================================
   PAGE TRANSITION — shared JS
   Intercepts same-origin link clicks, shows the bar,
   then navigates. On DOMContentLoaded it finishes the bar.
========================================================= */
(function () {
  const loader  = document.getElementById('pageLoader');
  const overlay = document.getElementById('pageOverlay');

  /* finish bar on page load */
  function finishBar() {
    if (!loader) return;
    loader.style.width = '85%';
    requestAnimationFrame(() => {
      setTimeout(() => loader.classList.add('done'), 60);
    });
  }

  /* intercept all internal <a> clicks */
  function initLinks() {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') ||
          href.startsWith('http') || a.getAttribute('target') === '_blank' ||
          a.hasAttribute('download')) return;

      a.addEventListener('click', e => {
        e.preventDefault();
        /* start bar */
        if (loader) { loader.style.width = '0%'; loader.classList.remove('done'); }
        /* flash overlay */
        if (overlay) { overlay.classList.add('visible'); }

        setTimeout(() => {
          if (loader) loader.style.width = '70%';
        }, 10);

        setTimeout(() => {
          window.location.href = href;
        }, 280);
      });
    });
  }

  /* Theme Toggle System */
  function initTheme() {
    const navToggle = document.getElementById('navToggle');
    if (!navToggle) return;

    // Create theme toggle button
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.id = 'themeToggle';
    themeBtn.setAttribute('aria-label', 'Toggle Theme');

    // Get initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLight = savedTheme === 'light';
    
    // Set icon based on current theme
    themeBtn.innerHTML = isLight 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
    
    // Insert into nav-inner right before navToggle (hamburger icon)
    navToggle.parentNode.insertBefore(themeBtn, navToggle);

    // Click handler
    themeBtn.addEventListener('click', () => {
      const active = document.documentElement.classList.toggle('light-mode');
      localStorage.setItem('theme', active ? 'light' : 'dark');
      themeBtn.innerHTML = active 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    finishBar();
    initLinks();
    initTheme();
  });
})();
