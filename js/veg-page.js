// Veg Products Page Script - FIXED VERSION with Error Handling
document.addEventListener("DOMContentLoaded", function () {
  renderVegProducts();
  setupEventListeners();
});

function renderVegProducts() {
  const productsGrid = document.getElementById("productsGrid");

  // Error handling: Check if element exists
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  // Error handling: Check if products data is available
  if (typeof products === "undefined" || !Array.isArray(products)) {
    productsGrid.innerHTML = `
      <div class="error-message" style="text-align: center; padding: 2rem; grid-column: 1/-1;">
        <p style="color: var(--text-gray); font-size: 1.125rem;">Unable to load products. Please refresh the page.</p>
      </div>
    `;
    console.error("Products data not available");
    return;
  }

  const vegProducts = products.filter((p) => p.category === "veg");

  if (vegProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-message" style="text-align: center; padding: 2rem; grid-column: 1/-1;">
        <p style="color: var(--text-gray); font-size: 1.125rem;">No vegetable products available at the moment.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = vegProducts
    .map(
      (product) => `
    <div class="product-card">
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${product.name}${
        product.description
          ? " - " + product.description
          : " - Authentic Nepali homemade pickle"
      }" 
          class="product-image"
          loading="lazy"
          width="280"
          height="256"
          decoding="async"
        >
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-weight">${product.weight}</p>
        <div class="product-price-container">
          <span class="product-price">Rs ${product.price}</span>
          ${
            product.originalPrice
              ? `<span class="product-original-price">Rs ${product.originalPrice}</span>`
              : ""
          }
        </div>
        <button class="order-now-btn" onclick="openContactModal()" aria-label="Order ${
          product.name
        }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Order Now
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

function setupEventListeners() {
  // Mobile menu with error handling
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      // Trap focus in mobile menu
      trapFocus(mobileMenu);
    });
  } else {
    console.warn("Mobile menu elements not found");
  }

  if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.focus(); // Return focus to menu button
      }
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.id === "mobileMenu") {
        mobileMenu.classList.remove("active");
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.focus();
        }
      }
    });

    // Close on Escape key
    mobileMenu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        mobileMenu.classList.remove("active");
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.focus();
        }
      }
    });
  }

  // Contact modal with error handling
  const closeContactModalBtn = document.getElementById("closeContactModal");
  const contactModal = document.getElementById("contactModal");

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener("click", closeContactModal);
  } else {
    console.warn("Close contact modal button not found");
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
}

function openContactModal() {
  const modal = document.getElementById("contactModal");

  if (!modal) {
    console.error("Contact modal not found");
    return;
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  // Trap focus in modal
  trapFocus(modal);

  // Focus first focusable element
  const firstFocusable = modal.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");

  if (!modal) {
    console.error("Contact modal not found");
    return;
  }

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

// Accessibility helper: Trap focus within element
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;

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
  });
}

// Log successful initialization
console.log("Veg page initialized successfully");
