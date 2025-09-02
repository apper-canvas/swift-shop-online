import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = productsData;
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.products];
  }

  async getById(id) {
    await this.delay();
    const product = this.products.find(p => p.Id === parseInt(id));
    return product ? { ...product } : null;
  }

  async getByCategory(category) {
    await this.delay();
    return this.products.filter(p => p.category === category).map(p => ({ ...p }));
  }

  async searchProducts(query) {
    await this.delay();
    if (!query) return [...this.products];
    
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    ).map(p => ({ ...p }));
  }

async getFeaturedProducts(limit = 12) {
    await this.delay();
    return this.products.slice(0, limit).map(p => ({ ...p }));
  }

  async getProductVariants(id) {
    await this.delay();
    const product = this.products.find(p => p.Id === parseInt(id));
    if (!product) return null;
    
    // Mock variant data - in real app this would come from database
    return {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Navy", value: "#1e3a8a" },
        { name: "Gray", value: "#6b7280" },
        { name: "White", value: "#ffffff" }
      ],
      images: [
        product.image,
        product.image,
        product.image,
        product.image
      ]
    };
  }

  async getCategories() {
    await this.delay();
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }

  async filterProducts({ searchQuery, category, sortBy, priceRange }) {
    await this.delay();
    
    let filtered = [...this.products];

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (category && category.trim()) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Apply price range filter
    if (priceRange && (priceRange.min > 0 || priceRange.max < 500)) {
      filtered = filtered.filter(p => 
        p.price >= priceRange.min && p.price <= priceRange.max
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Simulate newest by Id (higher Id = newer)
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      case 'popular':
      default:
        // Keep original order for "popular" (or shuffle for realism)
        break;
    }

    return filtered.map(p => ({ ...p }));
  }
}

export default new ProductService();