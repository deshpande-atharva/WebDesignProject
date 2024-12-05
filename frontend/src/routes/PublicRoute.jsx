import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If the user is authenticated, redirect them to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// Prop validation for children
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are required and are valid React nodes
};

export default PublicRoute;
