import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, Star, MapPin, Heart, SlidersHorizontal } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { mockProperties, mockAmenities, mockPropertyTypes } from '../mockData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('price');

  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests')) || 1;

  useEffect(() => {
    let filtered = mockProperties;

    // Filter by location
    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.title.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    // Filter by property type
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter(property => 
        selectedPropertyTypes.includes(property.type)
      );
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property => 
        selectedAmenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }

    // Filter by guest capacity
    filtered = filtered.filter(property => property.guests >= guests);

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  }, [location, priceRange, selectedPropertyTypes, selectedAmenities, guests, sortBy]);

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={10000}
          min={0}
          step={500}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="font-semibold mb-4">Property Type</h3>
        <div className="space-y-3">
          {mockPropertyTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={() => handlePropertyTypeChange(type)}
              />
              <label htmlFor={type} className="text-sm">{type}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold mb-4">Amenities</h3>
        <div className="grid grid-cols-2 gap-3">
          {mockAmenities.slice(0, 8).map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityChange(amenity)}
              />
              <label htmlFor={amenity} className="text-sm">{amenity}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Info & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {location ? `Stays in ${location}` : 'All Properties'}
            </h1>
            <p className="text-gray-600">
              {filteredProperties.length} properties found
              {checkIn && checkOut && ` • ${checkIn} - ${checkOut}`}
              {guests > 1 && ` • ${guests} guests`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Sort by Reviews</option>
            </select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search results
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 overflow-y-auto">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden sm:block w-80 bg-white rounded-lg p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setSelectedPropertyTypes([]);
                  setSelectedAmenities([]);
                }}
              >
                Clear all
              </Button>
            </div>
            <FilterContent />
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <Card 
                    key={property.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={property.images[0]}
                        alt={property.title}  
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                        {property.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle wishlist toggle
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{property.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({property.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span>{property.guests} guests</span>
                        <span className="mx-2">•</span>
                        <span>{property.bedrooms} bedrooms</span>
                        <span className="mx-2">•</span>
                        <span>{property.bathrooms} bathrooms</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.amenities.slice(0, 3).map(amenity => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-lg font-bold text-gray-900">
                        ₹{property.price.toLocaleString('en-IN')}
                        <span className="text-sm font-normal text-gray-600"> / night</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;