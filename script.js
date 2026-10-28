/**
 * SAFA & DHANISH AHMED — NIKAH WEDDING INVITATION
 * Elegant Interactive Script:
 * 1. Monogram 3D Pop, Zoom-in & Glide to Hero Landing Position
 * 2. Rich, Highly-Visible Romantic Petal, Heart, Star & Leaf Canvas System
 * 3. Finger Hold & Touch Responsive Shower
 * 4. IntersectionObserver Scroll Reveals & Parallax
 * 5. iCalendar (.ics) Support
 */

document.addEventListener('DOMContentLoaded', () => {

  // Progressive enhancement flag
  document.body.classList.add('js-enabled');

  // ========================================================================
  // 1. RICH ROMANTIC CANVAS PARTICLE SYSTEM (Petals, Hearts, Stars & Leaves)
  // Highly visible, rich colors, finger-hold responsive stream
  // ========================================================================
  const canvas = document.getElementById('particleCanvas');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let burstParticles = () => {};
  let addStreamParticles = () => {};

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
    const MAX_PARTICLES = isMobile ? 55 : 90;
    const particles = [];
    let animationFrameId = null;
    let isRunning = false;

    // Rich wedding color palette matching the new deep metallic burgundy monogram
    const palette = [
      { r: 91, g: 2, b: 24, name: 'burgundy' },     // Deep Velvet Wine Burgundy (#5B0218)
      { r: 109, g: 14, b: 25, name: 'burgundy' },   // Rich Velvet Maroon (#6D0E19)
      { r: 194, g: 77, b: 98, name: 'rose' },       // Vibrant Romantic Rose (#C24D62)
      { r: 224, g: 138, b: 152, name: 'blush' },    // Soft Warm Blush (#E08A98)
      { r: 212, g: 175, b: 55, name: 'gold' },      // Radiant Champagne Gold (#D4AF37)
      { r: 223, g: 199, b: 148, name: 'gold' },     // Pale Shimmering Gold (#DFC794)
      { r: 107, g: 142, b: 107, name: 'leaf' },     // Sage Foliage Leaf Green (#6B8E6B)
      { r: 86, g: 115, b: 86, name: 'leaf' }        // Deep Eucalyptus Olive Green (#567356)
    ];

    class HighlyVisibleParticle {
      constructor(x, y, isBurst = false) {
        this.x = x + (Math.random() - 0.5) * (isBurst ? 28 : 16);
        this.y = y + (Math.random() - 0.5) * (isBurst ? 28 : 16);

        // Velocity: bursts radiate slightly outwards; normal particles drift gently downward
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.2 + Math.random() * 2.8;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 0.8;
        } else {
          this.vx = (Math.random() - 0.5) * 1.2;
          this.vy = 0.85 + Math.random() * 1.35;
        }

        // Sinusoidal horizontal sway & 3D flutter
        this.swayPhase = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.025 + Math.random() * 0.035;
        this.swayAmp = 0.65 + Math.random() * 0.95;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;

        // Particle types:
        // 45% Rose Petal, 25% Romantic Heart, 18% Glowing Star, 12% Greenery Leaf
        const roll = Math.random();
        if (roll < 0.45) {
          this.type = 'petal';
          this.size = 12 + Math.random() * 9; // 12px - 21px (large and clearly visible!)
          // Pick burgundy, rose or blush
          const c = palette[Math.floor(Math.random() * 4)];
          this.r = c.r; this.g = c.g; this.b = c.b;
        } else if (roll < 0.70) {
          this.type = 'heart';
          this.size = 10 + Math.random() * 6; // 10px - 16px
          const c = palette[Math.floor(Math.random() * 4)];
          this.r = c.r; this.g = c.g; this.b = c.b;
        } else if (roll < 0.88) {
          this.type = 'star';
          this.size = 5 + Math.random() * 4; // 5px - 9px
          const c = palette[4 + Math.floor(Math.random() * 2)]; // Gold
          this.r = c.r; this.g = c.g; this.b = c.b;
        } else {
          this.type = 'leaf';
          this.size = 10 + Math.random() * 5; // 10px - 15px
          const c = palette[6 + Math.floor(Math.random() * 2)]; // Green foliage
          this.r = c.r; this.g = c.g; this.b = c.b;
        }

        this.life = 0;
        this.maxLife = 110 + Math.floor(Math.random() * 70); // ~2.2 - 3.4 seconds
        this.maxAlpha = 0.88 + Math.random() * 0.12; // Highly visible (0.88 - 1.0)
      }

      update() {
        this.life++;
        // Downward drift with drag
        this.y += this.vy;
        this.x += this.vx;
        this.vx *= 0.985;
        if (this.vy < 1.1) this.vy += 0.035;

        this.swayPhase += this.swaySpeed;
        this.x += Math.sin(this.swayPhase) * this.swayAmp;
        this.rotation += this.rotSpeed;

        return this.life < this.maxLife && this.y < height + 40;
      }

      draw(c) {
        const progress = this.life / this.maxLife;
        let alpha = this.maxAlpha;
        if (progress < 0.12) {
          alpha = (progress / 0.12) * this.maxAlpha;
        } else if (progress > 0.70) {
          alpha = (1 - (progress - 0.70) / 0.30) * this.maxAlpha;
        }
        if (alpha <= 0.005) return;

        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);

        c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha.toFixed(3)})`;
        c.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${(alpha * 0.4).toFixed(3)})`;

        if (this.type === 'petal') {
          // 3D flutter: horizontal oscillation mimics turning in air
          const flutter = Math.cos(this.swayPhase);
          c.scale(flutter * 0.9, 1);
          c.beginPath();
          c.moveTo(0, -this.size);
          c.bezierCurveTo(this.size * 0.85, -this.size * 0.4, this.size * 0.9, this.size * 0.4, 0, this.size);
          c.bezierCurveTo(-this.size * 0.9, this.size * 0.4, -this.size * 0.85, -this.size * 0.4, 0, -this.size);
          c.fill();

          // Subtle center vein highlight
          c.beginPath();
          c.moveTo(0, -this.size * 0.65);
          c.lineTo(0, this.size * 0.65);
          c.lineWidth = 1;
          c.stroke();

        } else if (this.type === 'heart') {
          // Crisp, romantic heart shape
          const s = this.size * 0.62;
          c.beginPath();
          c.moveTo(0, s * 0.35);
          c.bezierCurveTo(0, 0, -s, 0, -s, s * 0.55);
          c.bezierCurveTo(-s, s * 1.15, 0, s * 1.55, 0, s * 1.85);
          c.bezierCurveTo(0, s * 1.55, s, s * 1.15, s, s * 0.55);
          c.bezierCurveTo(s, 0, 0, 0, 0, s * 0.35);
          c.fill();

        } else if (this.type === 'star') {
          // 4-pointed radiant champagne gold diamond star
          const s = this.size;
          c.beginPath();
          c.moveTo(0, -s * 1.2);
          c.lineTo(s * 0.3, -s * 0.3);
          c.lineTo(s * 1.2, 0);
          c.lineTo(s * 0.3, s * 0.3);
          c.lineTo(0, s * 1.2);
          c.lineTo(-s * 0.3, s * 0.3);
          c.lineTo(-s * 1.2, 0);
          c.lineTo(-s * 0.3, -s * 0.3);
          c.closePath();
          c.fill();

        } else if (this.type === 'leaf') {
          // Foliage eucalyptus leaf
          const s = this.size;
          c.beginPath();
          c.moveTo(0, -s);
          c.bezierCurveTo(s * 0.55, -s * 0.4, s * 0.55, s * 0.4, 0, s);
          c.bezierCurveTo(-s * 0.55, s * 0.4, -s * 0.55, -s * 0.4, 0, -s);
          c.fill();
        }

        c.restore();
      }
    }

    burstParticles = function(x, y, count = 10) {
      for (let i = 0; i < count; i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(new HighlyVisibleParticle(x, y, true));
        }
      }
      startLoop();
    };

    addStreamParticles = function(x, y, count = 2) {
      for (let i = 0; i < count; i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(new HighlyVisibleParticle(x, y, false));
        }
      }
      startLoop();
    };

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

    // ======================================================================
    // FINGER HOLD & POINTER TRACKING
    // Continuous flow whenever user keeps their finger or mouse on screen
    // ======================================================================
    let isHoldingPointer = false;
    let holdCoords = { x: 0, y: 0 };
    let holdStreamInterval = null;

    function startHolding(x, y) {
      isHoldingPointer = true;
      holdCoords.x = x;
      holdCoords.y = y;
      // Immediate burst on press
      burstParticles(x, y, 7);

      // Continuous stream while holding finger down
      if (!holdStreamInterval) {
        holdStreamInterval = setInterval(() => {
          if (isHoldingPointer) {
            addStreamParticles(holdCoords.x, holdCoords.y, 2);
          }
        }, 55);
      }
    }

    function updateHolding(x, y) {
      holdCoords.x = x;
      holdCoords.y = y;
      addStreamParticles(x, y, 2);
    }

    function stopHolding() {
      isHoldingPointer = false;
      if (holdStreamInterval) {
        clearInterval(holdStreamInterval);
        holdStreamInterval = null;
      }
    }

    // Desktop pointer / mouse listeners
    window.addEventListener('pointerdown', (e) => {
      startHolding(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return; // Handled by touch events
      if (isHoldingPointer) {
        updateHolding(e.clientX, e.clientY);
      } else {
        // Hover movement generates visible trail
        addStreamParticles(e.clientX, e.clientY, 1);
      }
    }, { passive: true });

    window.addEventListener('pointerup', stopHolding, { passive: true });
    window.addEventListener('pointercancel', stopHolding, { passive: true });

    // Mobile touch listeners (passive, non-blocking, highly interactive)
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        startHolding(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        updateHolding(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', stopHolding, { passive: true });
    window.addEventListener('touchcancel', stopHolding, { passive: true });
  }

  // ========================================================================
  // 2. INVITATION OPENER WITH MONOGRAM POP, ZOOM-IN & GLIDE ANIMATION
  // ========================================================================
  const invitationOpener = document.getElementById('invitationOpener');
  const openerCard = document.getElementById('openerCard');
  const openerMonogramImg = document.getElementById('openerMonogramImg');
  const heroMonogramImg = document.getElementById('heroMonogramImg');
  let isOpenerHandled = false;

  function triggerHeroEntrance() {
    const heroItems = document.querySelectorAll('#hero .reveal-item');
    heroItems.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 80 + index * 160);
    });
  }

  function openInvitation() {
    if (isOpenerHandled || !invitationOpener) return;
    isOpenerHandled = true;

    // Start measurements BEFORE modifying any layout or classes
    const startRect = openerMonogramImg ? openerMonogramImg.getBoundingClientRect() : null;
    const targetRect = heroMonogramImg ? heroMonogramImg.getBoundingClientRect() : null;

    if (startRect && targetRect && openerMonogramImg) {
      // Calculate exact center coordinates to guarantee 0.0px landing alignment
      const startCenterX = startRect.left + startRect.width / 2;
      const startCenterY = startRect.top + startRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const totalDx = targetCenterX - startCenterX;
      const totalDy = targetCenterY - startCenterY;
      const targetScale = targetRect.width / startRect.width;

      // Create flying clone placed at exact startRect
      const flyer = document.createElement('img');
      flyer.src = openerMonogramImg.src;
      flyer.alt = 'Safa & Dhanish Monogram';
      flyer.className = 'monogram-flyer';
      flyer.style.position = 'fixed';
      flyer.style.left = `${startRect.left}px`;
      flyer.style.top = `${startRect.top}px`;
      flyer.style.width = `${startRect.width}px`;
      flyer.style.height = `${startRect.height}px`;
      flyer.style.zIndex = '10005';
      flyer.style.pointerEvents = 'none';
      flyer.style.transformOrigin = 'center center';
      document.body.appendChild(flyer);

      // Hide opener monogram and keep hero monogram ready
      openerMonogramImg.style.visibility = 'hidden';
      heroMonogramImg.style.visibility = 'hidden';

      // Burst petals from center
      burstParticles(startCenterX, startCenterY, 14);

      // Fade out opener backdrop smoothly in parallel
      invitationOpener.classList.add('is-unfolding');

      // Continuous fluid flight directly along the vertical axis into target
      const animation = flyer.animate([
        {
          transform: 'translate(0px, 0px) scale(1)',
          filter: 'drop-shadow(0 4px 10px rgba(91, 2, 24, 0.2))',
          offset: 0
        },
        {
          // Pop and zoom towards the viewer
          transform: `translate(${totalDx * 0.15}px, ${totalDy * 0.08 - 14}px) scale(1.38)`,
          filter: 'drop-shadow(0 22px 42px rgba(91, 2, 24, 0.52)) drop-shadow(0 0 22px rgba(223, 199, 148, 0.6))',
          offset: 0.28
        },
        {
          // Smooth glide into target
          transform: `translate(${totalDx * 0.75}px, ${totalDy * 0.75}px) scale(${1 + (targetScale - 1) * 0.75})`,
          filter: 'drop-shadow(0 6px 16px rgba(91, 2, 24, 0.25))',
          offset: 0.78
        },
        {
          // 100% exact pixel match landing in hero location
          transform: `translate(${totalDx}px, ${totalDy}px) scale(${targetScale})`,
          filter: 'drop-shadow(0 3px 10px rgba(109, 14, 25, 0.08))',
          offset: 1
        }
      ], {
        duration: 880,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        // Perfect cut: seamlessly reveal real hero logo and cleanup flyer
        heroMonogramImg.style.visibility = 'visible';
        requestAnimationFrame(() => {
          flyer.remove();
        });
        invitationOpener.classList.add('is-hidden');
        invitationOpener.style.display = 'none';
        invitationOpener.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('opener-active');
        burstParticles(targetCenterX, targetCenterY, 8);
        triggerHeroEntrance();
      };

    } else {
      // Fallback transition
      invitationOpener.classList.add('is-unfolding');
      setTimeout(() => {
        invitationOpener.classList.add('is-hidden');
        invitationOpener.style.display = 'none';
        invitationOpener.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('opener-active');
        triggerHeroEntrance();
      }, 700);
    }
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
    triggerHeroEntrance();
  }

  // ========================================================================
  // 3. SCROLL REVEALS (IntersectionObserver)
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
      if (!el.closest('#hero')) {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ========================================================================
  // 4. SUBTLE FLORAL PARALLAX ON SCROLL
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
      const eventTitle = "Nikah Ceremony: Safa & Dhanish Ahmed";
      const eventLocation = "St. Michael Community Hall, Valanar Street, Vedha Nagar, Nagercoil";
      const eventDescription = "Blessed Nikah ceremony of Safa (Daughter of Mr. Kaja Mohideen & Mrs. Aneez Banu) and Dhanish Ahmed (Son of Mr. Mohamed Fakrudeen & Mrs. Sulbath). Venue: https://maps.app.goo.gl/hXpbcaUwu97LtgK59";

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
