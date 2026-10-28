/**
 * SAFA & DHANISH AHMED — NIKAH WEDDING INVITATION
 * Elegant Interactive Experience: Invitation Opener, Romantic Canvas Drizzle,
 * Scroll Reveals, Ambient Parallax, & iCalendar Support
 */

document.addEventListener('DOMContentLoaded', () => {

  // Progressive enhancement flag
  document.body.classList.add('js-enabled');

  // ========================================================================
  // 1. INVITATION OPENER & UNSEALING SEQUENCE
  // ========================================================================
  const invitationOpener = document.getElementById('invitationOpener');
  const openerCard = document.getElementById('openerCard');
  let isOpenerHandled = false;

  function triggerHeroEntrance() {
    const heroItems = document.querySelectorAll('#hero .reveal-item');
    heroItems.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 100 + index * 180);
    });
  }

  function openInvitation() {
    if (isOpenerHandled || !invitationOpener) return;
    isOpenerHandled = true;

    // Tactile depression response
    if (openerCard) {
      openerCard.classList.add('is-pressed');
    }

    // Outer card unseals and gently lifts/unfolds
    setTimeout(() => {
      invitationOpener.classList.add('is-unfolding');
    }, 150);

    // Smooth dissolve into the main luxury invitation
    setTimeout(() => {
      invitationOpener.classList.add('is-hidden');
      invitationOpener.style.display = 'none';
      invitationOpener.setAttribute('aria-hidden', 'true');
      triggerHeroEntrance();
    }, 1100);
  }

  if (openerCard) {
    openerCard.addEventListener('click', openInvitation);
    openerCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvitation();
      }
    });
  } else {
    // Fallback if opener is not in DOM
    triggerHeroEntrance();
  }

  // ========================================================================
  // 2. SCROLL REVEAL (IntersectionObserver)
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '40px 0px 0px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => {
      // Hero elements are handled separately on opener transition
      if (!el.closest('#hero')) {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ========================================================================
  // 3. SUBTLE FLORAL PARALLAX ON SCROLL
  // ========================================================================
  const floralTopImg = document.querySelector('.floral-top-img');
  const romanticBgFloralImg = document.querySelector('.romantic-bg-floral-img');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (floralTopImg && scrolled < 450) {
          floralTopImg.style.transform = `translateY(${scrolled * 0.08}px) scale(1.02)`;
        }
        if (romanticBgFloralImg && scrolled < 1800) {
          romanticBgFloralImg.style.transform = `scale(1) translateY(${scrolled * 0.03}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ========================================================================
  // 4. ROMANTIC FLOWER PETAL + HEART CANVAS DRIZZLE
  // ========================================================================
  const canvas = document.getElementById('particleCanvas');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas && canvas.getContext && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const isMobile = window.innerWidth < 768;
    const MAX_PARTICLES = isMobile ? 14 : 26;
    const particles = [];
    let animationFrameId = null;
    let isRunning = false;

    // Curated romantic wedding palette
    const colors = [
      { r: 232, g: 200, b: 203 }, // Soft blush pink
      { r: 249, g: 236, b: 238 }, // Very pale blush
      { r: 194, g: 142, b: 149 }, // Muted rose
      { r: 253, g: 251, b: 247 }, // Pale cream / ivory
      { r: 109, g: 14, b: 25 },   // Velvet burgundy
      { r: 197, g: 160, b: 89 }   // Champagne gold
    ];

    class RomanticParticle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;
        // Soft downward drift
        this.vy = 0.55 + Math.random() * 0.75;
        this.swayPhase = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.02 + Math.random() * 0.025;
        this.swayAmp = 0.45 + Math.random() * 0.7;
        
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.025;

        // Particle types: 60% petal, 25% heart, 15% stardust speck
        const roll = Math.random();
        if (roll < 0.60) {
          this.type = 'petal';
          this.size = 6 + Math.random() * 5; // 6-11px
        } else if (roll < 0.85) {
          this.type = 'heart';
          this.size = 5 + Math.random() * 4; // 5-9px
        } else {
          this.type = 'stardust';
          this.size = 2.5 + Math.random() * 2; // 2.5-4.5px
        }

        const c = colors[Math.floor(Math.random() * colors.length)];
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;

        this.life = 0;
        this.maxLife = 120 + Math.floor(Math.random() * 80); // ~2.5 - 4.5 seconds
        this.maxAlpha = this.type === 'stardust' ? 0.75 : (0.42 + Math.random() * 0.28);
      }

      update() {
        this.life++;
        this.y += this.vy;
        this.swayPhase += this.swaySpeed;
        this.x += Math.sin(this.swayPhase) * this.swayAmp;
        this.rotation += this.rotSpeed;

        return this.life < this.maxLife && this.y < height + 30;
      }

      draw(c) {
        const progress = this.life / this.maxLife;
        let alpha = this.maxAlpha;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * this.maxAlpha;
        } else {
          alpha = (1 - (progress - 0.15) / 0.85) * this.maxAlpha;
        }
        if (alpha <= 0.001) return;

        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);

        c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha.toFixed(3)})`;

        if (this.type === 'petal') {
          // Organic curved petal with natural 3D flutter
          const flutter = Math.cos(this.swayPhase);
          c.scale(flutter * 0.9, 1);
          c.beginPath();
          c.moveTo(0, -this.size);
          c.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.9, this.size * 0.5, 0, this.size);
          c.bezierCurveTo(-this.size * 0.9, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
          c.fill();
        } else if (this.type === 'heart') {
          // Delicate subtle heart shape
          const s = this.size * 0.65;
          c.beginPath();
          c.moveTo(0, s * 0.3);
          c.bezierCurveTo(0, 0, -s, 0, -s, s * 0.55);
          c.bezierCurveTo(-s, s * 1.15, 0, s * 1.5, 0, s * 1.8);
          c.bezierCurveTo(0, s * 1.5, s, s * 1.15, s, s * 0.55);
          c.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
          c.fill();
        } else {
          // Tiny stardust diamond
          const s = this.size;
          c.beginPath();
          c.moveTo(0, -s);
          c.lineTo(s * 0.35, 0);
          c.lineTo(0, s);
          c.lineTo(-s * 0.35, 0);
          c.closePath();
          c.fill();
        }

        c.restore();
      }
    }

    function addParticles(x, y, count = 1) {
      if (particles.length >= MAX_PARTICLES) return;
      for (let i = 0; i < count; i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(new RomanticParticle(x, y));
        }
      }
      startLoop();
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const isAlive = p.update();
        if (isAlive) {
          p.draw(ctx);
        } else {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
        animationFrameId = null;
      }
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(loop);
      }
    }

    // Desktop Pointer Movement (throttled soft romantic drizzle)
    let lastPointerTime = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const now = performance.now();
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      const dist = Math.hypot(dx, dy);

      if (now - lastPointerTime > 75 && dist > 12) {
        lastPointerTime = now;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        addParticles(e.clientX, e.clientY, 1);
      }
    }, { passive: true });

    // Mobile Touch Interaction (throttled, silky smooth, non-blocking)
    let lastTouchTime = 0;
    window.addEventListener('touchmove', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const now = performance.now();
      if (now - lastTouchTime > 95) {
        lastTouchTime = now;
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 1);
      }
    }, { passive: true });
  }

  // ========================================================================
  // 5. TOAST NOTIFICATION UTILITY
  // ========================================================================
  const toast = document.getElementById('toastNotification');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;
    
    toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3400);
  }

  // ========================================================================
  // 6. "ADD TO CALENDAR" (iCalendar / Google Calendar Support)
  // ========================================================================
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Event Details: Sunday, 10 January 2027, 10:45 AM - 11:30 AM IST (UTC+05:30)
      // 10:45 AM IST = 05:15 UTC
      // 11:30 AM IST = 06:00 UTC
      const eventTitle = "Nikah Ceremony: Safa & Dhanish Ahmed";
      const eventLocation = "St. Michael Community Hall, Valanar Street, Vedha Nagar, Nagercoil";
      const eventDescription = "Blessed Nikah ceremony of Safa (Daughter of Mr. Kaja Mohideen & Mrs. Aneez Banu) and Dhanish Ahmed (Son of Mr. Mohamed Fakrudeen & Mrs. Sulbath). Venue: https://maps.app.goo.gl/hXpbcaUwu97LtgK59";

      // Generate .ics iCalendar file content
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Safa & Dhanish Ahmed//Nikah Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:nikah-safa-dhanish-20270110T051500Z",
        "DTSTAMP:20261026T000000Z",
        "DTSTART:20270110T051500Z",
        "DTEND:20270110T060000Z",
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription}`,
        `LOCATION:${eventLocation}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Nikah-Safa-Dhanish.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Invitation saved to your calendar");
    });
  }

});


