import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Banner from './components/Banner';
import RegistrationSection from './components/RegistrationSection';
import ReRegistrationSection from './components/ReRegistrationSection';
import ReRegistrationDetails from './components/ReRegistrationDetails';
import UpdateCertificateSection from './components/UpdateCertificateSection';
import UpdateCertificateDetails from './components/UpdateCertificateDetails';
import PrintCertificateSection from './components/PrintCertificateSection';
import PrintCertificateDetails from './components/PrintCertificateDetails';
import CancelRegistrationSection from './components/CancelRegistrationSection';
import CancelRegistrationDetails from './components/CancelRegistrationDetails';
import SampleCertificate from './components/SampleCertificate';
import FAQsPage from './components/FAQsPage';
import ContactPage from './components/ContactPage';
import TermsOfService from './components/TermsOfService';
import UdyamDetails from './components/UdyamDetails';
import StandardOperatingProcedure from './components/StandardOperatingProcedure';
import Footer from './components/Footer';
import Registrations from './pages/Registrations';
import ReRegistrations from './pages/ReRegistrations';
import UpdateCertificates from './pages/UpdateCertificates';
import PrintCertificates from './pages/PrintCertificates';
import CancelRegistrations from './pages/CancelRegistrations';
import Queries from './pages/Queries';
import AdminLogin from './pages/AdminLogin';

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

// Re-registration page layout
const ReRegistrationLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <ReRegistrationSection />
        <ReRegistrationDetails />
      </main>
      <Footer />
    </div>
  );
};

// Update Certificate page layout
const UpdateCertificateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <UpdateCertificateSection />
        <UpdateCertificateDetails />
      </main>
      <Footer />
    </div>
  );
};

// Print Certificate page layout
const PrintCertificateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <PrintCertificateSection />
        <PrintCertificateDetails />
      </main>
      <Footer />
    </div>
  );
};

// Cancel Registration page layout
const CancelRegistrationLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <CancelRegistrationSection />
        <CancelRegistrationDetails />
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

// FAQs page layout
const FAQsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow">
        <FAQsPage />
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

function App() {
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
        {/* Main Website Routes */}
        <Route path="/" element={<RegistrationLayout />} />
        <Route path="/reregister" element={<ReRegistrationLayout />} />
        <Route path="/updatecertificate" element={<UpdateCertificateLayout />} />
        <Route path="/printcertificate" element={<PrintCertificateLayout />} />
        <Route path="/cancelregistration" element={<CancelRegistrationLayout />} />
        <Route path="/samplecertificate" element={<SampleCertificateLayout />} />
        <Route path="/faqs" element={<FAQsLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/terms-of-service" element={<TermsOfServiceLayout />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <Registrations onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/queries"
          element={
            isAdminLoggedIn ? (
              <Queries onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/reregistrations"
          element={
            isAdminLoggedIn ? (
              <ReRegistrations onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/updatecertificates"
          element={
            isAdminLoggedIn ? (
              <UpdateCertificates onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/printcertificates"
          element={
            isAdminLoggedIn ? (
              <PrintCertificates onLogout={handleLogout} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/cancelregistrations"
          element={
            isAdminLoggedIn ? (
              <CancelRegistrations onLogout={handleLogout} />
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
