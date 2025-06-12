import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/data/products';
import { useProductContext } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ProductsPage = () => {
  const { category } = useParams<{ category?: 'tshirts' | 'pants' | 'shoes' | 'socks' }>();
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const validCategory = category === 'tshirts' || category === 'pants' || category === 'shoes' || category === 'socks' ? category : undefined;
  
  // Update filtered products when products or category change
  useEffect(() => {
    let categoryProducts = products;
    if (validCategory) {
      categoryProducts = products.filter(p => p.category === validCategory);
    }
    setFilteredProducts(categoryProducts);
    
    // Find min/max price from products
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map(p => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, validCategory]);
  
  // Get unique brands from filtered products
  const brands = [...new Set(filteredProducts.map(p => p.brand))];
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...filteredProducts];
    
    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - sort by whether it's on sale
        result = result.sort((a, b) => {
          if (a.originalPrice && !b.originalPrice) return -1;
          if (!a.originalPrice && b.originalPrice) return 1;
          return 0;
        });
    }
    
    setDisplayedProducts(result);
  }, [filteredProducts, priceRange, selectedBrands, inStockOnly, sortBy]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  const getCategoryTitle = () => {
    switch (validCategory) {
      case 'tshirts':
        return 'T-Shirts';
      case 'pants':
        return 'Pants';
      case 'shoes':
        return 'Shoes';
      case 'socks':
        return 'Socks';
      default:
        return 'All Products';
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">{getCategoryTitle()}</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="font-semibold mb-4">Price Range (NPR)</h3>
              <div className="space-y-4">
                <Slider 
                  defaultValue={[priceRange[0], priceRange[1]]} 
                  min={0} 
                  max={6000} 
                  step={100} 
                  minStepsBetweenThumbs={1}
                  onValueChange={(values) => setPriceRange([values[0], values[1]])}
                />
                <div className="flex items-center justify-between">
                  <span>NPR {priceRange[0]}</span>
                  <span>NPR {priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Availability</h3>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="in-stock" 
                  checked={inStockOnly}
                  onCheckedChange={(value) => setInStockOnly(value as boolean)}
                />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{filteredProducts.length} products</p>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                <select 
                  id="sort"
                  className="text-sm border rounded-md p-1"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">No products match your filters</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductsPage;
