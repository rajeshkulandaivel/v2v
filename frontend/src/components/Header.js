import React, { useState } from 'react';
import { Search, Menu, User, MessageCircle, Heart, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const Header = ({ showSearch = true, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search?location=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-rose-500 hidden sm:block">
                Airbnb India
              </span>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search destinations in Bangalore..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-rose-500 hover:bg-rose-600"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() => navigate('/host')}
            >
              Become a Host
            </Button>

            <Button variant="ghost" size="sm">
              <Globe className="w-4 h-4" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/messages')}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2">
                      <Menu className="w-4 h-4" />
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/bookings')}>
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/host')}>
                      Host Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2">
                    <Menu className="w-4 h-4" />
                    <User className="w-8 h-8 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleLogin}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/signup')}>
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/host')}>
                    Become a Host
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search in Bangalore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-16 py-2 w-full rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-rose-500 hover:bg-rose-600"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;