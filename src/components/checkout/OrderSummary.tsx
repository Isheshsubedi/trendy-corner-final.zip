
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, subtotal }) => {
  const deliveryCharge = subtotal >= 3000 ? 0 : 100; // Free delivery above NPR 3000
  const tax = subtotal * 0.13; // VAT 13% as per Nepal tax system
  const totalAmount = subtotal + deliveryCharge + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="max-h-80 overflow-y-auto mb-4">
        {cartItems.map(item => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex items-center py-3 border-b border-gray-200 last:border-0">
            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-3 flex-grow">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <p className="text-xs text-gray-500">
                Qty: {item.quantity}
                {item.selectedSize && ` | Size: ${item.selectedSize}`}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">NPR {(item.price * item.quantity).toFixed(0)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">NPR {subtotal.toFixed(0)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>
          <span className="font-medium">
            {deliveryCharge === 0 ? 'Free' : `NPR ${deliveryCharge}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">VAT (13%)</span>
          <span className="font-medium">NPR {tax.toFixed(0)}</span>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold">NPR {totalAmount.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
