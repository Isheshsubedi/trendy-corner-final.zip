
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');

  // Find current quantity in cart for this product and selected size
  const currentCartItem = cartItems.find(item => item.id === product.id && item.selectedSize === selectedSize);
  const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize }, 1);
  };

  const handleIncreaseQuantity = () => {
    if (currentCartItem) {
      updateQuantity(product.id, currentQuantity + 1, selectedSize);
    } else {
      addToCart({ ...product, selectedSize }, 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentCartItem && currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1, selectedSize);
    } else if (currentCartItem && currentQuantity === 1) {
      updateQuantity(product.id, 0, selectedSize); // This will remove the item
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden relative">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-pulse h-full w-full bg-gray-200"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Image className="h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-500 absolute mt-16">Image not available</p>
            </div>
          ) : (
            <img 
              src={product.image} 
              alt={product.name}
              className={`object-cover w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold hover:text-primary transition-colors">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{product.brand} · {product.series}</p>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
        
        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Size:</p>
            <div className="flex gap-1 flex-wrap">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs border rounded ${
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
        
        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.originalPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold">NPR {product.price}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">NPR {product.originalPrice}</span>
              </div>
            ) : (
              <span className="text-lg font-bold">NPR {product.price}</span>
            )}
          </div>
          
          {currentQuantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecreaseQuantity}
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{currentQuantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          ) : (
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              variant="outline"
              className="text-primary hover:bg-primary hover:text-white"
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
