import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { logout } from '../redux/authSlice';
import axios from 'axios';
import AddGrades from './AddGrades';
import AddAssignment from './AddAssignment';

const TADashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      const storedCourseIds = localStorage.getItem('assignedcourses');
      const courseIds = storedCourseIds ? storedCourseIds.split(',') : [];
      
      if (courseIds.length > 0) {
        try {
          const courseDataPromises = courseIds.map((id) => 
            axios.get(`http://localhost:5000/api/courses/${id}`)
          );
          const courseResponses = await Promise.all(courseDataPromises);
          const fetchedCourses = courseResponses.map((response) => response.data);
          setAssignedCourses(fetchedCourses);
        } catch (error) {
          console.error('Error fetching assigned courses:', error);
        }
      }
    };

    fetchAssignedCourses();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  const renderAssignedCourses = () => (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#d32f2f' }}>
        Assigned Courses
      </Typography>
      <Grid container spacing={4}>
        {assignedCourses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{
              backgroundColor: '#E8E8D8',
              padding: 3,
              margin: 'auto',
              marginTop: 2,
              borderRadius: 2,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Course Code:</strong> {course.courseCode}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Description:</strong> {course.description}
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2, marginTop: 'auto', textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#1976D2',
                    '&:hover': { backgroundColor: '#1565C0' },
                  }}
                  onClick={() => navigate(`/assignments/${course._id}`)}
                >
                  View Assignments
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return renderAssignedCourses();
      case 1:
        return <AddAssignment />;
      case 2:
        return <AddGrades />;
      default:
        return <Typography>Select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(139, 0, 0, 0.8)',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <Typography variant="h5" align="center">
              {user?.name || 'Teaching Assistant'}
            </Typography>
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(0)}>
            <ListItemText primary="Assigned Courses" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(1)}>
            <ListItemText primary="Add Assignments" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(2)}>
            <ListItemText primary="Add Grades" />
          </ListItem>
          <ListItem button onClick={handleLogout} sx={{ mt: 'auto' }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Container sx={{ mt: 3, flexGrow: 1 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default TADashboard;