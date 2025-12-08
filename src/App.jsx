import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import RegistrationSection from './components/RegistrationSection';
import UdyamDetails from './components/UdyamDetails';
import StandardOperatingProcedure from './components/StandardOperatingProcedure';
import Footer from './components/Footer';

function App() {
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
}

export default App;
