import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newError = { name: '', email: '', password: '', confirmPassword: '' };

    if (!name) {
      newError.name = 'Name is required.';
    }
    if (!validateEmail(email)) {
      newError.email = 'Please enter a valid email address.';
    }
    if (!validatePassword(password)) {
      newError.password = 'Password must be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match.';
    }

    setError(newError);
    return newError;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSignup = () => {
    const validationError = validateForm();
    if (!validationError.name && !validationError.email && !validationError.password && !validationError.confirmPassword) {
      // Add any signup logic here (e.g., API call)
      navigate('/app'); // Redirect to App.js or the corresponding route
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    const value = e.target.value;
    setter(value);
    
    // Clear error message for the current field while typing
    setError((prev) => ({ ...prev, [field]: '' }));

    // Additional logic for confirming password match
    if (field === 'confirmPassword') {
      if (value === password) {
        setError((prev) => ({ ...prev, confirmPassword: '' })); // Clear error if passwords match
      } else {
        validateForm(); // Validate again to show error if they don't match
      }
    } else {
      validateForm(); // Validate all fields on other inputs
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontFamily: 'Granada TS-Demi Bold'}}>SIGN UP</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput
                  label='Your Name'
                  id='form1'
                  type='text'
                  className='w-100'
                  value={name}
                  onChange={handleInputChange(setName, 'name')}
                />
              </div>
              {error.name && <p className="text-danger">{error.name}</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput
                  label='Your Email'
                  id='form2'
                  type='email'
                  value={email}
                  onChange={handleInputChange(setEmail, 'email')}
                />
              </div>
              {error.email && <p className="text-danger">{error.email}</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput
                  label='Password'
                  id='form3'
                  type='password'
                  value={password}
                  onChange={handleInputChange(setPassword, 'password')}
                />
              </div>
              {error.password && <p className="text-danger">{error.password}</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput
                  label='Repeat your password'
                  id='form4'
                  type='password'
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
                />
              </div>
              {error.confirmPassword && <p className="text-danger">{error.confirmPassword}</p>}

              <MDBBtn className='mb-4' size='lg' style={{ backgroundColor: '#DC143C' }} onClick={handleSignup}>
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
