import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Grades = ({ userId }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentGrades = async () => {
      if (!userId) {
        setError('User ID is not available.');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/assignments/grades?userId=${userId}`);
        if (response.data && Array.isArray(response.data.data)) {
          setGrades(response.data.data);
        } else {
          setError('No grades found.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching grades');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentGrades();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Grades</h2>
      {grades.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Description</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.title}</td>
                <td>{grade.description}</td>
                <td>{grade.grade ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades available.</p>
      )}
    </div>
  );
};

export default Grades;