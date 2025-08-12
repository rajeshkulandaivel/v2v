import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockProperties, mockLocations } from '../mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const featuredProperties = mockProperties.slice(0, 4);
  
  const popularDestinations = [
    {
      area: 'Koramangala',
      properties: 45,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      area: 'Indiranagar', 
      properties: 32,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      area: 'Whitefield',
      properties: 28,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      area: 'HSR Layout',
      properties: 38,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchData.location) queryParams.set('location', searchData.location);
    if (searchData.checkIn) queryParams.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) queryParams.set('checkOut', searchData.checkOut);
    if (searchData.guests) queryParams.set('guests', searchData.guests);
    
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-50 to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find your perfect stay in
              <span className="text-rose-500"> Bangalore</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover unique places to stay, from cozy apartments in Koramangala to luxury villas in Whitefield
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Where
                  </label>
                  <Input
                    placeholder="Search destinations"
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Check-in
                  </label>
                  <Input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Check-out
                  </label>
                  <Input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Guests
                  </label>
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-md"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-6 bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg font-medium"
              >
                Search Properties
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Areas in Bangalore
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/search?location=${destination.area}`)}
              >
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={destination.image}
                    alt={destination.area}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900">{destination.area}</h3>
                  <p className="text-sm text-gray-600">{destination.properties} properties</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Properties
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <Card 
                key={property.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {property.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{property.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{property.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-600"> / night</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/search')}
              variant="outline"
              className="text-rose-500 border-rose-500 hover:bg-rose-50"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Airbnb India */}
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Airbnb India?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">High-Speed WiFi</h3>
              <p className="text-gray-600 text-sm">Perfect for remote work and digital nomads</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Parking</h3>
              <p className="text-gray-600 text-sm">Secure parking spaces in prime locations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Local Experience</h3>
              <p className="text-gray-600 text-sm">Discover authentic Bangalore culture</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Kitchen</h3>
              <p className="text-gray-600 text-sm">Cook your favorite meals like at home</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Help Center</li>
                <li>Safety Information</li>
                <li>Cancellation Options</li>
                <li>COVID-19 Response</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Airbnb.org</li>
                <li>Diversity & Belonging</li>
                <li>Against Discrimination</li>
                <li>Accessibility</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Host Your Home</li>
                <li>Host an Experience</li>
                <li>Responsible Hosting</li>
                <li>Resource Center</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Newsroom</li>
                <li>New Features</li>
                <li>Careers</li>
                <li>Investors</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Airbnb India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;