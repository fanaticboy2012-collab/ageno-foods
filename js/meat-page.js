// Meat Products Page Script
document.addEventListener("DOMContentLoaded", function () {
  renderMeatProducts();
  setupEventListeners();
});

function renderMeatProducts() {
  const productsGrid = document.getElementById("productsGrid");
  const meatProducts = products.filter((p) => p.category === "meat");

  if (meatProducts.length === 0) {
    productsGrid.innerHTML =
      '<p class="empty-message">No meat products available at the moment.</p>';
    return;
  }

  productsGrid.innerHTML = meatProducts
    .map(
      (product) => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
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
        <button class="order-now-btn" onclick="openContactModal()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
  // Mobile menu
  document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.add("active");
  });

  document.getElementById("closeMobileMenu").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("active");
  });

  document.getElementById("mobileMenu").addEventListener("click", (e) => {
    if (e.target.id === "mobileMenu") {
      document.getElementById("mobileMenu").classList.remove("active");
    }
  });

  // Contact modal
  document
    .getElementById("closeContactModal")
    .addEventListener("click", closeContactModal);
  document.getElementById("contactModal").addEventListener("click", (e) => {
    if (e.target.id === "contactModal") {
      closeContactModal();
    }
  });
}

function openContactModal() {
  document.getElementById("contactModal").classList.add("active");
}

function closeContactModal() {
  document.getElementById("contactModal").classList.remove("active");
}
