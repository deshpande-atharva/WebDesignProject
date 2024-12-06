
import { useSelector } from 'react-redux';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Container } from '@mui/material';
 import { useEffect, useState } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
 import axios from 'axios';
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [ courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  //Fetch all available courses
  useEffect(() => {
    // Fetch the courses API
    axios.get('http://localhost:5000/api/courses') 
      .then((response) => {
        setCourses(response.data); // Set all courses
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, [courses]);

  // Fetch user enrolled courses
  useEffect(() => {
  // Ensure both user and courses are available
  if (user?.courses?.length > 0 && courses.length > 0) {
    // Normalize data for comparison and filter enrolled courses
    const enrolledCoursesList = courses.filter(course => 
      user.courses.some(enrolledCode => String(enrolledCode).toLowerCase() === String(course.courseCode).toLowerCase())
    );

    // Update the state with the filtered courses
    setEnrolledCourses(enrolledCoursesList);
  } else {
    setEnrolledCourses([]); // Reset enrolled courses if data is incomplete
  }
}, [user, courses]);

const renderCalendarContent = () => (
  <Box>
  <Grid container spacing={4}>
    {enrolledCourses.map((job, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: '#F7F7E8',
            padding: 4,
            margin: 'auto',
            marginTop: 4,
            maxWidth: 600,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
        <Typography variant="h6" component="div">
          {courses.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {courses.courseCode}
        </Typography>
      
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
);

const renderCourseContent = () => (
  <Box>
    <Grid container spacing={4}>
      {enrolledCourses.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            elevation={3}
            sx={{
              backgroundColor: '#F7F7E8',
              padding: 4,
              margin: 'auto',
              marginTop: 4,
              maxWidth: 600,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardContent>
          <Typography variant="h6" component="div">
            {courses.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {courses.courseCode}
          </Typography>
        
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
</Box>
);

const renderGradesContent = () => (
  <Box>
  <Grid container spacing={4}>
    {enrolledCourses.map((job, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: '#F7F7E8',
            padding: 4,
            margin: 'auto',
            marginTop: 4,
            maxWidth: 600,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
        <Typography variant="h6" component="div">
          {courses.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {courses.courseCode}
        </Typography>
      
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
);

const renderAnnouncementsContent = () => (
  <Box>
  <Grid container spacing={4}>
    {enrolledCourses.map((job, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: '#F7F7E8',
            padding: 4,
            margin: 'auto',
            marginTop: 4,
            maxWidth: 600,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
        <Typography variant="h6" component="div">
          {courses.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {courses.courseCode}
        </Typography>
      
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
);

  return (
    <Box
      sx={{
        display: 'flex',
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
          <ListItem button onClick={() => setSelectedTab(0)}>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button onClick={ () => setSelectedTab(1)}>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(2)}>
            <ListItemText primary="Grades" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(3)}>
            <ListItemText primary="Announcements" />
          </ListItem>
        </List>
      </Drawer>
      <Container sx={{ mt: 3 }}>
          {selectedTab === 0 && renderCalendarContent()}
          {selectedTab === 1 && renderCourseContent()}
          {selectedTab === 2 && renderGradesContent()}
          {selectedTab === 3 && renderAnnouncementsContent()}
        </Container>
    </Box>
  );
};

export default Dashboard;