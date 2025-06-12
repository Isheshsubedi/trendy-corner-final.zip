
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // If user navigates directly to this page without placing an order, redirect to home
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate('/');
    }
  }, [cartItems.length, navigate]);

  return (
    <>
      <Navbar />
      
      <div className="page-container max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>
              <p className="text-gray-600">Order Number: <span className="font-semibold">{orderId}</span></p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Estimated Delivery</h3>
              <p className="text-gray-600">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
