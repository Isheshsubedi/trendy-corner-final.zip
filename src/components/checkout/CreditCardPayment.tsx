
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreditCardPaymentProps {
  formData: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreditCardPayment: React.FC<CreditCardPaymentProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Label htmlFor="cardName">Name on Card *</Label>
        <Input
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          placeholder="John Doe"
        />
      </div>
      
      <div className="md:col-span-2">
        <Label htmlFor="cardNumber">Card Number *</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
      
      <div>
        <Label htmlFor="cardExpiry">Expiry Date *</Label>
        <Input
          id="cardExpiry"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleInputChange}
          placeholder="MM/YY"
          maxLength={5}
        />
      </div>
      
      <div>
        <Label htmlFor="cardCvc">CVC/CVV *</Label>
        <Input
          id="cardCvc"
          name="cardCvc"
          value={formData.cardCvc}
          onChange={handleInputChange}
          placeholder="123"
          maxLength={4}
        />
      </div>
    </div>
  );
};

export default CreditCardPayment;
