
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface PaypalPaymentProps {
  stage: 'input' | 'authorize' | 'confirmed';
  formData: {
    paypalEmail: string;
    paypalPassword: string;
  };
  totalAmount: number;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleConfirm: () => void;
}

const PaypalPayment: React.FC<PaypalPaymentProps> = ({
  stage,
  formData,
  totalAmount,
  loading,
  handleInputChange,
  handleLogin,
  handleConfirm
}) => {
  return (
    <>
      {stage === 'input' && (
        <div className="border rounded-lg p-6 bg-slate-50">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="bg-[#0070ba] text-white font-bold px-2 py-1 text-lg rounded-l">Pay</div>
              <div className="bg-[#1546a0] text-white font-bold px-2 py-1 text-lg rounded-r">Pal</div>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="paypalEmail">Email</Label>
              <Input
                id="paypalEmail"
                name="paypalEmail"
                type="email"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="bg-white"
              />
            </div>
            
            <div>
              <Label htmlFor="paypalPassword">Password</Label>
              <Input
                id="paypalPassword"
                name="paypalPassword"
                type="password"
                value={formData.paypalPassword}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="bg-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have a PayPal account? <span className="text-[#0070ba] cursor-pointer">Sign Up</span>
            </p>
          </div>
        </div>
      )}
      
      {stage === 'authorize' && (
        <div className="border rounded-lg p-6 bg-slate-50">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="bg-[#0070ba] text-white font-bold px-2 py-1 text-lg rounded-l">Pay</div>
              <div className="bg-[#1546a0] text-white font-bold px-2 py-1 text-lg rounded-r">Pal</div>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="font-medium">Hi, {formData.paypalEmail}</p>
          </div>
          
          <div className="bg-white p-4 rounded mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Payment amount:</span>
                <span className="font-bold">NPR {totalAmount.toFixed(2)}</span>
              </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>To: Ishesh Inventory</p>
              <p>For: Order #ISH-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
          </div>
          
          <Button 
            type="button" 
            className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our <span className="text-[#0070ba] cursor-pointer">terms and conditions</span>
            </p>
          </div>
        </div>
      )}
      
      {stage === 'confirmed' && (
        <div className="border rounded-lg p-6 bg-slate-50">
          <div className="flex justify-center mb-6 text-green-600">
            <Check className="h-12 w-12" />
          </div>
          
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Payment Authorized
            </h3>
            <p className="text-gray-600">
              You've successfully authorized payment of NPR {totalAmount.toFixed(2)} with PayPal.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">PayPal Account:</span>
              <span className="font-medium">{formData.paypalEmail}</span>
            </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">NPR {totalAmount.toFixed(2)}</span>
              </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">PP-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaypalPayment;
