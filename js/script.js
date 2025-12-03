// ========================================
// IMAGE GALLERY - Change main image on thumbnail click
// ========================================
function changeImage(thumbnail) {
  // Get the main image element
  const mainImage = document.getElementById("mainImage");

  // Change main image source to clicked thumbnail
  mainImage.src = thumbnail.src;

  // Remove active class from all thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));

  // Add active class to clicked thumbnail
  thumbnail.classList.add("active");
}

// ========================================
// QUANTITY CONTROLS
// ========================================
function increaseQty() {
  const qtyInput = document.getElementById("quantity");
  if (!qtyInput) return;
  let currentValue = parseInt(qtyInput.value) || 0;
  const maxValue = parseInt(qtyInput.max) || Infinity;

  if (currentValue < maxValue) {
    qtyInput.value = currentValue + 1;
  }
}

function decreaseQty() {
  const qtyInput = document.getElementById("quantity");
  if (!qtyInput) return;
  let currentValue = parseInt(qtyInput.value) || 0;
  const minValue = parseInt(qtyInput.min) || 0;

  if (currentValue > minValue) {
    qtyInput.value = currentValue - 1;
  }
}

// ========================================
// SIZE/WEIGHT SELECTION
// ========================================
const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    sizeButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    // Update price based on selected size
    const newPrice = this.getAttribute("data-price");
    document.querySelector(".current-price").textContent = `NPR ${newPrice}`;
  });
});

// Cart functionality removed — project configured without cart or search features.

// ========================================
// PRODUCT DETAILS TABS
// ========================================
function openTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show selected tab content
  document.getElementById(tabName).classList.add("active");

  // Add active class to clicked button
  event.currentTarget.classList.add("active");
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animate hamburger to X
    this.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (navMenu) {
      navMenu.classList.remove("active");
    }
    if (hamburger) {
      hamburger.classList.remove("active");
    }
  });
});

// Related-products "add to cart" listeners removed since cart is disabled.

// (smooth scrolling is handled in the enhanced section later in this file)

// ========================================
// IMAGE ZOOM ON HOVER (Optional Enhancement)
// ========================================
const mainImage = document.querySelector(".main-image img");

if (mainImage) {
  mainImage.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  });

  mainImage.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.5)";
    this.style.cursor = "zoom-in";
  });

  mainImage.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
}

// ========================================
// PAGE LOAD ANIMATION
// ========================================
window.addEventListener("load", function () {
  console.log("✓ Ageno Foods - Product page loaded successfully!");
  console.log("All interactive features are ready.");
});

// ========================================
// FORM VALIDATION (for future contact forms)
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Cart localStorage helpers removed.

// Homepage cart helpers removed.

// CATEGORY FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card-home");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    // Get category to filter
    const category = this.getAttribute("data-category");

    // Filter products
    productCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        // Add fade-in animation
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });

    console.log("Filtered by category:", category);
  });
});

// SEARCH (header) - interactive product filtering
const searchForm = document.querySelector(".search-form");
const searchInput = searchForm
  ? searchForm.querySelector("#site-search")
  : null;
const searchClearBtn = searchForm
  ? searchForm.querySelector(".search-clear-btn")
  : null;
const searchToggleBtn = document.querySelector(".search-toggle-btn");
const searchNoResults = document.getElementById("search-no-results");

// Get query param if page was redirected from products.html with ?q=...
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function debounce(fn, delay = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function filterProducts(query) {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!productCards || productCards.length === 0) return;

  let foundCount = 0;

  if (!q) {
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    if (searchClearBtn) searchClearBtn.hidden = true;
    if (searchNoResults) searchNoResults.hidden = true;
    return;
  }

  productCards.forEach((card) => {
    const titleEl = card.querySelector("h3");
    const descEl = card.querySelector(".product-desc");
    const title = titleEl ? titleEl.textContent.toLowerCase() : "";
    const desc = descEl ? descEl.textContent.toLowerCase() : "";
    if (title.includes(q) || desc.includes(q)) {
      card.style.display = "block";
      card.style.animation = "fadeInUp 0.5s ease";
      foundCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (searchClearBtn) searchClearBtn.hidden = false;

  // Show no-results message if nothing matched
  if (searchNoResults) {
    searchNoResults.hidden = foundCount > 0;
  }
}

// Mobile search toggle
if (searchToggleBtn) {
  searchToggleBtn.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    if (searchForm) {
      searchForm.classList.toggle("active");
      if (!isExpanded && searchInput) {
        searchInput.focus();
      }
    }
  });
}

if (searchInput) {
  const debounced = debounce((e) => filterProducts(e.target.value), 150);
  searchInput.addEventListener("input", debounced);

  // Always redirect to products.html with query param when searching
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `products.html?q=${encodeURIComponent(query)}`;
    }
  });

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", function () {
      searchInput.value = "";
      filterProducts("");
      this.hidden = true;
      searchInput.focus();
    });
  }
}

