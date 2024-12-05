import { useSelector } from 'react-redux';

const Schedule = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="schedule">
      <h1>{user?.name} Class Schedule</h1>
      <p>Your classes will be displayed here.</p>
      {/* Add logic to display schedule */}
    </div>
  );
};

export default Schedule;
