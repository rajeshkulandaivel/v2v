import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Home, Calendar, MessageCircle, TrendingUp, Users, 
  Star, IndianRupee, Settings, ArrowLeft, BarChart3, 
  MapPin, Bed, Bath, Wifi, Car
} from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import { mockProperties, mockBookings, mockUser } from '../mockData';

const HostDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock host data - in real app, this would be fetched from API
  const hostProperties = mockProperties.slice(0, 3); // Simulate user's properties
  const hostBookings = mockBookings;
  
  const totalEarnings = hostBookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);
  
  const monthlyEarnings = Math.round(totalEarnings * 0.7); // Mock monthly earnings
  const occupancyRate = 78; // Mock occupancy rate
  const averageRating = 4.8;

  const upcomingBookings = hostBookings.filter(booking => 
    new Date(booking.checkIn) > new Date()
  );

  const recentBookings = hostBookings.slice(0, 5);

  const PropertyCard = ({ property }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">
          Active
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users className="w-4 h-4 mr-1" />
          <span className="mr-3">{property.guests} guests</span>
          <Bed className="w-4 h-4 mr-1" />
          <span className="mr-3">{property.bedrooms} beds</span>
          <Bath className="w-4 h-4 mr-1" />
          <span>{property.bathrooms} baths</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({property.reviews})</span>
          </div>
          <p className="font-bold text-gray-900">
            ₹{property.price.toLocaleString('en-IN')}/night
          </p>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" className="flex-1" size="sm">
            Edit
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BookingRow = ({ booking }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback>{booking.guestName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-900">{booking.guestName}</p>
          <p className="text-sm text-gray-600">
            {booking.checkIn} - {booking.checkOut}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          ₹{booking.totalAmount.toLocaleString('en-IN')}
        </p>
        <Badge 
          variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
          className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
        >
          {booking.status}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4 p-2 md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Host Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || 'Host'}! 
              </p>
            </div>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mr-3">
                      <Home className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{hostProperties.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{hostBookings.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <IndianRupee className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No upcoming bookings</p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.slice(0, 3).map(booking => (
                        <BookingRow key={booking.id} booking={booking} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Occupancy Rate</span>
                      <span className="font-semibold">{occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[95%]"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Guest Satisfaction</span>
                      <span className="font-semibold">{averageRating}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[96%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
              <Button className="bg-rose-500 hover:bg-rose-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Bookings</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                {recentBookings.map(booking => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">This Month</p>
                    <p className="text-3xl font-bold text-gray-900">₹{monthlyEarnings.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600 mt-1">Since joining</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Avg per Booking</p>
                    <p className="text-3xl font-bold text-gray-900">₹{Math.round(totalEarnings / hostBookings.length).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-blue-600 mt-1">Above market avg</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Booking Revenue</span>
                    <span className="font-semibold">₹{totalEarnings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Service Fees</span>
                    <span className="font-semibold text-red-600">-₹{Math.round(totalEarnings * 0.03).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-semibold text-red-600">-₹{Math.round(totalEarnings * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 font-bold text-lg">
                    <span>Net Earnings</span>
                    <span className="text-green-600">₹{Math.round(totalEarnings * 0.79).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostDashboard;