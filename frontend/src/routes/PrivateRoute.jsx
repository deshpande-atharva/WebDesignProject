import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Prop validation for children
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are required and are valid React nodes
};

export default PrivateRoute;
