// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, Drawer, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Left Sidebar (Drawer) */}
//       <Drawer
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 240,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <List>
//           <ListItem>
//             <Typography variant="h5" align="center">
//               {user?.name || 'Student'}
//             </Typography>
//           </ListItem>
//           <ListItem button onClick={() => handleNavigation('/calendar')}>
//             <ListItemText primary="Calendar" />
//           </ListItem>
//           <ListItem button onClick={() => handleNavigation('/courses')}>
//             <ListItemText primary="Courses" />
//           </ListItem>
//           <ListItem button onClick={() => handleNavigation('/grades')}>
//             <ListItemText primary="Grades" />
//           </ListItem>
//           <ListItem button onClick={() => handleNavigation('/announcements')}>
//             <ListItemText primary="Announcements" />
//           </ListItem>
          
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, padding: 3, marginLeft: 240 }}>
//         <Typography variant="h4">Welcome, {user?.name || 'Student'}!</Typography>
//         <Typography variant="h6" paragraph>
//           Your courses are listed below:
//         </Typography>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleNavigation('/calendar')}
//           sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
//         >
//           Calendar
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleNavigation('/courses')}
//           sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
//         >
//           Courses
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleNavigation('/grades')}
//           sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
//         >
//           Grades
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleNavigation('/announcements')}
//           sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
//         >
//           Announcements
//         </Button>
        

//         {/* Add cards for courses or additional content here */}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import img7 from '../images/img7.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        background: `url(${img7}) no-repeat center center`, // Add the image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Left Sidebar (Drawer) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(139, 0, 0, 0.8)', // Semi-transparent dark red
            color: 'white', // Set text color to white
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <Typography variant="h5" align="center">
              {user?.name || 'Student'}
            </Typography>
          </ListItem>
          {/* Sidebar items with hover effect */}
          <ListItem
            button
            onClick={() => handleNavigation('/calendar')}
            sx={{
              '&:hover': {
                backgroundColor: 'darkred', // Dark red on hover
              },
            }}
          >
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/courses')}
            sx={{
              '&:hover': {
                backgroundColor: 'darkred', // Dark red on hover
              },
            }}
          >
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/grades')}
            sx={{
              '&:hover': {
                backgroundColor: 'darkred', // Dark red on hover
              },
            }}
          >
            <ListItemText primary="Grades" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/announcements')}
            sx={{
              '&:hover': {
                backgroundColor: 'darkred', // Dark red on hover
              },
            }}
          >
            <ListItemText primary="Announcements" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: 240,
          paddingTop: '64px', // Adjust padding to match the height of the navbar
          minHeight: '100vh', // Ensure the background covers the full screen height
        }}
      >
        <Typography variant="h4" color="white">Welcome, {user?.name || 'Student'}!</Typography>
        <Typography variant="h6" paragraph color="white">
          Your courses are listed below:
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation('/calendar')}
          sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
        >
          Calendar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation('/courses')}
          sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
        >
          Courses
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation('/grades')}
          sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
        >
          Grades
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation('/announcements')}
          sx={{ width: '100%', textAlign: 'left', marginBottom: 2 }}
        >
          Announcements
        </Button>

        {/* Add cards for courses or additional content here */}
      </Box>
    </Box>
  );
};

export default Dashboard;
