/**
 * MOBILE-ONLY website javascript
 * Uses event delegation on document so that it works seamlessly
 * with Barba.js PJAX page transitions.
 */

(function () {
  // Helper to close the mobile menu overlay
  function closeMobileMenu() {
    const hamburger = document.querySelector('.m-hamburger');
    const navOverlay = document.querySelector('.m-nav-overlay');
    if (hamburger && navOverlay) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
      document.body.classList.remove('m-menu-open');
    }
  }

  // Handle all document level clicks (delegation pattern)
  document.addEventListener('click', function (e) {
    // 1. Toggle mobile menu overlay
    const hamburger = e.target.closest('.m-hamburger');
    if (hamburger) {
      const navOverlay = document.querySelector('.m-nav-overlay');
      if (navOverlay) {
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('show');
        if (navOverlay.classList.contains('show')) {
          document.body.style.overflow = 'hidden'; // prevent background scrolling
          document.body.classList.add('m-menu-open');
        } else {
          document.body.style.overflow = '';
          document.body.classList.remove('m-menu-open');
        }
      }
      return;
    }

    // 2. Scroll to section button (Explore Packages, Book Stay Now, Anchors)
    const scrollBtn = e.target.closest('.m-scroll-to');
    if (scrollBtn) {
      const targetId = scrollBtn.getAttribute('href') || scrollBtn.getAttribute('data-target');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();

        // Close menu first if clicked from inside the mobile overlay
        if (scrollBtn.closest('.m-nav-overlay')) {
          closeMobileMenu();
        }

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          // Smooth scroll to element, accounting for header height
          const headerOffset = 64;
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        return;
      }
    }

    // 3. Close menu when clicking standard nav links (page-to-page transition)
    const navLink = e.target.closest('.m-nav-link');
    if (navLink) {
      closeMobileMenu();
      return;
    }

    // 4. Toggle accordions on home page
    const accordionHeader = e.target.closest('.m-accordion-header');
    if (accordionHeader) {
      const accordion = accordionHeader.closest('.m-accordion');
      if (accordion) {
        const isActive = accordion.classList.contains('active');
        
        // Close other accordions
        const allAccordions = accordion.closest('.m-accordions').querySelectorAll('.m-accordion');
        allAccordions.forEach(item => item.classList.remove('active'));

        if (!isActive) {
          accordion.classList.add('active');
        }
      }
      return;
    }
  });

  // Handle form submissions for mobile-only forms
  document.addEventListener('submit', function (e) {
    const form = e.target.closest('.m-inquiry-form');
    if (form) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const successAlert = form.querySelector('.m-success-alert');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      // Collect form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        destination: formData.get('destination'),
        message: formData.get('message') || 'Mobile Inquiry'
      };

      console.log('Mobile Form Submission:', data);

      // Simulate API call and success transition
      setTimeout(() => {
        if (successAlert) {
          successAlert.style.display = 'block';
          form.reset();
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Inquiry';
        }
      }, 1200);
    }
  });

  // Ensure menu closes on resize if screen becomes larger
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  // Initialize Scroll-Triggered Reveal Animations
  function initScrollReveal() {
    const selectors = [
      '.m-section-title-wrapper',
      '.m-about-intro',
      '.m-accordion',
      '.m-package-card',
      '.m-service-card',
      '.m-inquiry-form',
      '.m-checklist-item',
      '.m-contact-card',
      '.m-content-block'
    ];
    
    const elementsToReveal = [];
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.classList.add('m-reveal');
        elementsToReveal.push(el);
      });
    });

    // Apply staggered delays for grid items (like packages, services, checklist items)
    const lists = ['.m-packages-list', '.m-services-grid', '.m-checklist-grid', '.m-checklist', '.m-accordions'];
    lists.forEach(listSelector => {
      const list = document.querySelector(listSelector);
      if (list) {
        const children = list.querySelectorAll('.m-package-card, .m-service-card, .m-checklist-item, .m-accordion');
        children.forEach((child, index) => {
          const delay = (index % 3) * 0.1; // staggered delay: 0s, 0.1s, 0.2s
          child.style.transitionDelay = `${delay}s`;
        });
      }
    });

    // Setup IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('m-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      });

      elementsToReveal.forEach(el => observer.observe(el));
    } else {
      // Fallback
      elementsToReveal.forEach(el => el.classList.add('m-revealed'));
    }
  }

  // Initial Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  // Hook into Barba transition hook once window load finishes
  window.addEventListener('load', () => {
    initScrollReveal();
    if (window.barba && window.barba.hooks) {
      window.barba.hooks.afterEnter(() => {
        setTimeout(initScrollReveal, 100);
      });
    }
  });
})();
