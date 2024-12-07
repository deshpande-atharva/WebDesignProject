// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import img1 from '../images/img1.jpg';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Email Validation Function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleHome = () => {
//     navigate("/home");
//   }

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);

//     // Validate email and set error message if invalid
//     if (!validateEmail(value)) {
//       setEmailError("Invalid email format.");
//     } else {
//       setEmailError(""); // Clear the error if email is valid
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!email || !password) {
//       setError('Both email and password are required');
//       setLoading(false);
//       return;
//     }

//     // Check for email format validation before submitting
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await dispatch(loginUser({ email, password }));
//       if (result.payload) {
//         const { email, id, courses, role } = result.payload;

//         // Save session data in localStorage
//         localStorage.setItem('email', email);
//         localStorage.setItem('userId', id);
//         localStorage.setItem('courses', courses);
//         localStorage.setItem('role', role);

//         console.log(localStorage);
        


//         if (role === "ta") {
//           navigate("/addassignment", { state: { email, id, courses } });
//         } else if (role === "student") {
//           navigate("/dashboard", { state: { email, id, courses } });
//         }

        
//       }
//     } catch (error) {
//       console.error('Login Error: ', error);
//       setError(
//         error.response?.data?.message || 'An error occurred. Please try again later.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         height: '100vh',
//         width: '100vw',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Left Section */}
//       <Box
//         sx={{
//           flex: 1,
//           height: '100%',
//           background: `url(${img1}) no-repeat center center`,
//           backgroundSize: 'cover',
//           overflow: 'hidden',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100%',
//             color: 'white',
//             textAlign: 'center',
//             overflow: 'hidden',
//           }}
//         >
//           <Box>
//             <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
//               Welcome Student
//             </Typography>
            
//             <Button
//               variant="contained"
//               onClick = {handleHome}
//               sx={{
//                 backgroundColor: '#d32f2f',
//                 '&:hover': { backgroundColor: '#9a0007' },
//                 color: 'white',
//               }}
//             >
//               Learn More
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* Right Section */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: 'white',
//         }}
//       >
//         <Box
//           sx={{
//             width: '100%',
//             maxWidth: 400,
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h5" component="h2" gutterBottom>
//             Login
//           </Typography>
//           <form
//             onSubmit={handleSubmit}
//             style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
//           >
//             {/* Error message below heading */}
//             {error && (
//               <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
//                 {error}
//               </Typography>
//             )}

//             <TextField
//               type="email"
//               label="Email"
//               variant="outlined"
//               fullWidth
//               value={email}
//               onChange= {handleEmailChange}
//               error={!!emailError} // Error flag for email field
//               helperText={emailError} // Show email error below field
//               required
//             />
//             <TextField
//               type="password"
//               label="Password"
//               variant="outlined"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//             </Box>
//             <Button
//               type="submit"
//               variant="contained"
//               onClick={handleSubmit}
//               fullWidth
//               sx={{
//                 backgroundColor: '#d32f2f',
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   backgroundColor: '#9a0007',
//                 },
//               }}
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Login;






import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import img1 from '../images/img1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email Validation Function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleHome = () => {
    navigate('/home');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email and set error message if invalid
    setEmailError(validateEmail(value) ? '' : 'Invalid email format.');
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);
  
  //   if (!email || !password) {
  //     setError('Both email and password are required');
  //     setLoading(false);
  //     return;
  //   }
  
  //   // Check for email format validation before submitting
  //   if (!validateEmail(email)) {
  //     setError('Please enter a valid email address.');
  //     setLoading(false);
  //     return;
  //   }
  
  //   try {
  //     const result = await dispatch(loginUser({ email, password })).unwrap();
  //     console.log('Login Result:', result); // Debug to verify payload
  //     console.log('User Role:', result.payload.role);

  //     if (result.payload) {
  //       const { email, id, courses, role } = result.payload;
  
  //       // Save session data in localStorage
  //       localStorage.setItem('email', email);
  //       localStorage.setItem('userId', id);
  //       localStorage.setItem('courses', JSON.stringify(courses));
  //       localStorage.setItem('role', role);
  
  //       // Role-based navigation using switch
  //       // if (role === "ta") {
  //       //   // Redirect TA to both AddAssignment and AddGrades
  //       //   navigate("/addassignment", { state: { email, id, courses } });
  //       // } else if (role === "student") {
  //       //   // Redirect student to dashboard
  //       //   navigate("/dashboard", { state: { email, id, courses } });
  //       // }

  //       if (role === "ta") {
  //         navigate("/addassignment", { state: { email, id, courses } });
  //       } else if (role === "student") {
  //         navigate("/dashboard", { state: { email, id, courses } });
  //       } else {
  //         console.error('Unknown role:', role);
  //       }
  //     }
      
  //   } catch (error) {
  //     // console.error('Login Error: ', error);
  //     // setError(
  //     //   error.response?.data?.message || 'An error occurred. Please try again later.'
  //     // );

  //     console.error('Login Error:', error); // Log the entire error object
  //     setError(
  //     error.response?.data?.message || 'An error occurred. Please try again later.'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const actionResult = dispatch(loginUser({ email, password }));
      const result = actionResult.payload;
      console.log(result);
  
      if (actionResult.error) {
        throw new Error(actionResult.error);
      }
  
      if (result && result.role) {
        localStorage.setItem('email', result.email);
        localStorage.setItem('userId', result._id);
        localStorage.setItem('role', result.role);
        
        if (result.courses) {
          localStorage.setItem('courses', JSON.stringify(result.courses));
        }
  
        if (result.role === "ta") {
          navigate("/ta/addassignment");
        } else if (result.role === "student") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
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
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome Student
            </Typography>
            <Button
              variant="contained"
              onClick={handleHome}
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
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Error message below heading */}
            {error && (
              <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
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
            InputProps={{
            autoComplete: 'current-password', // Correct way to set the autocomplete attribute
          }}
/>

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
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;


