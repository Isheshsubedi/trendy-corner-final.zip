
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface EsewaPaymentProps {
  stage: 'input' | 'authorize' | 'confirmed';
  formData: {
    esewaId: string;
    esewaPassword: string;
    esewaMpin: string;
  };
  totalAmount: number;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleConfirm: () => void;
}

const EsewaPayment: React.FC<EsewaPaymentProps> = ({
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
            <div className="bg-[#60BB46] text-white font-bold px-2 py-1 text-lg rounded-md">
              <span className="text-white">e</span>
              <span className="text-white">Sewa</span>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="esewaId">eSewa ID</Label>
              <Input
                id="esewaId"
                name="esewaId"
                value={formData.esewaId}
                onChange={handleInputChange}
                placeholder="Your eSewa ID or mobile number"
                className="bg-white"
              />
            </div>
            
            <div>
              <Label htmlFor="esewaPassword">Password</Label>
              <Input
                id="esewaPassword"
                name="esewaPassword"
                type="password"
                value={formData.esewaPassword}
                onChange={handleInputChange}
                placeholder="Enter your eSewa password"
                className="bg-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#60BB46] hover:bg-[#4e9d39]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have an eSewa account? <span className="text-[#60BB46] cursor-pointer">Sign Up</span>
            </p>
          </div>
        </div>
      )}
      
      {stage === 'authorize' && (
        <div className="border rounded-lg p-6 bg-slate-50">
          <div className="flex justify-center mb-6">
            <div className="bg-[#60BB46] text-white font-bold px-2 py-1 text-lg rounded-md">
              <span className="text-white">e</span>
              <span className="text-white">Sewa</span>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="font-medium">Hi, {formData.esewaId}</p>
            <p className="text-sm text-gray-500">Please enter your MPIN to confirm payment</p>
          </div>
          
          <div className="bg-white p-4 rounded mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Payment amount:</span>
              <span className="font-bold">NPR {(totalAmount * 133).toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>To: Ishesh Inventory</p>
              <p>For: Order #ISH-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="esewaMpin">MPIN</Label>
            <Input
              id="esewaMpin"
              name="esewaMpin"
              type="password"
              maxLength={4}
              value={formData.esewaMpin}
              onChange={handleInputChange}
              placeholder="Enter 4-digit MPIN"
              className="bg-white text-center"
            />
          </div>
          
          <Button 
            type="button" 
            className="w-full bg-[#60BB46] hover:bg-[#4e9d39]"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to eSewa's <span className="text-[#60BB46] cursor-pointer">terms and conditions</span>
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
              You've successfully authorized payment of NPR {(totalAmount * 133).toFixed(2)} with eSewa.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">eSewa ID:</span>
              <span className="font-medium">{formData.esewaId}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">NPR {(totalAmount * 133).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">ES-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EsewaPayment;
