document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header on scroll ---------- */
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 500);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Assign stagger index within each stagger group
  document.querySelectorAll('.stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  /* ---------- Testimonial slider ---------- */
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsWrap = document.querySelector('.slider-dots');
  let current = 0;
  let sliderTimer;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i, true));
      dotsWrap.appendChild(dot);
    });

    function goToSlide(index, manual) {
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
      if (manual) restartAutoplay();
    }

    function nextSlide() { goToSlide(current + 1); }

    function restartAutoplay() {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(nextSlide, 5500);
    }
    restartAutoplay();

    const sliderEl = document.querySelector('.slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(sliderTimer));
    sliderEl.addEventListener('mouseleave', restartAutoplay);
  }

  /* ---------- Hero parallax blobs on mouse move (desktop only) ---------- */
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(min-width: 980px)').matches) {
    const blobs = hero.querySelectorAll('.blob');
    hero.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 6;
        blob.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
  }

  /* ---------- Cash payment modal ---------- */
  const cashTrigger = document.getElementById('cash-modal-trigger');
  const cashModal = document.getElementById('cash-modal');

  if (cashTrigger && cashModal) {
    const cashClose = document.getElementById('cash-modal-close');

    const openCashModal = () => {
      cashModal.classList.add('open');
      cashModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-lock');
    };
    const closeCashModal = () => {
      cashModal.classList.remove('open');
      cashModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-lock');
    };

    cashTrigger.addEventListener('click', openCashModal);
    cashClose.addEventListener('click', closeCashModal);
    cashModal.addEventListener('click', (e) => {
      if (e.target === cashModal) closeCashModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cashModal.classList.contains('open')) closeCashModal();
    });
  }

  /* ---------- Contact form (AJAX submit via FormSubmit) ---------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = "Thanks! Your message has been sent — we'll be in touch soon.";
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        formStatus.textContent = 'Something went wrong sending your message. Please try again, or email us directly.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
