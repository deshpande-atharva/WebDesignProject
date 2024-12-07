import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../redux/courseSlice';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { courses = [], loading } = useSelector((state) => state.courses || {});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCourses());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.courses?.length && courses.length) {
      const enrolledCoursesList = courses.filter(course =>
        user.courses.includes(course.courseCode)
      );
      setEnrolledCourses(enrolledCoursesList);
    }
  }, [user, courses]);

  // Render logic here
};
export default Dashboard;
