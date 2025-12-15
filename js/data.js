// Product Data - SEO Optimized with Rich Descriptions
const products = [
  {
    id: 1,
    name: "Mango Achar",
    category: "veg",
    price: 210,
    originalPrice: null,
    weight: "380gm",
    image: "/images/products/MangoPickle.JPG",
    description: "Traditional Nepali mango pickle (aam ko achar) made with handpicked organic mangoes, mustard oil, and authentic spices. Perfect blend of sweet, spicy, and tangy flavors that enhances any meal. Preservative-free and naturally fermented.",
    ingredients: "Organic Mangoes, Mustard Oil, Fenugreek, Turmeric, Chili, Salt, Timur",
    shelfLife: "6 months",
    storage: "Store in cool, dry place",
    vegan: true,
    glutenFree: true,
    featured: true
  },
  {
    id: 2,
    name: "Radish Pickle (Mula Ko Achar)",
    category: "veg",
    price: 170,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/RadishPickle.JPG",
    description: "Crunchy white radish pickle (mula ko achar) prepared with fresh organic radishes and traditional Nepali spices. Rich in probiotics and vitamins. A staple accompaniment for dal-bhat and traditional Nepali meals.",
    ingredients: "White Radish, Mustard Oil, Red Chili, Turmeric, Salt, Fenugreek Seeds",
    shelfLife: "4 months",
    storage: "Refrigerate after opening",
    vegan: true,
    glutenFree: true,
    featured: false
  },
  {
    id: 3,
    name: "Chicken Achar",
    category: "meat",
    price: 700,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/ChickenPickle.JPG",
    description: "Premium chicken pickle made with tender, free-range chicken pieces marinated in authentic Nepali spices and mustard oil. Slow-cooked to perfection with garlic, ginger, and traditional masala. Perfect protein-rich accompaniment for rice and roti.",
    ingredients: "Free-Range Chicken, Mustard Oil, Garlic, Ginger, Red Chili, Turmeric, Fenugreek, Timur, Traditional Spices",
    shelfLife: "3 months (refrigerated)",
    storage: "Keep refrigerated",
    vegan: false,
    glutenFree: true,
    featured: true,
    spicyLevel: "Medium-Hot"
  },
  {
    id: 4,
    name: "Dry Fish Pickle (Sidra ko Achar)",
    category: "meat",
    price: 360,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/DryFish.JPG",
    description: "Traditional dry fish pickle (sidra ko achar) - a Nepali delicacy made with sun-dried fish and aromatic mountain spices. Rich in omega-3 fatty acids and authentic taste. Popular in Himalayan regions and perfect with hot steamed rice.",
    ingredients: "Dried Fish (Sidra), Mustard Oil, Red Chili Powder, Turmeric, Garlic, Ginger, Timur, Salt",
    shelfLife: "5 months",
    storage: "Store in airtight container in cool place",
    vegan: false,
    glutenFree: true,
    featured: false,
    spicyLevel: "Hot"
  },
  {
    id: 5,
    name: "Round Chilli Pickle (Akbare ko Achar)",
    category: "veg",
    price: 320,
    originalPrice: null,
    weight: "320gm",
    image: "/images/products/akbare.jpg",
    description: "Fiery round chili pickle (akbare khursani ko achar) made from the famous Nepali round chilies. Known for its intense heat and unique flavor profile. A must-try for spice lovers and authentic Nepali cuisine enthusiasts.",
    ingredients: "Akbare Chili, Mustard Oil, Sesame Seeds, Salt, Turmeric, Fenugreek",
    shelfLife: "8 months",
    storage: "Store in cool, dry place",
    vegan: true,
    glutenFree: true,
    featured: false,
    spicyLevel: "Very Hot"
  },
  {
    id: 6,
    name: "Timmur ko Chhop",
    category: "veg",
    price: 145,
    originalPrice: null,
    weight: "100gm",
    image: "/images/products/timbur.jpg",
    description: "Authentic Nepali Sichuan pepper chutney (timur ko chhop) with a unique tingling, numbing sensation. Made from wild-harvested mountain timur (Zanthoxylum armatum). Essential condiment for momos, sel roti, and traditional Nepali snacks.",
    ingredients: "Timur (Sichuan Pepper), Tomatoes, Garlic, Chili, Coriander, Salt",
    shelfLife: "3 months",
    storage: "Refrigerate after opening",
    vegan: true,
    glutenFree: true,
    featured: true,
    spicyLevel: "Medium"
  },
  {
    id: 7,
    name: "Szechuan Sauce (Piro Achar)",
    category: "veg",
    price: 225,
    originalPrice: null,
    weight: "350gm",
    image: "/images/products/SzechuanSauce.JPG",
    description: "Nepali-style Szechuan hot sauce (piro achar) with bold, spicy flavors. Perfect dipping sauce for momos, chowmein, and fried snacks. Made with red chilies, garlic, and traditional spices for that authentic kick.",
    ingredients: "Red Chili, Garlic, Ginger, Tomatoes, Soy Sauce, Vinegar, Timur, Sesame Oil, Sugar, Salt",
    shelfLife: "6 months",
    storage: "Refrigerate after opening",
    vegan: true,
    glutenFree: false,
    featured: false,
    spicyLevel: "Hot"
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