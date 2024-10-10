import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleChange = (setter, field, validateFunc) => (e) => {
    const value = e.target.value;
    setter(value);
    if (value.trim() === '') {
      setError((prev) => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` }));
    } else if (validateFunc(value)) {
      setError((prev) => ({ ...prev, [field]: '' }));
    } else {
      setError((prev) => ({
        ...prev,
        [field]: field === 'email' ? 'Please enter a valid email address.' : 'Password must be at least 8 characters long.'
      }));
    }
  };

  const handleLogin = () => {
    const emailError = validateEmail(email) ? '' : 'Please enter a valid email address.';
    const passwordError = validatePassword(password) ? '' : 'Password must be at least 8 characters long.';
    
    if (email.trim() === '') {
      setError((prev) => ({ ...prev, email: 'Email is required.' }));
    } else if (password.trim() === '') {
      setError((prev) => ({ ...prev, password: 'Password is required.' }));
    } else if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
    } else {
      navigate('/app');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol md='6' className="text-center">
          <img
            src="https://1000logos.net/wp-content/uploads/2022/07/Northeastern-University-Logo-2048x1152.png"
            className="img-fluid mb-4"
            alt="Sample"
          />
        </MDBCol>
        
        <MDBCol md='3'>
          <div style={{
            border: '2px solid black',
            borderRadius: '8px',
            padding: '60px'
          }} className="mb-4">
            <div className="text-center">
              <p className="h1 fw-bold mb-5" style={{ color: 'black', fontFamily: 'Adobe Garamond' }}>LOGIN</p>
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

            <div className='text-center mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' style={{ backgroundColor: '#DC143C', color: 'white' }} onClick={handleLogin}>
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Do not have an account? <Link to="/register" className="link-danger">Register</Link></p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{ backgroundColor: '#DC143C' }}>
        <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
      </div>
    </MDBContainer>
  );
}

export default Login;
