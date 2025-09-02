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

  async getCategories() {
    await this.delay();
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }
}

export default new ProductService();