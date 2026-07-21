import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import IntroAnimation from './components/IntroAnimation';
import RequireAdmin from './components/RequireAdmin';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProjectChallenges from './pages/ProjectChallenges';
import TestingGuide from './pages/TestingGuide';
import NotFound from './pages/NotFound';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <IntroAnimation />
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1" style={{ paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route path="/challenges/:projectId" element={<ProjectChallenges />} />
              <Route path="/testing-guide" element={<TestingGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </MotionConfig>
  );
}

export default App;
