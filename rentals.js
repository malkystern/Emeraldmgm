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

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.r-svc-card, .r-step, .r-stat-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
  observer.observe(el);
});
