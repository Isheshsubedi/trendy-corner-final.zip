
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCartMessage: React.FC = () => {
  return (
    <div className="page-container flex justify-center items-center min-h-[70vh]">
      <div className="text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some products to your cart before checking out.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
