import { useEffect, useState } from 'react';
import apiService from '../redux/apiService';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Replace with actual API call to fetch announcements
    apiService.get('/announcements')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="announcements">
      <h1>Announcements</h1>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>{announcement.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