// If redirected to products.html with ?q=..., run search on page load
window.addEventListener("load", function () {
  const queryParam = getQueryParam("q");
  if (queryParam && searchInput && productCards && productCards.length > 0) {
    searchInput.value = queryParam;
    filterProducts(queryParam);
    if (searchClearBtn) searchClearBtn.hidden = false;
  }
});

// NEWSLETTER SUBSCRIPTION
function subscribeNewsletter(event) {
  event.preventDefault();

  const emailInput = event.target.querySelector('input[type="email"]');
  const email = emailInput.value;

  // In real app, send to backend
  console.log("Newsletter subscription:", email);

  // Show success message
  alert(
    `✓ Thank you for subscribing!\n\nWe've added ${email} to our newsletter.\n\nYou'll receive exclusive offers and updates about new products.`
  );

  // Clear input
  emailInput.value = "";

  // Save to localStorage (in real app, send to backend)
  const subscribers =
    JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];
  subscribers.push({
    email: email,
    date: new Date().toISOString(),
  });
  localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
}

// CONTACT FORM SUBMISSION
function submitContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    subject: form.querySelectorAll('input[type="text"]')[1].value,
    message: form.querySelector("textarea").value,
    timestamp: new Date().toISOString(),
  };

  // In real app, send to backend
  console.log("Contact form submitted:", formData);

  // Show success message
  alert(
    `✓ Message Sent Successfully!\n\nThank you ${formData.name}!\n\nWe've received your message and will get back to you within 24 hours at ${formData.email}.`
  );

  // Clear form
  form.reset();

  // Save to localStorage (in real app, send to backend)
  const contacts = JSON.parse(localStorage.getItem("contactMessages")) || [];
  contacts.push(formData);
  localStorage.setItem("contactMessages", JSON.stringify(contacts));
}

// SMOOTH SCROLL TO SECTIONS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if it's just "#"
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    // Only scroll if target exists
    if (target) {
      e.preventDefault();

      // Close mobile menu if open
      const navMenu = document.querySelector(".nav-menu");
      const hamburger = document.querySelector(".hamburger");
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }

      // Smooth scroll to target
      const headerHeight = 70; // Height of fixed header
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ACTIVE NAV LINK ON SCROLL
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// ANIMATE ELEMENTS ON SCROLL
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements when page loads
window.addEventListener("load", function () {
  const elementsToAnimate = document.querySelectorAll(
    ".product-card-home, .feature-item, .testimonial-card"
  );

  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  console.log("✓ Ageno Foods Homepage loaded successfully!");
});

// PRODUCT QUICK VIEW (for future implementation)
function quickView(productName) {
  alert(
    `Quick view for: ${productName}\n\nThis feature will open a modal with product details.`
  );
  console.log("Quick view:", productName);
}

// Search functionality removed per request.

// Cart UI/logic removed.

// Cart updates on DOMContentLoaded removed.

// THUMBNAIL CLICK HANDLERS (attach listeners rather than inline onclick)
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    // avoid adding duplicate listeners
    if (!thumb.dataset.listenerAttached) {
      thumb.addEventListener("click", function () {
        changeImage(this);
      });
      thumb.dataset.listenerAttached = "true";
    }
  });
});

// SHOW LOADING ANIMATION WHEN NAVIGATING
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only show loading for page navigation (not anchors)
    if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
      console.log("Navigating to:", href);
    }
  });
});

// CONSOLE WELCOME MESSAGE
console.log(
  "%c Welcome to Ageno Foods! ",
  "background: #2d6a4f; color: white; font-size: 20px; padding: 10px;"
);
console.log(
  "%c Authentic Homemade Pickles & Sauces ",
  "color: #2d6a4f; font-size: 14px;"
);
console.log("");
console.log("📦 Products available:", productCards.length);
console.log("");
