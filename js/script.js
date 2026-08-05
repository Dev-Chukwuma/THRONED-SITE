// ===== THEME TOGGLE =====
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = toggleBtn.querySelector('.toggle-icon');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggleIcon.textContent = theme === 'dark' ? '☾' : '☀';
  localStorage.setItem('throned-theme', theme);
}

// Load saved theme, or fall back to system preference
const savedTheme = localStorage.getItem('throned-theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
})


// ===== MOBILE NAV =====
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is tapped
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});


// ===== CATEGORY FILTER (shop.html only) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#product-grid .product-card');
const noResults = document.getElementById('no-results');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      noResults.hidden = visibleCount !== 0;
    });
  });
}
