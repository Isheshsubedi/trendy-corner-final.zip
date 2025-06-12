
import { AlertCircle, Truck } from 'lucide-react';

const CashOnDelivery: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Truck className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="font-semibold text-blue-800">Cash on Delivery Selected</h3>
          <p className="text-sm text-blue-600">You will pay when your order is delivered to your doorstep.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Important Information</h4>
            <ul className="text-sm text-amber-700 mt-2 space-y-1">
              <li>• Please have the exact amount ready for payment</li>
              <li>• Orders are typically delivered within 3-5 business days</li>
              <li>• A delivery charge of NPR 100 may apply</li>
              <li>• Please inspect your items before making payment</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Delivery Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Available in Kathmandu Valley and major cities</p>
            <p>• Free delivery for orders above NPR 3000</p>
            <p>• Contact number must be provided for delivery coordination</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
