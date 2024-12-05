import { useSelector } from 'react-redux';

const Courses = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="courses">
      <h1>{user?.name} Enrolled Courses</h1>
      <ul>
        {/* Add logic to display courses */}
        <li>Course 1</li>
        <li>Course 2</li>
      </ul>
    </div>
  );
};

export default Courses;
