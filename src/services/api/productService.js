class ProductService {
  constructor() {
    this.tableName = 'product_c';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch products:", response.message);
        return [];
      }
      
      // Transform database fields to component-expected format
      return (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      }));
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response?.data) {
        return null;
      }
      
      // Transform database fields to component-expected format
      const item = response.data;
      return {
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByCategory(category) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch products by category:", response.message);
        return [];
      }
      
      return (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      }));
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      return [];
    }
  }

  async searchProducts(query) {
    try {
      if (!query || !query.trim()) return await this.getAll();
      
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "title_c", "operator": "Contains", "values": [query.trim()]}
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {"fieldName": "category_c", "operator": "Contains", "values": [query.trim()]}
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {"fieldName": "description_c", "operator": "Contains", "values": [query.trim()]}
              ],
              "operator": "OR"
            }
          ]
        }],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to search products:", response.message);
        return [];
      }
      
      return (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      }));
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getFeaturedProducts(limit = 12) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch featured products:", response.message);
        return [];
      }
      
      return (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      }));
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getProductVariants(id) {
    // Mock variant data for UI compatibility - this would come from a variants table in real implementation
    const product = await this.getById(id);
    if (!product) return null;
    
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
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [{"field": {"Name": "category_c"}}],
        groupBy: ["category_c"],
        orderBy: [{"fieldName": "category_c", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch categories:", response.message);
        return [];
      }
      
      // Extract unique categories and sort them
      const categories = [...new Set((response.data || [])
        .map(item => item.category_c)
        .filter(cat => cat && cat.trim())
      )];
      
      return categories.sort();
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      return [];
    }
  }

  async filterProducts({ searchQuery, category, sortBy, priceRange }) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "image_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [],
        whereGroups: [],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      // Build where conditions
      const whereConditions = [];
      
      // Category filter
      if (category && category.trim()) {
        whereConditions.push({
          "FieldName": "category_c", 
          "Operator": "EqualTo", 
          "Values": [category]
        });
      }
      
      // Price range filter
      if (priceRange && (priceRange.min > 0 || priceRange.max < 500)) {
        if (priceRange.min > 0) {
          whereConditions.push({
            "FieldName": "price_c", 
            "Operator": "GreaterThanOrEqualTo", 
            "Values": [priceRange.min.toString()]
          });
        }
        if (priceRange.max < 500) {
          whereConditions.push({
            "FieldName": "price_c", 
            "Operator": "LessThanOrEqualTo", 
            "Values": [priceRange.max.toString()]
          });
        }
      }
      
      // Search query filter
      if (searchQuery && searchQuery.trim()) {
        params.whereGroups = [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "title_c", "operator": "Contains", "values": [searchQuery.trim()]}
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {"fieldName": "category_c", "operator": "Contains", "values": [searchQuery.trim()]}
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {"fieldName": "description_c", "operator": "Contains", "values": [searchQuery.trim()]}
              ],
              "operator": "OR"
            }
          ]
        }];
      }
      
      params.where = whereConditions;
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          params.orderBy = [{"fieldName": "price_c", "sorttype": "ASC"}];
          break;
        case 'price-high':
          params.orderBy = [{"fieldName": "price_c", "sorttype": "DESC"}];
          break;
        case 'newest':
          params.orderBy = [{"fieldName": "Id", "sorttype": "DESC"}];
          break;
        case 'popular':
        default:
          params.orderBy = [{"fieldName": "Id", "sorttype": "ASC"}];
          break;
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to filter products:", response.message);
        return [];
      }
      
      return (response.data || []).map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: parseFloat(item.price_c) || 0,
        image: item.image_c || '',
        category: item.category_c || '',
        inStock: item.in_stock_c || false,
        description: item.description_c || '',
        name: item.Name || '',
        tags: item.Tags || ''
      }));
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error);
      return [];
    }
  }
}

export default new ProductService();