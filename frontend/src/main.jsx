import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import App from './App.jsx';  // Contains LandingPage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login Page */}
        <Route path="/register" element={<Signup />} />  {/* Signup Page */}
        <Route path="/app" element={<App />} />  {/* Landing Page */}
      </Routes>
    </Router>
  </StrictMode>
);
