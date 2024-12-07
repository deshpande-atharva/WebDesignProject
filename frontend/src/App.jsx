
// // import { Routes, Route } from 'react-router-dom';
// // import Home from './pages/Home';
// // import Login from './components/Login';
// // import Dashboard from './components/Dashboard';
// // import Grades from './components/Grades';
// // import Announcements from './components/Announcements';
// // import Calendar from './components/Calendar';
// // import Courses from './pages/Courses';
// // import Schedule from './pages/Schedule';
// // import PrivateRoute from './routes/PrivateRoute';
// // import PublicRoute from './routes/PublicRoute';

// // const App = () => {
// //   return (
// //     <div className="App">
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
// //         <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
// //         <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
// //         <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
// //         <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
// //         <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
// //         <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
// //         <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
// //       </Routes>
// //     </div>
// //   );
// // };

// // export default App;


import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Grades from './components/Grades';
import Announcements from './components/Announcements';
import Calendar from './components/Calendar';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import AddAssignment from './tacomponents/AddAssignment';
import AddGrades from './tacomponents/AddGrades';
import TADashboard from './tacomponents/TADashboard';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />

        {/* TA Routes */}
        <Route path="/ta/*" element={
          <PrivateRoute>
            <TADashboard />
          </PrivateRoute>
        } />
        <Route path="/addassignment" element={
          <PrivateRoute>
            <TADashboard />
          </PrivateRoute>
        } />
        <Route path="/addgrades" element={
          <PrivateRoute>
            <TADashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;


// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Grades from './components/Grades';
// import Announcements from './components/Announcements';
// import Calendar from './components/Calendar';
// import Courses from './pages/Courses';
// import Schedule from './pages/Schedule';
// import AddAssignment from './tacomponents/AddAssignment'; // Import AddAssignment
// import AddGrades from './tacomponents/AddGrades'; // Import AddGrades
// import PrivateRoute from './routes/PrivateRoute';
// import PublicRoute from './routes/PublicRoute';

// const App = () => {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
//         <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
//         <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
//         <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
//         <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
//         <Route path="/addassignment" element={<PrivateRoute><AddAssignment /></PrivateRoute>} />
//         <Route path="/addgrades" element={<PrivateRoute><AddGrades /></PrivateRoute>} />
//         <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
//         <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

