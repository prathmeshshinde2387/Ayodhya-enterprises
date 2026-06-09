// ═══════════════════════════════════════════════════
//  APEX MOTORS - MAIN JAVASCRIPT
//  All interactive functionality
// ═══════════════════════════════════════════════════

(function() {
  'use strict';

  // ═══════════════════ DOM READY ═══════════════════
  document.addEventListener('DOMContentLoaded', function() {
    initCompanyData();
    initFeatures();
    initInventory();
    initTestimonials();
    initEMICalculator();
    initNavigation();
    initScrollEffects();
    initForms();
    initFilters();
  });

  // ═══════════════════ COMPANY DATA ═══════════════════
  function initCompanyData() {
    if (typeof COMPANY === 'undefined') return;

    // Update logo
    const logoText = document.getElementById('logoText');
    const footerLogo = document.getElementById('footerLogo');
    const footerCompany = document.getElementById('footerCompany');
    const heroTagline = document.getElementById('heroTagline');
    const footerTagline = document.getElementById('footerTagline');
    const estYear = document.getElementById('estYear');
    const footerYear = document.getElementById('footerYear');
    const navPhone = document.getElementById('navPhone');
    const contactAddress = document.getElementById('contactAddress');
    const contactPhone = document.getElementById('contactPhone');
    const contactEmail = document.getElementById('contactEmail');

    if (logoText) logoText.textContent = COMPANY.logoText || COMPANY.name;
    if (footerLogo) footerLogo.textContent = COMPANY.name;
    if (footerCompany) footerCompany.textContent = COMPANY.name;
    if (heroTagline) heroTagline.textContent = COMPANY.tagline;
    if (footerTagline) footerTagline.textContent = COMPANY.tagline;
    if (estYear) estYear.textContent = COMPANY.established;
    if (footerYear) footerYear.textContent = new Date().getFullYear();
    if (navPhone) {
      navPhone.href = 'tel:' + COMPANY.phone.replace(/\s/g, '');
      navPhone.innerHTML = '<i class="fas fa-phone"></i> ' + COMPANY.phone;
    }
    if (contactAddress) contactAddress.textContent = COMPANY.address;
    if (contactPhone) contactPhone.textContent = COMPANY.phone;
    if (contactEmail) contactEmail.textContent = COMPANY.email;

    // Social links
    const fb = document.getElementById('socialFacebook');
    const ig = document.getElementById('socialInstagram');
    const wa = document.getElementById('socialWhatsapp');
    if (fb) fb.href = COMPANY.facebook || '#';
    if (ig) ig.href = COMPANY.instagram || '#';
    if (wa) wa.href = COMPANY.whatsapp || '#';

    // Update page title
    document.title = COMPANY.name + ' - Multi-Brand Car Showroom';
  }

  // ═══════════════════ FEATURES ═══════════════════
  function initFeatures() {
    if (typeof KEY_FEATURES === 'undefined') return;
    const grid = document.getElementById('featuresGrid');
    if (!grid) return;

    grid.innerHTML = KEY_FEATURES.map((feature, index) => `
      <div class="feature-card" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both">
        <div class="feature-icon">
          <i class="fas ${feature.icon}"></i>
        </div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
        <span class="feature-highlight">${feature.highlight}</span>
      </div>
    `).join('');
  }

  // ═══════════════════ INVENTORY ═══════════════════
  let currentInventory = [];
  let currentFilter = 'all';
  let currentSort = 'default';

  function initInventory() {
    if (typeof INVENTORY === 'undefined') return;
    currentInventory = [...INVENTORY];
    renderInventory();
  }

  function renderInventory() {
    const grid = document.getElementById('carGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;

    let filtered = currentInventory;

    // Apply filter
    if (currentFilter !== 'all') {
      if (currentFilter === 'featured') {
        filtered = filtered.filter(car => car.featured);
      } else {
        filtered = filtered.filter(car => car.brand === currentFilter);
      }
    }

    // Apply sort
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'brand') {
      filtered.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = filtered.map((car, index) => {
      const emi = calculateEMI(car.price * 0.9, 9.5, 60);
      return `
        <div class="car-card" style="animation: fadeInUp 0.5s ease ${index * 0.08}s both">
          <div class="car-image">
            <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
            <div class="car-badges">
              ${car.featured ? '<span class="car-badge badge-featured"><i class="fas fa-star"></i> Featured</span>' : ''}
              ${car.tags.map(tag => `<span class="car-badge badge-tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="car-info">
            <div class="car-brand">${car.brand}</div>
            <div class="car-model">${car.model}</div>
            <div class="car-year">${car.year} Model</div>
            <div class="car-specs">
              <div class="car-spec">
                <i class="fas fa-gas-pump"></i>
                <span>Fuel</span>
                <strong>${car.fuel}</strong>
              </div>
              <div class="car-spec">
                <i class="fas fa-cog"></i>
                <span>Transmission</span>
                <strong>${car.transmission}</strong>
              </div>
              <div class="car-spec">
                <i class="fas fa-tachometer-alt"></i>
                <span>Mileage</span>
                <strong>${car.mileage}</strong>
              </div>
            </div>
            <div class="car-price-row">
              <div class="car-price">
                ₹${formatPrice(car.price)}
                <em>Onwards</em>
              </div>
              <div class="car-emi">
                <i class="fas fa-wallet"></i> EMI ₹${emi}/mo
              </div>
            </div>
            <div class="car-actions">
              <button class="btn btn-primary" onclick="showCarDetails(${car.id})">
                <i class="fas fa-info-circle"></i> Details
              </button>
              <a href="#contact" class="btn btn-secondary">
                <i class="fas fa-phone"></i> Enquire
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function initFilters() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderInventory();
      });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderInventory();
      });
    }
  }

  // ═══════════════════ EMI CALCULATOR ═══════════════════
  function initEMICalculator() {
    const carPrice = document.getElementById('carPrice');
    const carPriceRange = document.getElementById('carPriceRange');
    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');
    const interestRate = document.getElementById('interestRate');
    const loanTenure = document.getElementById('loanTenure');
    const calculateBtn = document.getElementById('calculateEmi');
    const downPercent = document.getElementById('downPercent');

    if (!carPrice) return;

    // Sync range and number inputs
    function syncInputs(numberInput, rangeInput) {
      numberInput.addEventListener('input', () => {
        rangeInput.value = numberInput.value;
        updateDownPercent();
      });
      rangeInput.addEventListener('input', () => {
        numberInput.value = rangeInput.value;
        updateDownPercent();
      });
    }

    syncInputs(carPrice, carPriceRange);
    syncInputs(downPayment, downPaymentRange);

    function updateDownPercent() {
      const price = parseFloat(carPrice.value) || 0;
      const down = parseFloat(downPayment.value) || 0;
      const percent = price > 0 ? ((down / price) * 100).toFixed(1) : 0;
      downPercent.textContent = percent + '% of car price';

      // Validate minimum down payment
      const minDown = price * 0.1;
      if (down < minDown) {
        downPercent.style.color = '#e94560';
        downPercent.textContent += ' (Min 10% required)';
      } else {
        downPercent.style.color = '#6c757d';
      }
    }

    updateDownPercent();

    // Calculate on button click
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateAndShowEMI);
    }

    // Also calculate on any input change (for real-time feel)
    [carPrice, downPayment, interestRate, loanTenure].forEach(el => {
      if (el) el.addEventListener('change', calculateAndShowEMI);
    });

    // Initial calculation
    calculateAndShowEMI();
  }

  function calculateAndShowEMI() {
    const carPrice = parseFloat(document.getElementById('carPrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 9.5;
    const loanTenure = parseInt(document.getElementById('loanTenure').value) || 60;

    // Validate minimum down payment
    const minDown = carPrice * 0.1;
    let finalDownPayment = downPayment;
    if (downPayment < minDown) {
      finalDownPayment = minDown;
      document.getElementById('downPayment').value = Math.round(minDown);
      document.getElementById('downPaymentRange').value = Math.round(minDown);
    }

    const loanAmount = carPrice - finalDownPayment;
    const processingFee = loanAmount * 0.02;
    const emi = calculateEMI(loanAmount, interestRate, loanTenure);
    const totalPayment = emi * loanTenure;
    const totalInterest = totalPayment - loanAmount;

    // Update display
    document.getElementById('loanAmount').textContent = '₹' + formatPrice(loanAmount);
    document.getElementById('processingFee').textContent = '₹' + formatPrice(processingFee);
    document.getElementById('emiAmount').textContent = '₹' + formatPrice(emi);
    document.getElementById('totalInterest').textContent = '₹' + formatPrice(totalInterest);
    document.getElementById('totalPayment').textContent = '₹' + formatPrice(totalPayment + processingFee);

    // Show result
    document.getElementById('emiResult').classList.add('active');

    // Draw chart
    drawEMIChart(loanAmount, totalInterest);

    // Update down percent text
    const percent = ((finalDownPayment / carPrice) * 100).toFixed(1);
    document.getElementById('downPercent').textContent = percent + '% of car price';
  }

  function calculateEMI(principal, annualRate, months) {
    if (principal <= 0 || months <= 0) return 0;
    const monthlyRate = annualRate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  }

  function drawEMIChart(principal, interest) {
    const canvas = document.getElementById('emiChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const total = principal + interest;
    const principalAngle = (principal / total) * 2 * Math.PI;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw principal arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + principalAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#d4af37';
    ctx.stroke();

    // Draw interest arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2 + principalAngle, -Math.PI / 2 + 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#e94560';
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 14px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Principal', centerX, centerY - 8);
    ctx.font = '12px Poppins';
    ctx.fillStyle = '#6c757d';
    ctx.fillText(Math.round((principal / total) * 100) + '%', centerX, centerY + 12);
  }

  // ═══════════════════ TESTIMONIALS ═══════════════════
  function initTestimonials() {
    if (typeof TESTIMONIALS === 'undefined') return;
    const grid = document.getElementById('testimonialGrid');
    if (!grid) return;

    grid.innerHTML = TESTIMONIALS.map((t, i) => {
      const stars = Array(t.rating).fill('<i class="fas fa-star"></i>').join('');
      const initials = t.name.split(' ').map(n => n[0]).join('');
      return `
        <div class="testimonial-card" style="animation: fadeInUp 0.6s ease ${i * 0.15}s both">
          <div class="testimonial-stars">${stars}</div>
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${initials}</div>
            <div>
              <div class="testimonial-name">${t.name}</div>
              <div class="testimonial-location"><i class="fas fa-map-marker-alt"></i> ${t.location}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ═══════════════════ NAVIGATION ═══════════════════
  function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      });

      // Close menu on link click
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        });
      });
    }
  }

  // ═══════════════════ SCROLL EFFECTS ═══════════════════
  function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
  }

  // ═══════════════════ FORMS ═══════════════════
  function initForms() {
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
      enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you! Your enquiry has been submitted. We will contact you shortly.', 'success');
        this.reset();
      });
    }

    const exchangeForm = document.getElementById('exchangeForm');
    if (exchangeForm) {
      exchangeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeExchangeModal();
        showNotification('Exchange valuation request submitted! Our team will contact you within 24 hours.', 'success');
        this.reset();
      });
    }
  }

  // ═══════════════════ MODALS ═══════════════════
  window.showCarDetails = function(carId) {
    if (typeof INVENTORY === 'undefined') return;
    const car = INVENTORY.find(c => c.id === carId);
    if (!car) return;

    const emi = calculateEMI(car.price * 0.9, 9.5, 60);
    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
      <img class="modal-car-image" src="${car.image}" alt="${car.brand} ${car.model}">
      <div class="modal-car-header">
        <div class="modal-car-title">
          <h2>${car.brand} ${car.model}</h2>
          <span>${car.year} Model | ${car.seats} Seater | ${car.fuel}</span>
        </div>
        <div class="modal-car-price">
          <div class="price">₹${formatPrice(car.price)}</div>
          <div class="emi"><i class="fas fa-wallet"></i> EMI from ₹${emi}/month</div>
        </div>
      </div>
      <div class="modal-car-specs">
        <div class="modal-spec-item">
          <i class="fas fa-gas-pump"></i>
          <strong>${car.fuel}</strong>
          <span>Fuel Type</span>
        </div>
        <div class="modal-spec-item">
          <i class="fas fa-cog"></i>
          <strong>${car.transmission}</strong>
          <span>Transmission</span>
        </div>
        <div class="modal-spec-item">
          <i class="fas fa-tachometer-alt"></i>
          <strong>${car.mileage}</strong>
          <span>Mileage</span>
        </div>
        <div class="modal-spec-item">
          <i class="fas fa-users"></i>
          <strong>${car.seats} Seats</strong>
          <span>Capacity</span>
        </div>
        <div class="modal-spec-item">
          <i class="fas fa-calendar"></i>
          <strong>${car.year}</strong>
          <span>Year</span>
        </div>
        <div class="modal-spec-item">
          <i class="fas fa-tag"></i>
          <strong>${car.tags.join(', ')}</strong>
          <span>Tags</span>
        </div>
      </div>
      <div class="modal-car-actions">
        <a href="#emi-calculator" class="btn btn-primary" onclick="closeCarModal(); setCarPrice(${car.price})">
          <i class="fas fa-calculator"></i> Calculate EMI
        </a>
        <a href="#contact" class="btn btn-secondary" onclick="closeCarModal()">
          <i class="fas fa-phone"></i> Book Test Drive
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCarModal = function() {
    const modal = document.getElementById('carModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.showExchangeModal = function() {
    const modal = document.getElementById('exchangeModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeExchangeModal = function() {
    const modal = document.getElementById('exchangeModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.showGovModal = function() {
    const modal = document.getElementById('govModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeGovModal = function() {
    const modal = document.getElementById('govModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.setCarPrice = function(price) {
    const carPriceInput = document.getElementById('carPrice');
    const carPriceRange = document.getElementById('carPriceRange');
    if (carPriceInput) carPriceInput.value = price;
    if (carPriceRange) carPriceRange.value = price;
    // Trigger calculation
    setTimeout(calculateAndShowEMI, 100);
  };

  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close button for car modal
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', closeCarModal);
  }

  // ═══════════════════ NOTIFICATION ═══════════════════
  function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      background: ${type === 'success' ? '#28a745' : '#e94560'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      z-index: 3000;
      animation: slideInRight 0.4s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  }

  // ═══════════════════ UTILITIES ═══════════════════
  function formatPrice(price) {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + ' Cr';
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + ' Lakh';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1) + ' K';
    }
    return price.toString();
  }

  // Add keyframe animations for notifications
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

})();
