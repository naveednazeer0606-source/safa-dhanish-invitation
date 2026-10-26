/**
 * SAFA & DHANISH AHMED — NIKAH WEDDING INVITATION
 * Elegant Interactive Script: Scroll Reveal, Ambient Audio, Calendar, & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. SCROLL REVEAL (IntersectionObserver for slow, cinematic unfolds)
  // ========================================================================
  // Staggered graceful entrance for the hero elements on load
  const heroItems = document.querySelectorAll('#hero .reveal-item');
  heroItems.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 200 + index * 280);
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
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => {
      if (!el.closest('#hero')) {
        revealObserver.observe(el);
      }
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

  // ========================================================================
  // 5. AMBIENT ROMANTIC WEDDING SOUNDSCAPE (Web Audio API Synthesizer)
  // Acoustic Harp / Middle-Eastern Romantic Harmony with Zero Buffering Lag
  // ========================================================================
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicTooltip = document.getElementById('musicTooltip');
  
  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let melodyTimer = null;

  // Romantic acoustic chord progression (frequencies in Hz):
  // Chord 1: Dm (D, F, A)
  // Chord 2: Gm (G, Bb, D)
  // Chord 3: F maj (F, A, C)
  // Chord 4: A maj / Asus (A, C#, E / D)
  const notes = {
    D3: 146.83, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
    D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46
  };

  // Serene arpeggiated acoustic harp pattern
  const melodyScore = [
    // Bar 1 - Dm
    { note: notes.D3, time: 0, dur: 2.5 },
    { note: notes.A3, time: 0.35, dur: 2.0 },
    { note: notes.D4, time: 0.70, dur: 1.8 },
    { note: notes.F4, time: 1.05, dur: 1.8 },
    { note: notes.A4, time: 1.40, dur: 2.2 },
    { note: notes.D5, time: 1.75, dur: 2.5 },

    // Bar 2 - Gm
    { note: notes.G3, time: 2.8, dur: 2.5 },
    { note: notes.D4, time: 3.15, dur: 2.0 },
    { note: notes.G4, time: 3.50, dur: 1.8 },
    { note: notes.Bb4, time: 3.85, dur: 2.2 },
    { note: notes.D5, time: 4.20, dur: 2.5 },

    // Bar 3 - F Major
    { note: notes.F3, time: 5.2, dur: 2.5 },
    { note: notes.C4, time: 5.55, dur: 2.0 },
    { note: notes.F4, time: 5.90, dur: 1.8 },
    { note: notes.A4, time: 6.25, dur: 2.2 },
    { note: notes.C5, time: 6.60, dur: 2.5 },

    // Bar 4 - A Major (Warm resolution)
    { note: notes.A3, time: 7.6, dur: 2.8 },
    { note: notes.E4, time: 7.95, dur: 2.2 },
    { note: notes.A4, time: 8.30, dur: 2.0 },
    { note: notes.D5, time: 8.65, dur: 1.8 },
    { note: notes.E5, time: 9.00, dur: 2.8 }
  ];

  const loopDuration = 10.5; // seconds per sequence cycle

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      // Master output gain with gentle compression
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);

      // Low pass filter to create soft, warm acoustic wood/string warmth
      const warmFilter = audioCtx.createBiquadFilter();
      warmFilter.type = 'lowpass';
      warmFilter.frequency.setValueAtTime(2200, audioCtx.currentTime);
      warmFilter.Q.setValueAtTime(1.0, audioCtx.currentTime);

      // Soft reverb-like delay for spacious wedding ambience
      const delay = audioCtx.createDelay();
      delay.delayTime.setValueAtTime(0.38, audioCtx.currentTime);
      const delayFeedback = audioCtx.createGain();
      delayFeedback.gain.setValueAtTime(0.28, audioCtx.currentTime);

      masterGain.connect(warmFilter);
      warmFilter.connect(audioCtx.destination);
      
      // Delay send
      warmFilter.connect(delay);
      delay.connect(delayFeedback);
      delayFeedback.connect(delay);
      delayFeedback.connect(audioCtx.destination);
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Plucks an acoustic string with organic decay & natural harmonics
  function playHarpString(freq, startTime, duration) {
    if (!audioCtx || !isPlaying) return;

    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    // Fundamental + subtle octave shimmer
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Natural plucked envelope: sharp gentle attack, long musical decay
    const attack = 0.025;
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  function scheduleMelodyLoop() {
    if (!isPlaying || !audioCtx) return;

    const now = audioCtx.currentTime;
    melodyScore.forEach(item => {
      playHarpString(item.note, now + item.time, item.dur);
    });

    melodyTimer = setTimeout(() => {
      if (isPlaying) {
        scheduleMelodyLoop();
      }
    }, loopDuration * 1000);
  }

  function startMusic() {
    initAudioContext();
    isPlaying = true;
    musicToggleBtn.classList.add('is-playing');
    musicToggleBtn.setAttribute('aria-pressed', 'true');
    if (musicTooltip) musicTooltip.textContent = "Pause Melody";

    // Fade master volume smoothly in
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.45, audioCtx.currentTime + 1.2);

    scheduleMelodyLoop();
  }

  function stopMusic() {
    if (!audioCtx) return;
    isPlaying = false;
    musicToggleBtn.classList.remove('is-playing');
    musicToggleBtn.setAttribute('aria-pressed', 'false');
    if (musicTooltip) musicTooltip.textContent = "Play Melody";

    if (melodyTimer) {
      clearTimeout(melodyTimer);
      melodyTimer = null;
    }

    if (masterGain) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startMusic();
      } else {
        stopMusic();
      }
    });

    // Optional subtle introductory hint
    setTimeout(() => {
      if (!isPlaying && musicTooltip) {
        musicTooltip.classList.add('is-visible');
        setTimeout(() => {
          musicTooltip.classList.remove('is-visible');
        }, 4500);
      }
    }, 1200);
  }

  // Hide music tooltip upon first user scroll
  window.addEventListener('scroll', () => {
    if (musicTooltip) {
      musicTooltip.classList.remove('is-visible');
    }
  }, { once: true, passive: true });

});
