import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Banner from './components/Banner';
import RegistrationSection from './components/RegistrationSection';
import UdyamDetails from './components/UdyamDetails';
import StandardOperatingProcedure from './components/StandardOperatingProcedure';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

// Layout component for the main website content
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <Banner />
        <RegistrationSection />
        <UdyamDetails />
        <StandardOperatingProcedure />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  // Determine admin login status from Firebase
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={<MainLayout />} />

        {/* Admin Route - Login Protection */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
