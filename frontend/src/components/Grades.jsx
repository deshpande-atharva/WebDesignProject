import { useEffect, useState } from 'react';
import apiService from '../redux/apiService';

const Grades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Replace with actual API call to fetch grades
    apiService.get('/grades')
      .then(response => setGrades(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="grades">
      <h1>Your Grades</h1>
      <ul>
        {grades.map((grade, index) => (
          <li key={index}>
            {grade.assignment}: {grade.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grades;
