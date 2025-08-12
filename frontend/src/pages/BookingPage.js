import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, Star, CreditCard, Smartphone, Banknote } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { mockProperties } from '../mockData';

const BookingPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [property, setProperty] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = parseInt(searchParams.get('guests')) || 1;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [id, user, navigate]);

  if (!property || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid booking details</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go back to home
          </Button>
        </div>
      </div>
    );
  }

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = nights * property.price;
  const serviceFee = Math.round(subtotal * 0.14);
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + serviceFee + taxes;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePayment = async () => {
    if (paymentMethod === 'upi' && !upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock successful payment
      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your payment was successful. Booking details sent to your email.",
        duration: 5000
      });

      // Redirect to success page (we'll create this later)
      navigate(`/booking-success/${id}`);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay with Google Pay, PhonePe, Paytm, etc.'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Pay using your bank account'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, RuPay accepted'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button & Title */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Confirm and Pay
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Details */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Your Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium mr-1">{property.rating}</span>
                      <span className="text-gray-500">({property.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Check-in</p>
                    <p className="font-medium">{formatDate(checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out</p>
                    <p className="font-medium">{formatDate(checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Guests</p>
                    <p className="font-medium">{guests} guest{guests > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nights</p>
                    <p className="font-medium">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === method.id
                          ? 'border-rose-500 bg-rose-500'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.icon}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* UPI ID Input */}
                {paymentMethod === 'upi' && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      UPI ID
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your UPI ID (e.g. 9876543210@paytm)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Popular UPI apps: Google Pay, PhonePe, Paytm, BHIM
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Special Requests (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special requests or requirements? (e.g., early check-in, late check-out, etc.)"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price Breakdown */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Banknote className="w-5 h-5 mr-2" />
                  Price Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>₹{property.price.toLocaleString('en-IN')} x {nights} nights</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{serviceFee.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Taxes (GST)</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total (INR)</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full mt-6 bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${total.toLocaleString('en-IN')}`
                  )}
                </Button>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-800 text-sm">
                    <span className="mr-2">✓</span>
                    <span>Free cancellation for 48 hours</span>
                  </div>
                  <div className="flex items-center text-green-800 text-sm mt-1">
                    <span className="mr-2">✓</span>
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By selecting the button above, I agree to the{' '}
                  <a href="#" className="text-rose-500 hover:underline">Host's House Rules</a>,{' '}
                  <a href="#" className="text-rose-500 hover:underline">Ground rules for guests</a>,{' '}
                  <a href="#" className="text-rose-500 hover:underline">Airbnb's Rebooking and Refund Policy</a>, and that Airbnb can{' '}
                  <a href="#" className="text-rose-500 hover:underline">charge my payment method</a> if I'm responsible for damage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;