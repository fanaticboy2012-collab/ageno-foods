// Main Application Logic for Homepage - COMPLETE FIXED VERSION
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

function initializePage() {
  try {
    renderProducts();
    setupEventListeners();
    injectProductSchemas();
    console.log('Homepage initialized successfully');
  } catch (error) {
    console.error('Error initializing page:', error);
    displayErrorMessage();
  }
}

// Render all products on homepage
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");

  // Error handling
  if (!productsGrid) {
    console.error('Products grid element not found');
    return;
  }

  if (typeof products === 'undefined' || !Array.isArray(products)) {
    productsGrid.innerHTML = `
      <div class="error-message" style="text-align: center; padding: 3rem; grid-column: 1/-1;">
        <p style="color: var(--text-gray); font-size: 1.125rem;">
          Unable to load products. Please <a href="javascript:location.reload()" style="color: var(--primary-color); text-decoration: underline;">refresh the page</a>.
        </p>
      </div>
    `;
    console.error('Products data not available');
    return;
  }

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-message" style="text-align: center; padding: 3rem; grid-column: 1/-1;">
        <p style="color: var(--text-gray); font-size: 1.125rem;">No products available at the moment. Check back soon!</p>
      </div>
    `;
    return;
  }

  // Show loading state
  productsGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1;"></div>';

  // Simulate brief loading for smooth transition
  setTimeout(() => {
    productsGrid.innerHTML = products
      .map(
        (product) => `
      <article class="product-card" role="listitem" itemscope itemtype="https://schema.org/Product">
        <div class="product-image-container">
          <img 
            src="${product.image}" 
            alt="${product.name}${product.description ? ' - ' + product.description.substring(0, 100) : ''}" 
            class="product-image"
            loading="lazy"
            width="280"
            height="256"
            decoding="async"
            itemprop="image"
          >
          ${product.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
          ${product.vegan ? '<span class="badge badge-vegan">Vegan</span>' : ''}
        </div>
        <div class="product-content">
          <h3 class="product-name" itemprop="name">${product.name}</h3>
          <p class="product-weight" itemprop="weight">${product.weight}</p>
          ${product.description ? `<p class="product-description" itemprop="description">${truncateText(product.description, 80)}</p>` : ''}
          <div class="product-price-container" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="product-price" itemprop="price" content="${product.price}">Rs ${product.price}</span>
            <meta itemprop="priceCurrency" content="NPR">
            <link itemprop="availability" href="https://schema.org/InStock">
            ${
              product.originalPrice
                ? `<span class="product-original-price">Rs ${product.originalPrice}</span>`
                : ""
            }
          </div>
          <button 
            class="order-now-btn" 
            onclick="openContactModal('${product.name}')" 
            aria-label="Order ${product.name}"
            data-product-id="${product.id}"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Order Now
          </button>
        </div>
        <meta itemprop="brand" content="Ageno Foods">
      </article>
    `
      )
      .join("");

    // Add animation class after render
    const productCards = productsGrid.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      }, index * 50);
    });
  }, 100);
}

// Truncate text for descriptions
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Inject product schemas into page for SEO
function injectProductSchemas() {
  if (typeof generateProductSchema !== 'function' || typeof products === 'undefined') {
    return;
  }

  products.forEach(product => {
    const schema = generateProductSchema(product);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = 'hidden'; // Prevent scroll
      trapFocus(mobileMenu);
    });
  }

  if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener("click", () => {
      closeMobileMenu();
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.id === "mobileMenu") {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    mobileMenu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });
  }

  // Hero shop button
  const heroShopBtn = document.getElementById("heroShopBtn");
  if (heroShopBtn) {
    heroShopBtn.addEventListener("click", () => {
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth" });
        // Focus first product for accessibility
        setTimeout(() => {
          const firstProduct = document.querySelector('.product-card .order-now-btn');
          if (firstProduct) firstProduct.focus();
        }, 500);
      }
    });
  }

  // Contact modal
  const closeContactModalBtn = document.getElementById("closeContactModal");
  const contactModal = document.getElementById("contactModal");

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener("click", closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener("click", (e) => {
      if (e.target.id === "contactModal") {
        closeContactModal();
      }
    });

    // Close on Escape key
    contactModal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeContactModal();
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "#!") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update URL without page jump
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Logo click handler
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// Close mobile menu
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  
  if (mobileMenu) {
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ''; // Restore scroll
  }
  
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.focus(); // Return focus
  }
}

// Contact modal functions
function openContactModal(productName = '') {
  const modal = document.getElementById("contactModal");

  if (!modal) {
    console.error('Contact modal not found');
    return;
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-open');

  // Update WhatsApp link with product name
  if (productName) {
    const whatsappLink = modal.querySelector('a[href*="wa.me"]');
    if (whatsappLink) {
      const baseUrl = 'https://wa.me/9779761285450';
      const message = encodeURIComponent(`Hello! I would like to order ${productName}`);
      whatsappLink.href = `${baseUrl}?text=${message}`;
    }
  }

  // Trap focus in modal
  trapFocus(modal);

  // Focus first focusable element
  setTimeout(() => {
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, 100);

  // Track modal open event (for analytics)
  if (typeof gtag === 'function') {
    gtag('event', 'modal_open', {
      'event_category': 'engagement',
      'event_label': productName || 'general'
    });
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");

  if (!modal) {
    console.error('Contact modal not found');
    return;
  }

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-open');
}

// Accessibility helper: Trap focus within element
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTab = function (e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTab);
}

// Display error message
function displayErrorMessage() {
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    productsGrid.innerHTML = `
      <div class="error-message" style="text-align: center; padding: 3rem; grid-column: 1/-1; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
        <h3 style="color: #991b1b; margin-bottom: 1rem;">Oops! Something went wrong</h3>
        <p style="color: #7f1d1d; margin-bottom: 1.5rem;">We're having trouble loading the products. Please try refreshing the page.</p>
        <button onclick="location.reload()" class="btn btn-primary">Refresh Page</button>
      </div>
    `;
  }
}

// Log successful initialization
console.log('Ageno Foods - Main script loaded successfully');
console.log(`Products available: ${typeof products !== 'undefined' ? products.length : 0}`);