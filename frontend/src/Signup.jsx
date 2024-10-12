import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Signup() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignup = () => {
    // Add your signup logic here

    // After successful signup, navigate to landing page
    navigate('/app');
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
              <p className="h1 fw-bold mb-5" style={{ color: 'black', fontFamily: 'Granada TS-Demi Bold' }}>SIGNUP</p>
            </div>

            <MDBInput 
              wrapperClass='mb-4' 
              label='Email address' 
              type='email' 
              size="lg" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              type='password' 
              size="lg" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            <div className='text-center mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' style={{ backgroundColor: '#DC143C', color: 'white' }} onClick={handleSignup}>
                Signup
              </MDBBtn>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
