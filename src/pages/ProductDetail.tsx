import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, Product } from '@/data/products';
import { ShoppingBag, ChevronRight, Shirt, Package, ShoppingCart, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
      if (foundProduct?.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, selectedSize }, quantity);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const getCategoryIcon = () => {
    if (!product) return null;
    
    switch (product.category) {
      case 'tshirts':
        return <Shirt className="h-5 w-5" />;
      case 'pants':
        return <Package className="h-5 w-5" />;
      case 'shoes':
        return <ShoppingCart className="h-5 w-5" />;
      case 'socks':
        return <Footprints className="h-5 w-5" />;
    }
  };

  const getCategoryName = () => {
    if (!product) return '';
    
    switch (product.category) {
      case 'tshirts':
        return 'T-Shirts';
      case 'pants':
        return 'Pants';
      case 'shoes':
        return 'Shoes';
      case 'socks':
        return 'Socks';
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="page-container flex justify-center items-center min-h-[70vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to={`/products/${product.category}`} className="hover:text-primary flex items-center">
            <span className="mr-1">{getCategoryName()}</span>
            {getCategoryIcon()}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium truncate max-w-[150px]">{product.name}</span>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative pt-[100%]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  SALE
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-500 flex">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              <p className="text-gray-600">{product.brand} · {product.series}</p>
            </div>
            
            <div className="mb-6">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">NPR {product.price}</span>
                  <span className="text-lg text-gray-500 line-through">NPR {product.originalPrice}</span>
                  <span className="text-red-500 text-sm ml-2">
                    Save NPR {(product.originalPrice - product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">NPR {product.price}</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-8 flex items-end">
              <div className="mr-4 w-24">
                <label htmlFor="quantity" className="block text-sm text-gray-600 mb-1">
                  Quantity
                </label>
                <select 
                  id="quantity"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={handleAddToCart} 
                className="btn-primary flex-grow flex items-center justify-center"
                disabled={!product.inStock || (product.sizes && !selectedSize)}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Availability:</span>
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for specs, reviews, etc. */}
        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="divide-y divide-gray-200">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-3 flex justify-between">
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold mr-2">{product.rating}</span>
                    <div>
                      <div className="text-yellow-500 text-xl">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <p className="text-sm text-gray-500">Based on {product.reviewCount} reviews</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Reviews coming soon!</p>
                  <Button>Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
