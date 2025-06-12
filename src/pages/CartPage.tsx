
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  return (
    <>
      <Navbar />
      
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                      <div key={item.id} className="py-6 flex items-center">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="mt-1 text-sm text-gray-500">{item.brand} · {item.series}</p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">NPR {item.price}</p>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600 mr-2">
                                Qty:
                              </label>
                              <select
                                id={`quantity-${item.id}`}
                                value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10), item.selectedSize)}
                                className="rounded-md border border-gray-300 text-sm py-1 px-2"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="text-gray-500 hover:text-red-500 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span className="text-sm">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">NPR {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">NPR {(subtotal * 0.07).toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold">NPR {(subtotal + subtotal * 0.07).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link to="/checkout" className="flex items-center justify-center">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Have a promo code?</h3>
                  <div className="flex">
                    <Input 
                      type="text" 
                      placeholder="Enter code"
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default CartPage;
