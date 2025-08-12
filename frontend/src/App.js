import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import PropertyDetails from "./pages/PropertyDetails";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import MessagesPage from "./pages/MessagesPage";
import HostDashboard from "./pages/HostDashboard";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/host" element={<HostDashboard />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;