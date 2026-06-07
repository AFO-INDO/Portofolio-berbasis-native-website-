// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar scroll + progress + back to top
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
const isSubpage = document.body.classList.contains('subpage');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  if (nav && !isSubpage) nav.classList.toggle('scrolled', sc > 40);
  if (toTop) toTop.classList.toggle('show', sc > 500);
  if (progress) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? sc / h * 100 : 0) + '%';
  }
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  }));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counter animation
const counters = document.querySelectorAll('.stat-num');
if (counters.length) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.count;
        const plus = el.querySelector('.plus');
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const t = setInterval(() => {
          n += step;
          if (n >= target) { n = target; clearInterval(t); }
          el.firstChild.textContent = n;
          if (plus) el.appendChild(plus);
        }, 35);
        cio.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));
}

// Typing effect (home only)
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const phrases = ['Full-Stack Web Developer', 'Mobile & Desktop Developer', 'Database & API Specialist', 'UI/UX Enthusiast'];
  let pi = 0, ci = 0, deleting = false;
  (function type() {
    const cur = phrases[pi];
    typedEl.textContent = deleting ? cur.substring(0, ci--) : cur.substring(0, ci++);
    let delay = deleting ? 45 : 95;
    if (!deleting && ci === cur.length + 1) { deleting = true; delay = 1600; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    setTimeout(type, delay);
  })();
}

// Documentation project filter (documentation page only)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectGrid = document.getElementById('projectGrid');
if (filterBtns.length && projectGrid) {
  const cards = projectGrid.querySelectorAll('.project-card');
  const emptyNote = document.getElementById('emptyNote');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      let visible = 0;
      cards.forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });
      if (emptyNote) emptyNote.classList.toggle('is-hidden', visible !== 0);
    });
  });
}
