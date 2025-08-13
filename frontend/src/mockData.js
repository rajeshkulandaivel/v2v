// Mock data for Airbnb India clone
export const mockProperties = [
  {
    id: '1',
    title: 'Cozy Studio in Koramangala',
    location: 'Koramangala, Bangalore',
    price: 2500,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    type: 'Entire apartment',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'AC', 'Kitchen', 'Parking', 'TV'],
    host: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2932e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      joinedYear: 2020,
      verified: true
    },
    description: 'Modern studio apartment in the heart of Koramangala. Perfect for tech professionals working in nearby offices. Walking distance to restaurants, cafes, and metro station.',
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: '2',
    title: '2BHK Near Indiranagar Metro',
    location: 'Indiranagar, Bangalore',
    price: 4200,
    rating: 4.6,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1556020689-b9e91c6f2e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    type: 'Entire apartment',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'Balcony', 'Parking'],
    host: {
      name: 'Raj Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      joinedYear: 2019,
      verified: true
    },
    description: 'Spacious 2BHK apartment with modern amenities. Located in trendy Indiranagar with easy access to pubs, restaurants, and shopping areas.',
    coordinates: { lat: 12.9781, lng: 77.6413 }
  },
  {
    id: '3',
    title: 'Luxury Villa in Whitefield',
    location: 'Whitefield, Bangalore',
    price: 8500,
    rating: 4.9,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80'
    ],
    type: 'Entire villa',
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['WiFi', 'AC', 'Kitchen', 'Swimming Pool', 'Garden', 'Parking', 'Security'],
    host: {
      name: 'Anita Reddy',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      joinedYear: 2018,
      verified: true
    },
    description: 'Beautiful villa with swimming pool and garden. Perfect for families or groups visiting Bangalore. Close to tech parks and shopping malls.',
    coordinates: { lat: 12.9698, lng: 77.7500 }
  },
  {
    id: '4',
    title: 'Modern Flat in HSR Layout',
    location: 'HSR Layout, Bangalore',
    price: 3200,
    rating: 4.7,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    type: 'Private room',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'AC', 'Kitchen Access', 'Parking', 'Gym'],
    host: {
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      joinedYear: 2021,
      verified: true
    },
    description: 'Modern flat in HSR Layout with access to common amenities. Great for digital nomads and young professionals.',
    coordinates: { lat: 12.9116, lng: 77.6383 }
  },
  {
    id: '5',
    title: 'Heritage Home in Basavanagudi',
    location: 'Basavanagudi, Bangalore',
    price: 2800,
    rating: 4.5,
    reviews: 78,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    type: 'Entire house',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Traditional Decor', 'Kitchen', 'Courtyard', 'Parking'],
    host: {
      name: 'Lakshmi Rao',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      joinedYear: 2017,
      verified: true
    },
    description: 'Traditional Bangalore home with authentic architecture and modern comforts. Experience old Bangalore charm in the heritage area.',
    coordinates: { lat: 12.9395, lng: 77.5739 }
  }
];

export const mockAmenities = [
  'WiFi', 'AC', 'Kitchen', 'Parking', 'Washing Machine', 'TV', 'Balcony', 
  'Swimming Pool', 'Garden', 'Security', 'Gym', 'Traditional Decor', 'Courtyard'
];

export const mockPropertyTypes = [
  'Entire apartment', 'Private room', 'Entire house', 'Entire villa', 'Shared room'
];

export const mockLocations = [
  'Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Basavanagudi',
  'JP Nagar', 'BTM Layout', 'Electronic City', 'Marathahalli', 'Jayanagar',
  'Rajajinagar', 'Malleswaram', 'Hebbal', 'Ulsoor', 'Richmond Town'
];

export const mockMessages = [
  {
    id: '1',
    propertyId: '1',
    hostId: 'host1',
    guestId: 'guest1',
    messages: [
      {
        id: 'm1',
        senderId: 'guest1',
        text: 'Hi! Is the property available for check-in on 25th December?',
        timestamp: new Date('2024-12-20T10:30:00'),
        isHost: false
      },
      {
        id: 'm2',
        senderId: 'host1',
        text: 'Hello! Yes, the property is available. The check-in time is 2 PM. Is that convenient for you?',
        timestamp: new Date('2024-12-20T11:15:00'),
        isHost: true
      },
      {
        id: 'm3',
        senderId: 'guest1',
        text: 'Perfect! Also, is parking included?',
        timestamp: new Date('2024-12-20T11:45:00'),
        isHost: false
      },
      {
        id: 'm4',
        senderId: 'host1',
        text: 'Yes, free parking is included. I will send you the exact parking spot details before your arrival.',
        timestamp: new Date('2024-12-20T12:00:00'),
        isHost: true
      }
    ]
  }
];

export const mockReviews = [
  {
    id: '1',
    propertyId: '1',
    guestName: 'Arjun M',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 5,
    date: '2024-12-15',
    comment: 'Excellent stay! The location is perfect for anyone working in the tech corridor. Priya was very responsive and helpful. Highly recommended!'
  },
  {
    id: '2',
    propertyId: '1',
    guestName: 'Sneha K',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 5,
    date: '2024-12-10',
    comment: 'Clean, comfortable, and well-equipped. The WiFi speed was excellent for remote work. Will definitely book again!'
  }
];

export const mockBookings = [
  {
    id: 'b1',
    propertyId: '1',
    guestName: 'Rahul Gupta',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 2,
    totalAmount: 7500,
    status: 'confirmed',
    paymentMethod: 'UPI'
  },
  {
    id: 'b2',
    propertyId: '2',
    guestName: 'Meera Shah',
    checkIn: '2024-12-30',
    checkOut: '2025-01-02',
    guests: 3,
    totalAmount: 12600,
    status: 'pending',
    paymentMethod: 'UPI'
  }
];

export const mockUser = {
  id: 'user1',
  name: 'Rohan Patel',
  email: 'rohan.patel@email.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  phone: '+91 9876543210',
  joinedYear: 2022,
  verified: true,
  isHost: false
};