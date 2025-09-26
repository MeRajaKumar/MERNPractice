import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompressPDFPage from './pages/CompressPDFPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; // Global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compress-pdf" element={<CompressPDFPage />} />
            {/* Add routes for other pages here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;