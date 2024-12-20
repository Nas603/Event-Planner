import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import CreateEventPage from './pages/CreateEventPage';
import ManageEventsPage from './pages/ManageEventsPage';
import UserProfilePage from './pages/UserProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ReviewEvent from './pages/ReviewEvent';
import Header from './components/Header';
import Footer from './components/Footer';
import './assets/styles/index.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<CreateEventPage />} />
          <Route path="/admin/manage-events" element={<ManageEventsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/review-event/:id" element={<ReviewEvent />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/terms" element={<TermsPage />} /> 
          <Route path="/privacy" element={<PrivacyPage />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
