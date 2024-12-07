
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AssignmentList from './components/AssignmentList';
import AssignmentDetails from './components/AssignmentDetails';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/assignments/:courseId" element={<PrivateRoute><AssignmentList /></PrivateRoute>} />
        <Route path="/assignmentdetails/:title" element={<PrivateRoute><AssignmentDetails /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
    </div>
  );
};

export default App;
