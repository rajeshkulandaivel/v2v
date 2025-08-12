import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Wifi, Car, Users, Bed, Bath, Calendar, 
  MessageCircle, Share, Heart, ArrowLeft, ChevronLeft, ChevronRight,
  Shield, Award, Clock, CheckCircle
} from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../context/AuthContext';
import { mockProperties, mockReviews } from '../mockData';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      const propertyReviews = mockReviews.filter(r => r.propertyId === id);
      setReviews(propertyReviews);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go back to home
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price : 0;
  };

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    navigate(`/booking/${property.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const handleMessageHost = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/messages');
  };

  const totalPrice = calculateTotalPrice();
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-white">
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
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium mr-1">{property.rating}</span>
              <span className="mr-4">({property.reviews} reviews)</span>
              <MapPin className="w-4 h-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Images */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] md:aspect-[16/8] rounded-xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {property.type} hosted by {property.host.name}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="mr-4">{property.guests} guests</span>
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="mr-4">{property.bedrooms} bedrooms</span>
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={property.host.avatar} alt={property.host.name} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <Separator className="my-6" />

              {/* Host Badges */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium">Superhost</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Identity verified</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">Quick response</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">About this place</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <Separator className="my-6" />

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(showAllAmenities ? property.amenities : property.amenities.slice(0, 6)).map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
                {property.amenities.length > 6 && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                  >
                    {showAllAmenities ? 'Show less' : `Show all ${property.amenities.length} amenities`}
                  </Button>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 mr-2" />
                <h3 className="text-lg font-semibold">
                  {property.rating} · {property.reviews} reviews
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.slice(0, 4).map(review => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.avatar} alt={review.guestName} />
                        <AvatarFallback>{review.guestName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{review.guestName}</p>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              {reviews.length > 4 && (
                <Button variant="outline" className="mt-6">
                  Show all {reviews.length} reviews
                </Button>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{property.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-600"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({property.reviews})</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                        min={checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      {[...Array(property.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} guest{i > 0 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>₹{property.price.toLocaleString('en-IN')} x {nights} nights</span>
                      <span>₹{(property.price * nights).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Service fee</span>
                      <span>₹{Math.round(totalPrice * 0.14).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Taxes</span>
                      <span>₹{Math.round(totalPrice * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{Math.round(totalPrice * 1.32).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3"
                    disabled={!checkIn || !checkOut}
                  >
                    {!checkIn || !checkOut ? 'Select dates' : 'Reserve'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleMessageHost}
                    className="w-full"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Host
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;