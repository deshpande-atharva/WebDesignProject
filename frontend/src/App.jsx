
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Grades from './components/Grades';
import Announcements from './components/Announcements';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AssignmentList from './components/AssignmentList';
import AssignmentDetails from './components/AssignmentDetails';

import TADashboard from './tacomponents/TADashboard';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
        <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/assignments/:courseId" element={<PrivateRoute><AssignmentList /></PrivateRoute>} />
        <Route path="/assignmentdetails/:title" element={<PrivateRoute><AssignmentDetails /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/ta-dashboard" element={<TADashboard />} />
      </Routes>
    </div>
  );
};

export default App;
