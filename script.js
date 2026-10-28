/**
 * SAFA & DHANISH AHMED — NIKAH WEDDING INVITATION
 * Elegant Interactive Script: Scroll Reveal, Calendar, & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // Ensure body has js-enabled class for progressive enhancement
  document.body.classList.add('js-enabled');

  const revealElements = document.querySelectorAll('.reveal-item');

  // Staggered graceful entrance for the hero elements on load
  const heroItems = document.querySelectorAll('#hero .reveal-item');
  heroItems.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 100 + index * 200);
  });

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
      rootMargin: '50px 0px 0px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ========================================================================
  // 2. SUBTLE FLORAL PARALLAX ON SCROLL
  // ========================================================================
  const floralTopImg = document.querySelector('.floral-top-img');
  const floralCornerImg = document.querySelector('.floral-corner-accent');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (floralTopImg && scrolled < 400) {
          floralTopImg.style.transform = `translateY(${scrolled * 0.12}px) scale(1.02)`;
        }
        if (floralCornerImg && scrolled < 1200) {
          floralCornerImg.style.transform = `translateY(${scrolled * 0.06}px) rotate(-10deg)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ========================================================================
  // 3. TOAST NOTIFICATION UTILITY
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
  // 4. "ADD TO CALENDAR" (iCalendar / Google Calendar Support)
  // ========================================================================
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Event Details: Sunday, 10 January 2027, 11:00 AM - 12:30 PM IST (UTC+05:30)
      // 11:00 AM IST = 05:30 UTC
      // 12:30 PM IST = 07:00 UTC
      const eventTitle = "Nikah Ceremony: Safa & Dhanish Ahmed";
      const eventLocation = "St. Michael Community Hall, Valanar Street, Vedha Nagar, Nagercoil";
      const eventDescription = "Blessed Nikah ceremony of Safa (Daughter of Mr. Kaja Mohideen & Mrs. Aneez Banu) and Dhanish Ahmed (Son of Mr. Mohamed Fakrudeen & Mrs. Sulbath). Venue: https://maps.app.goo.gl/hXpbcaUwu97LtgK59";

      // Detect if iOS / Safari / Desktop for best calendar workflow
      const isMobileIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      // Generate .ics iCalendar file content
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Safa & Dhanish Ahmed//Nikah Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:nikah-safa-dhanish-20270110T053000Z",
        "DTSTAMP:20261026T000000Z",
        "DTSTART:20270110T053000Z",
        "DTEND:20270110T070000Z",
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription}`,
        `LOCATION:${eventLocation}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      // Blob download
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

