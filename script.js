/* ============================================
   VERDANT LANDSCAPING — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     1. NAV: scroll effect + mobile toggle
  ---------------------------------------- */
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });


  /* ----------------------------------------
     2. SCROLL REVEAL (Intersection Observer)
  ---------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals in the same parent grid
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ----------------------------------------
     3. COUNTER ANIMATION (Stats section)
  ---------------------------------------- */
  const statNums = document.querySelectorAll('.stat__num[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = +el.dataset.count;
        const duration = 1600; // ms
        const step   = target / (duration / 16);
        let current  = 0;

        const update = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };

        requestAnimationFrame(update);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));


  /* ----------------------------------------
     4. PORTFOLIO FILTER
  ---------------------------------------- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const workCards   = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal
          setTimeout(() => card.classList.add('visible'), 20);
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });


  /* ----------------------------------------
     5. CONTACT FORM VALIDATION & SUBMIT
  ---------------------------------------- */
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        field.focus();
        valid = false;
      }
    });

    // Email format
    const emailField = form.querySelector('#email');
    if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      successMsg.classList.add('visible');

      setTimeout(() => successMsg.classList.remove('visible'), 4000);
    }, 1200);
  });

  // Remove error on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });


  /* ----------------------------------------
     6. SMOOTH ANCHOR SCROLL (account for fixed nav)
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ----------------------------------------
     7. HERO PARALLAX (subtle depth)
  ---------------------------------------- */
  const heroLeaves = document.querySelectorAll('.hero__leaf');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroLeaves.forEach((leaf, i) => {
      const speed = 0.12 + i * 0.06;
      leaf.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

});
