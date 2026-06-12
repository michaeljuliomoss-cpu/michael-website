// ============================================
// Michael Moss — Main JS
// ============================================

(function() {
  'use strict';

  // --- Mobile Menu (Slide-in Panel) ---
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileOverlay = document.getElementById('mobileOverlay');
  var mobileClose = document.getElementById('mobileClose');
  var mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function openMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu && mobileOverlay) {
    hamburger.addEventListener('click', function() {
      if (mobileMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileOverlay.addEventListener('click', closeMenu);

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // --- Navbar scroll effect ---
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
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
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
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

      var whatsappMsg = 'Hi Michael! I\'m ' + name + '.\n\n';
      if (service) whatsappMsg += 'Service: ' + service + '\n';
      whatsappMsg += 'Email: ' + email + '\n\n';
      whatsappMsg += message;

      var whatsappUrl = 'https://wa.me/12424478109?text=' + encodeURIComponent(whatsappMsg);
      window.open(whatsappUrl, '_blank');

      contactForm.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:3rem;margin-bottom:16px;">✅</div><h3>Message Sent!</h3><p style="color:var(--text-light);margin-top:8px;">I\'ll get back to you as soon as possible.</p></div>';
    });
  }

  // --- Video autoplay with fallback ---
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    var playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        heroVideo.muted = true;
        heroVideo.play();
      });
    }
    heroVideo.addEventListener('error', function() {
      this.style.display = 'none';
    });
  }

})();
