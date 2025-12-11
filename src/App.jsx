import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./components/Header";
import Banner from "./components/Banner";
import RegistrationSection from "./components/RegistrationSection";
import SampleCertificate from "./components/SampleCertificate";

import ContactPage from "./components/ContactPage";
import TermsOfService from "./components/TermsOfService";
import UdyamDetails from "./components/UdyamDetails";
import StandardOperatingProcedure from "./components/StandardOperatingProcedure";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CancellationRefundPolicy from "./components/CancellationRefundPolicy";
import AboutUs from "./components/AboutUs";
import SOP from "./components/SOP";
import ShippingPolicy from "./components/ShippingPolicy";
import Footer from "./components/Footer";
import Registrations from "./pages/Registrations";
import AdminLogin from "./pages/AdminLogin";

// Registration page layout
const RegistrationLayout = () => {
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

// Sample Certificate page layout
const SampleCertificateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <SampleCertificate />
      </main>
      <Footer />
    </div>
  );
};



// Terms of Service page layout
const TermsOfServiceLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <TermsOfService />
      </main>
      <Footer />
    </div>
  );
};

// Contact page layout
const ContactLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
};

// Privacy Policy page layout
const PrivacyPolicyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
};

// Cancellation & Refund Policy page layout
const CancellationRefundPolicyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <CancellationRefundPolicy />
      </main>
      <Footer />
    </div>
  );
};

// About Us page layout
const AboutUsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

// SOP page layout
const SOPLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <SOP />
      </main>
      <Footer />
    </div>
  );
};

// Shipping Policy page layout
const ShippingPolicyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <ShippingPolicy />
      </main>
      <Footer />
    </div>
  );
};

function AppContent({ isAdminLoggedIn, handleLogout, loading, authChecked }) {
  const navigate = useNavigate();

  const handleLogoutWithRedirect = async () => {
    await handleLogout();
    navigate("/", { replace: true });
  };

  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-400 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Main Website Routes */}
      <Route path="/" element={<RegistrationLayout />} />
      <Route path="/udyam-re-registration" element={<RegistrationLayout />} />
      <Route path="/update-certificate" element={<RegistrationLayout />} />
      <Route path="/print-certificate" element={<RegistrationLayout />} />
      <Route path="/samplecertificate" element={<SampleCertificateLayout />} />

      <Route path="/contact" element={<ContactLayout />} />
      <Route path="/terms-of-service" element={<TermsOfServiceLayout />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyLayout />} />
      <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicyLayout />} />
      <Route path="/about-us" element={<AboutUsLayout />} />
      <Route path="/sop" element={<SOPLayout />} />
      <Route path="/shipping-policy" element={<ShippingPolicyLayout />} />


      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          isAdminLoggedIn ? (
            <Registrations onLogout={handleLogoutWithRedirect} />
          ) : (
            <AdminLogin />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAdminLoggedIn ? (
            <Registrations onLogout={handleLogoutWithRedirect} />
          ) : (
            <AdminLogin />
          )
        }
      />
    </Routes>
  );
}

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Initialize auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in - verify they are an admin
        setIsAdminLoggedIn(true);
      } else {
        // User is not logged in
        setIsAdminLoggedIn(false);
      }
      setAuthChecked(true);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setIsAdminLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
      setLoading(false);
    }
  };

  return (
    <Router>
      <AppContent
        isAdminLoggedIn={isAdminLoggedIn}
        handleLogout={handleLogout}
        loading={loading}
        authChecked={authChecked}
      />
    </Router>
  );
}

export default App;
