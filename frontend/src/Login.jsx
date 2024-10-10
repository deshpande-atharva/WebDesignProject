import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  // Handle input changes
  const handleChange = (setter, field, validateFunc) => (e) => {
    const value = e.target.value;
    setter(value);

    // Set error message based on validation
    if (value.trim() === '') {
      setError((prev) => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` }));
    } else if (validateFunc(value)) {
      setError((prev) => ({ ...prev, [field]: '' })); // Clear error if valid
    } else {
      if (field === 'email') {
        setError((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else if (field === 'password') {
        setError((prev) => ({ ...prev, password: 'Password must be at least 8 characters long.' }));
      }
    }
  };

  const handleLogin = () => {
    // Final validation before submission
    const emailError = validateEmail(email) ? '' : 'Please enter a valid email address.';
    const passwordError = validatePassword(password) ? '' : 'Password must be at least 8 characters long.';
    
    if (email.trim() === '') {
      setError((prev) => ({ ...prev, email: 'Email is required.' }));
    } else if (password.trim() === '') {
      setError((prev) => ({ ...prev, password: 'Password is required.' }));
    } else if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
    } else {
      navigate('/app'); // Adjust the path to your actual route
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        

        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: 'black' }}>LOGIN</p>
          </div>

          <MDBInput 
            wrapperClass='mb-4' 
            label='Email address' 
            type='email' 
            size="lg" 
            value={email} 
            onChange={handleChange(setEmail, 'email', validateEmail)} 
          />
          {error.email && <p className="text-danger" style={{ marginTop: '-10px' }}>{error.email}</p>}

          <MDBInput 
            wrapperClass='mb-4' 
            label='Password' 
            type='password' 
            size="lg" 
            value={password} 
            onChange={handleChange(setPassword, 'password', validatePassword)} 
          />
          {error.password && <p className="text-danger" style={{ marginTop: '-10px' }}>{error.password}</p>}

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' style={{ backgroundColor: '#DC143C', color: 'white' }} onClick={handleLogin}>
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Do not have an account? <Link to="/register" className="link-danger">Register</Link></p>
          </div>
        </MDBCol>

        <MDBCol col='10' md='6'>
          <img
            src="https://1000logos.net/wp-content/uploads/2022/07/Northeastern-University-Logo-2048x1152.png"
            className="img-fluid"
            alt="Sample"
          />
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{ backgroundColor: '#DC143C' }}>
        <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
      </div>
    </MDBContainer>
  );
}

export default Login;
