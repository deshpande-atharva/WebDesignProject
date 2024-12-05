import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import img1 from '../images/img1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual API call
    dispatch(login({ name: 'Student', email }));
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          background: `url(${img1}) no-repeat center center`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome Student
            </Typography>
            
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#9a0007' },
                color: 'white',
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Don't have an account?{' '}
            <Link href="/signup" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
              Register
            </Link>
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me" style={{ marginLeft: 8 }}>
                  Remember me
                </label>
              </Box>
              <Link href="/forgot-password" sx={{ color: '#d32f2f' }}>
                Forgot Password?
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#d32f2f',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#9a0007',
                },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
