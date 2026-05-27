// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form — submits to Formspree
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xeedvavy', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (response.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please call or text us at 845-395-4492.');
    }
  } catch {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    alert('Something went wrong. Please call or text us at 845-395-4492.');
  }
});

// Scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.service-card, .plan-card, .hero-card, .about-content, .contact-info').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .55s ease ${i * 0.07}s, transform .55s ease ${i * 0.07}s`;
  observer.observe(el);
});
