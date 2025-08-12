import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match",
          variant: "destructive"
        });
        return;
      }
      
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      if (result.success) {
        toast({
          title: "Account Created!",
          description: "Welcome to Airbnb India"
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Signup Failed",
          description: result.error,
          variant: "destructive"
        });
      }
    } else {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in"
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    }
  };

  const handlePhoneLogin = () => {
    // Mock phone login - would integrate with OTP service in real app
    toast({
      title: "Coming Soon!",
      description: "Phone login will be available soon"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-rose-500">
              Airbnb India
            </span>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <p className="text-gray-600 text-center">
              {isSignUp 
                ? 'Join thousands of travelers in India' 
                : 'Sign in to your account'
              }
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>

            <div className="my-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
            </div>

            {/* Phone Login */}
            <Button
              variant="outline"
              onClick={handlePhoneLogin}
              className="w-full mb-4"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Continue with Phone
            </Button>

            {/* Toggle Sign In/Sign Up */}
            <div className="text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-rose-500 p-1 ml-1"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
              </p>
            </div>

            {!isSignUp && (
              <div className="text-center mt-4">
                <Button variant="link" className="text-rose-500 text-sm">
                  Forgot your password?
                </Button>
              </div>
            )}

            {/* Terms */}
            {isSignUp && (
              <p className="text-xs text-gray-500 text-center mt-4">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-rose-500 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-rose-500 hover:underline">Privacy Policy</a>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;