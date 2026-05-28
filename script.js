// Navbar scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.getElementById('navHamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

// Contact form — Formspree
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xeedvavy', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please call us at 845-395-4492.');
    }
  } catch {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    alert('Something went wrong. Please call us at 845-395-4492.');
  }
});

// ===== YEAR PLAN TOOL =====
const planData = {
  spring: {
    base: [
      { text: 'AC filter change & system check', highlight: true },
      { text: 'Water softener maintenance', highlight: false },
      { text: 'Full home walkthrough & inspection', highlight: false },
    ],
    sprinkler: { text: 'Sprinkler system opening & zone test', highlight: true },
    pool:      { text: 'Pool opening & chemical balance', highlight: true, coming: true },
  },
  summer: {
    base: [
      { text: 'Garbage can deep cleaning', highlight: true },
      { text: 'Maintenance check & home inspection', highlight: false },
      { text: '24/7 on-call for any issues', highlight: false },
    ],
    sprinkler: { text: 'Sprinkler mid-season check', highlight: false },
    pool:      { text: 'Pool upkeep & chemical balancing', highlight: true, coming: true },
  },
  fall: {
    base: [
      { text: 'Gutter cleaning & debris removal', highlight: true },
      { text: 'Outdoor furniture storage', highlight: true },
      { text: 'Pre-winter home inspection', highlight: false },
    ],
    sprinkler: { text: 'Sprinkler system winterization & close', highlight: true },
    pool:      { text: 'Pool closing & winter prep', highlight: true, coming: true },
  },
  winter: {
    base: [
      { text: 'Water softener & filter check', highlight: true },
      { text: 'Heating & plumbing inspection', highlight: false },
      { text: '24/7 emergency on-call', highlight: false },
    ],
    sprinkler: null,
    pool:      null,
  },
};

const state = { pool: 'no', sprinkler: 'no' };

function renderCards() {
  ['spring', 'summer', 'fall', 'winter'].forEach(season => {
    const data = planData[season];
    const ul = document.getElementById('items-' + season);
    const items = [...data.base];
    if (state.sprinkler === 'yes' && data.sprinkler) items.push(data.sprinkler);
    if (state.pool === 'yes' && data.pool) items.push(data.pool);

    ul.innerHTML = items.map(item => `
      <li class="yp-item ${item.highlight ? 'highlight' : ''} ${item.coming ? 'coming' : ''}">
        <span class="yp-item-dot"></span>
        <span>${item.text}${item.coming ? ' <em style="font-size:11px;opacity:.6">(coming soon)</em>' : ''}</span>
      </li>
    `).join('');
  });
}

document.querySelectorAll('.yp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    const v = btn.dataset.v;
    state[q] = v;
    document.querySelectorAll(`.yp-btn[data-q="${q}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });
});

renderCards();

// Also add mobile responsive for year plan toggle
// ===== Scroll animations =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.svc-card, .plan-main, .plan-coming-card, .about-card, .contact-left').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
  observer.observe(el);
});
