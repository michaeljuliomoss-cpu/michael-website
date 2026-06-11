// ============================================
// Michael Moss — Main JS
// ============================================

(function() {
  'use strict';

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen) {
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        toggleMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });

    // Close on outside click
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        toggleMenu();
      }
    });
  }

  // --- Scroll-to-top button ---
  var scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Fade-in on scroll ---
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // --- Navbar scroll effect ---
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Portfolio thumbnail click ---
  var thumbs = document.querySelectorAll('.project-thumb');
  var mainImage = document.querySelector('.project-main-image img');
  var mainLink = document.querySelector('.project-main-image .visit-btn');
  var mainImgLink = document.querySelector('.project-main-image a');

  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      var img = this.querySelector('img');
      var label = this.querySelector('.thumb-label');
      var href = this.getAttribute('data-href');

      if (img && mainImage) {
        mainImage.src = img.src;
        mainImage.alt = img.alt;
      }
      if (label && mainLink) {
        mainLink.textContent = 'Visit ' + label.textContent;
      }
      if (href && mainImgLink) {
        mainImgLink.href = href;
      }

      // Update active state
      thumbs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // --- Contact form handling ---
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var service = document.getElementById('service').value;
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Build WhatsApp message
      var whatsappMsg = 'Hi Michael! I\'m ' + name + '.\n\n';
      if (service) whatsappMsg += 'Service: ' + service + '\n';
      whatsappMsg += 'Email: ' + email + '\n\n';
      whatsappMsg += message;

      var whatsappUrl = 'https://wa.me/12424478109?text=' + encodeURIComponent(whatsappMsg);
      window.open(whatsappUrl, '_blank');

      // Show success
      contactForm.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:3rem;margin-bottom:16px;">✅</div><h3>Message Sent!</h3><p style="color:var(--text-muted);margin-top:8px;">I\'ll get back to you as soon as possible.</p></div>';
    });
  }

})();
