// Enhancements: hero letter animation, tilt effect, spotlight cursor, staggered reveal, hacker mode toggle

document.addEventListener('DOMContentLoaded', () => {
  // 1) Hero per-letter animation
  const hero = document.getElementById('hero-title');
  if (hero) {
    const text = hero.textContent.trim();
    hero.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < text.length; i++) {
      const ch = document.createElement('span');
      ch.className = 'char';
      ch.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      frag.appendChild(ch);
    }
    hero.appendChild(frag);

    // reveal letters with stagger
    const letters = hero.querySelectorAll('.char');
    letters.forEach((el, idx) => {
      setTimeout(() => el.classList.add('visible'), 80 * idx);
    });
  }

  // 2) Tilt effect for cards
  const tiltEls = document.querySelectorAll('.tilt-card');
  tiltEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (x - 0.5) * 14; // -7..7
      const rotateX = (0.5 - y) * 10; // -5..5
      const scale = 1.015;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // 3) Spotlight cursor that follows mouse
  const spotlight = document.querySelector('.spotlight');
  if (spotlight) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX + 'px';
      const y = e.clientY + 'px';
      spotlight.style.setProperty('--mx', x);
      spotlight.style.setProperty('--my', y);
    });
    // subtle fade when idle
    let idleTimer;
    document.addEventListener('mousemove', () => {
      spotlight.style.opacity = '1';
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { spotlight.style.opacity = '0.6'; }, 2000);
    });
  }

  // 4) Stagger reveal tweaks: make sure important reveals get a nicer easing
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // add subtle stagger for children
        const children = entry.target.querySelectorAll('.glass-card, .char, .reveal-child');
        children.forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 80));
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));

  // 5) Hacker Mode Toggle
  const toggleBtn = document.getElementById('mode-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('hacker-mode');
      const isHacker = document.body.classList.contains('hacker-mode');
      toggleBtn.textContent = isHacker ? 'Normal Mode' : 'Hacker Mode';
      toggleBtn.classList.toggle('btn-primary', !isHacker);
      toggleBtn.classList.toggle('btn-ghost', isHacker);
    });
  }

  // 6) Reduce motion preference
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduce.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1) Hero per-letter animation
  const hero = document.getElementById('hero-title');
  if (hero) {
    const text = hero.textContent.trim();
    hero.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < text.length; i++) {
      const ch = document.createElement('span');
      ch.className = 'char';
      ch.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      frag.appendChild(ch);
    }
    hero.appendChild(frag);

    // reveal letters with stagger
    const letters = hero.querySelectorAll('.char');
    letters.forEach((el, idx) => {
      setTimeout(() => el.classList.add('visible'), 80 * idx);
    });
  }

  // 2) Tilt effect for cards
  const tiltEls = document.querySelectorAll('.tilt-card');
  tiltEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (x - 0.5) * 14; // -7..7
      const rotateX = (0.5 - y) * 10; // -5..5
      const scale = 1.015;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // 3) Spotlight cursor that follows mouse
  const spotlight = document.querySelector('.spotlight');
  if (spotlight) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX + 'px';
      const y = e.clientY + 'px';
      spotlight.style.setProperty('--mx', x);
      spotlight.style.setProperty('--my', y);
    });
    // subtle fade when idle
    let idleTimer;
    document.addEventListener('mousemove', () => {
      spotlight.style.opacity = '1';
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { spotlight.style.opacity = '0.6'; }, 2000);
    });
  }

  // 4) Stagger reveal tweaks: make sure important reveals get a nicer easing
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // add subtle stagger for children
        const children = entry.target.querySelectorAll('.glass-card, .char, .reveal-child');
        children.forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 80));
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));

  // 5) Reduce motion preference
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduce.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
});
