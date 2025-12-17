// Product Data - SEO Optimized with Rich Descriptions
const products = [
  {
    id: 1,
    name: "Mango Achar",
    category: "veg",
    price: 210,
    originalPrice: null,
    weight: "380gm",
    image: "/images/products/MangoPickle.webp",
    shelfLife: "6 months",
    storage: "Store in cool, dry place",
  },
  {
    id: 2,
    name: "Radish Pickle (Mula Ko Achar)",
    category: "veg",
    price: 170,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/RadishPickle.webp",
    shelfLife: "4 months",
    storage: "Refrigerate after opening",
  },
  {
    id: 3,
    name: "Chicken Achar",
    category: "meat",
    price: 700,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/ChickenPickle.webp",
    shelfLife: "3 months (refrigerated)",
    storage: "Keep refrigerated",
  },
  {
    id: 4,
    name: "Dry Fish Pickle (Sidra ko Achar)",
    category: "meat",
    price: 160,
    originalPrice: null,
    weight: "150gm",
    image: "/images/products/DryFish.webp",
    shelfLife: "5 months",
    storage: "Store in airtight container in cool place",
  },
  {
    id: 5,
    name: "Round Chilli Pickle (Akbare ko Achar)",
    category: "veg",
    price: 320,
    originalPrice: null,
    weight: "320gm",
    image: "/images/products/akbare.webp",
    shelfLife: "8 months",
    storage: "Store in cool, dry place",
  },
  {
    id: 6,
    name: "Timmur ko Chhop",
    category: "veg",
    price: 145,
    originalPrice: null,
    weight: "100gm",
    image: "/images/products/timbur.webp",
    shelfLife: "3 months",
    storage: "Refrigerate after opening",
  },
  {
    id: 7,
    name: "Szechuan Sauce (Piro Achar)",
    category: "veg",
    price: 225,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/SzechuanSauce.webp",
    shelfLife: "6 months",
    storage: "Refrigerate after opening",
  }
];

// Product Categories for SEO
const categories = {
  meat: {
    name: "Meat Achars",
    description: "Premium non-vegetarian pickles including chicken, buff, and fish achar",
    seoTitle: "Meat Pickles & Non-Veg Achar | Chicken, Buff, Fish Pickle Nepal",
    keywords: ["meat achar", "chicken pickle", "buff achar", "fish pickle", "non-veg achar"]
  },
  veg: {
    name: "Veg Achars",
    description: "Fresh vegetable pickles made with organic ingredients",
    seoTitle: "Vegetable Pickles & Veg Achar | Mango, Radish, Dalle Pickle Nepal",
    keywords: ["veg achar", "mango pickle", "radish pickle", "dalle pickle", "vegetable achar"]
  }
};

// Featured products for homepage
const getFeaturedProducts = () => {
  return products.filter(product => product.featured === true);
};

// Get products by category
const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Get product by ID
const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Search products
const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.ingredients.toLowerCase().includes(searchTerm)
  );
};

// Generate product schema for SEO
const generateProductSchema = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": `https://agenofoods.com${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": "Ageno Foods"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "NPR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Ageno Foods"
      }
    },
    "weight": {
      "@type": "QuantitativeValue",
      "value": product.weight
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "45"
    }
  };
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    products,
    categories,
    getFeaturedProducts,
    getProductsByCategory,
    getProductById,
    searchProducts,
    generateProductSchema
  };
}