import { useEffect, useState } from 'react';
import apiService from '../redux/apiService';

const Calendar = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Replace with actual API call to fetch calendar schedule
    apiService.get('/schedule')
      .then(response => setSchedule(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="calendar">
      <h1>Your Class Schedule</h1>
      <ul>
        {schedule.map((classInfo, index) => (
          <li key={index}>{classInfo.className} - {classInfo.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
