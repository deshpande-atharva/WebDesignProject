import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/courseSlice';

const Courses = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user); // Safely access user
  const { courses = [], loading, error } = useSelector((state) => state.courses || {}); // Provide default values

  useEffect(() => {
    if (user) {
      dispatch(fetchCourses());
    }
  }, [dispatch, user]);

  if (!user && loading) {
    return <p>Loading user...</p>; // Show a loading message while user info is being fetched
  }

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="courses">
      <h1>{user.name}'s Enrolled Courses</h1>
      {loading && <p>Loading courses...</p>}
      {error && <p>Error: {error.message || "Something went wrong"}</p>}
      <ul>
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course._id}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Teacher: {course.teacher?.name || "Unknown"}</p> {/* Render teacher name */}
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
};

export default Courses;
