
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import CreditCardPayment from '@/components/checkout/CreditCardPayment';
import PaypalPayment from '@/components/checkout/PaypalPayment';
import EsewaPayment from '@/components/checkout/EsewaPayment';
import CashOnDelivery from '@/components/checkout/CashOnDelivery';
import OrderSummary from '@/components/checkout/OrderSummary';
import EmptyCartMessage from '@/components/checkout/EmptyCartMessage';

const CheckoutPage = () => {
  const { cartItems, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentStage, setPaymentStage] = useState<'input' | 'authorize' | 'confirmed'>('input');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
    phone: '',
  });

  const [paymentFormData, setPaymentFormData] = useState({
    // Credit Card
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    // PayPal
    paypalEmail: '',
    paypalPassword: '',
    // eSewa
    esewaId: '',
    esewaPassword: '',
    esewaMpin: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deliveryFee = subtotal >= 3000 ? 0 : 100;
  const totalAmount = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <EmptyCartMessage />
        <Footer />
      </>
    );
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPaymentStage('authorize');
      setLoading(false);
    }, 1000);
  };

  const handlePaymentConfirm = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStage('confirmed');
      setLoading(false);
    }, 1500);
  };

  const handlePlaceOrder = () => {
    // Store order details for confirmation page
    const orderDetails = {
      items: cartItems,
      shippingInfo: formData,
      paymentMethod,
      subtotal,
      deliveryFee,
      total: totalAmount,
      orderNumber: `TC-${Date.now()}`
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    clearCart();
    navigate('/order-confirmation');
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <CreditCardPayment
            formData={paymentFormData}
            handleInputChange={handlePaymentInputChange}
          />
        );
      case 'paypal':
        return (
          <PaypalPayment
            stage={paymentStage}
            formData={paymentFormData}
            totalAmount={totalAmount}
            loading={loading}
            handleInputChange={handlePaymentInputChange}
            handleLogin={handlePaymentLogin}
            handleConfirm={handlePaymentConfirm}
          />
        );
      case 'esewa':
        return (
          <EsewaPayment
            stage={paymentStage}
            formData={paymentFormData}
            totalAmount={totalAmount}
            loading={loading}
            handleInputChange={handlePaymentInputChange}
            handleLogin={handlePaymentLogin}
            handleConfirm={handlePaymentConfirm}
          />
        );
      case 'cash-on-delivery':
        return <CashOnDelivery />;
      default:
        return (
          <CreditCardPayment
            formData={paymentFormData}
            handleInputChange={handlePaymentInputChange}
          />
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ShippingForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PaymentMethodSelector
                      selectedMethod={paymentMethod}
                      onMethodChange={setPaymentMethod}
                    />
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderPaymentForm()}
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 3 ? (
                  <Button onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder} className="btn-primary">
                    Place Order
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
