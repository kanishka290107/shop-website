/**
 * BACCHOMAL COLLECTION - Premium Luxury & Multi-Brand Store
 * JavaScript Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Active Link Highlighting based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Product / Collection Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const itemCat = card.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Brand Filtering on Brands Page (if present)
  const brandSearch = document.getElementById('brandSearch');
  const brandCards = document.querySelectorAll('.brand-card');

  if (brandSearch && brandCards.length > 0) {
    brandSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      brandCards.forEach(card => {
        const brandName = card.querySelector('.brand-name')?.textContent.toLowerCase() || '';
        const brandDesc = card.querySelector('.brand-desc')?.textContent.toLowerCase() || '';
        const brandTags = card.querySelector('.brand-tags')?.textContent.toLowerCase() || '';

        if (brandName.includes(term) || brandDesc.includes(term) || brandTags.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 5. Quick Inquire Modal Functionality
  const modalOverlay = document.getElementById('inquiryModal');
  const modalClose = document.getElementById('modalClose');
  const inquireButtons = document.querySelectorAll('.btn-inquire');
  const modalItemTitle = document.getElementById('modalItemTitle');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  if (modalOverlay) {
    inquireButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const itemName = btn.getAttribute('data-item') || 'Selected Apparel';
        if (modalItemTitle) {
          modalItemTitle.textContent = itemName;
        }

        if (modalWhatsAppBtn) {
          const msg = encodeURIComponent(`Hello Bacchomal Collection, I am interested in inquiring about "${itemName}". Is this available in stock?`);
          modalWhatsAppBtn.setAttribute('href', `https://wa.me/919897315321?text=${msg}`);
        }

        modalOverlay.classList.add('active');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 6. Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const brandInterest = document.getElementById('brandInterest')?.value || '';
      const message = document.getElementById('message')?.value || '';

      // Client feedback
      if (formSuccess) {
        formSuccess.style.display = 'flex';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Optional WhatsApp forwarding if user wants direct conversation
      const sendWhatsApp = document.getElementById('sendToWhatsAppCheck');
      if (sendWhatsApp && sendWhatsApp.checked) {
        const textMsg = encodeURIComponent(
          `*New Inquiry from Website*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nBrand Interest: ${brandInterest}\nMessage: ${message}`
        );
        window.open(`https://wa.me/919897315321?text=${textMsg}`, '_blank');
      }

      contactForm.reset();

      setTimeout(() => {
        if (formSuccess) {
          formSuccess.style.display = 'none';
        }
      }, 7000);
    });
  }

  // 7. Header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
});
