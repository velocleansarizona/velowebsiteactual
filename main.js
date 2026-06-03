// ============================================================
// PROMOTIONAL POPUP — First Month 50% Off
// Shows after 5 seconds, once every 7 days per visitor
// ============================================================
(function() {
  const POPUP_KEY  = 'velo_popup_shown';
  const POPUP_DAYS = 7;

  function shouldShow() {
    const last = localStorage.getItem(POPUP_KEY);
    if (!last) return true;
    const daysSince = (Date.now() - parseInt(last)) / (1000 * 60 * 60 * 24);
    return daysSince >= POPUP_DAYS;
  }

  function createPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'velo-popup-overlay';
    overlay.innerHTML = `
      <div id="velo-popup">
        <button id="velo-popup-close" aria-label="Close offer">&times;</button>
        <div class="velo-popup-badge">
          <i class="fas fa-tag"></i> Limited Time Offer
        </div>
        <div class="velo-popup-body">
          <div class="velo-popup-icon">
            <i class="fas fa-percentage"></i>
          </div>
          <h2>Get Your First Month <span>50% Off!</span></h2>
          <p>New clients only. Book any recurring cleaning or maintenance service and save 50% on your first month. Maricopa County businesses only.</p>
          <div class="velo-popup-actions">
            <a href="tel:6023253235" class="velo-popup-call">
              <i class="fas fa-phone"></i> Call to Claim: (602) 325-3235
            </a>
            <a href="contact.html" class="velo-popup-quote">
              <i class="fas fa-clipboard-list"></i> Get a Free Quote
            </a>
          </div>
          <p class="velo-popup-fine">*New recurring service clients only. Cannot be combined with other offers. Maricopa County, AZ.</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on X
    document.getElementById('velo-popup-close').addEventListener('click', closePopup);
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePopup();
    });
    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closePopup();
    });

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { overlay.classList.add('velo-popup-visible'); });
    });
  }

  function closePopup() {
    const overlay = document.getElementById('velo-popup-overlay');
    if (overlay) {
      overlay.classList.remove('velo-popup-visible');
      setTimeout(() => overlay.remove(), 300);
    }
    localStorage.setItem(POPUP_KEY, Date.now().toString());
  }

  if (shouldShow()) {
    window.addEventListener('load', function() {
      setTimeout(createPopup, 5000);
    });
  }
})();

// Mobile navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close menu when a non-dropdown link is clicked
  navMenu.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40
      ? '0 4px 32px rgba(27,52,97,0.18)'
      : '0 4px 24px rgba(27,52,97,0.10)';
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Auto-scroll to #quote-form on page load if hash is present
if (window.location.hash === '#quote-form') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const target = document.getElementById('quote-form');
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 200);
  });
}

// Scroll-in animation
const animatables = document.querySelectorAll('.service-card, .city-card, .stat-card, .contact-detail');
animatables.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s ease, border-color 0.3s ease';
});

const reveal = () => {
  animatables.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 70) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};
window.addEventListener('scroll', reveal, { passive: true });
window.addEventListener('load', reveal);

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
    // Open clicked (if it wasn't already open)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Contact form
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    contactForm.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) return;

    // Show success — replace with real form handler (e.g. Formspree, EmailJS)
    if (formSuccess) {
      formSuccess.style.display = 'flex';
      contactForm.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { formSuccess.style.display = 'none'; }, 9000);
    }
  });

  // Clear error on input
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}
