
import React from 'react';
import { CreditCard, Smartphone, DollarSign, Truck } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'esewa',
      name: 'eSewa',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Digital wallet payment'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Pay with your PayPal account'
    },
    {
      id: 'cash-on-delivery',
      name: 'Cash on Delivery',
      icon: <Truck className="h-6 w-6" />,
      description: 'Pay when your order arrives'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      <div className="grid gap-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-4 w-full">
              <div className={`${selectedMethod === method.id ? 'text-primary' : 'text-gray-500'}`}>
                {method.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
