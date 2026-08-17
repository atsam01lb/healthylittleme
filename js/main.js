document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Testimonials slider ---------- */
  const track = document.querySelector(".slide-track");
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.querySelector(".slider-dots");
  if (track && slides.length && dotsWrap) {
    let current = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll("button");

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
      resetTimer();
    }

    function next() { goTo(current + 1); }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    resetTimer();
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 480);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const WHATSAPP_NUMBER = "14438137250";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const phone = contactForm.phone.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !phone || !message) {
        contactForm.reportValidity();
        return;
      }

      const text =
        `Hi Healthy Little Me, I'd like to get in touch.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Preferred Contact Number: ${phone}\n` +
        `Message: ${message}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    });
  }
});
