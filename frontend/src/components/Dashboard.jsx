
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user);


  const handleCalendar = () => {
    navigate('/calendar');
  };

  const handleCourses = () => {
    navigate('/courses');
  };

  const handleGrades = () => {
    navigate('/grades');
  };

  const handleAnnouncements = () => {
    navigate('/announcements');
  };

  const handleSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name || 'Student'}!</h1>
      <p>Your courses are listed below:</p>
      <button onClick={handleCalendar}> Calendar</button>
      <button onClick={handleCourses}> Courses</button>
      <button onClick={handleGrades}> Grades</button>
      <button onClick={handleAnnouncements}> Annoucements</button>
      <button onClick={handleSchedule}> Schedule</button>
      {/* Add cards for courses */}
    </div>
  );
};

export default Dashboard;
