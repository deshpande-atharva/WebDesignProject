import  { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { Assignment, CalendarToday } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { logout } from "../redux/authSlice";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/getAll?courseId=${courseId}`);
        setAssignments(response.data.data);
      } catch (error) {
        setError(error.message || "Unable to fetch assignments for this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <CircularProgress sx={{ margin: "auto", display: "block", marginTop: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>{error}</Typography>;

  // Logout Function using Redux
  const handleLogout = () => {
    // Dispatch logout action and clear localStorage
    dispatch(logout);
    
    localStorage.clear();
    navigate('/');
  };

  return (

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            position:'fixed'
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
          <ListItem button onClick={ () => navigate('/dashboard')}>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Grades" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Announcements" />
          </ListItem>
          <ListItem button onClick={ () => navigate('/dashboard')}>
            <ListItemText primary="Schedule" />
          </ListItem>
        {/* Position Logout button at bottom left */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            
            backgroundColor: 'black',
            paddingX: 3,
            paddingY: 1,
            boxShadow: 3,
          }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
        </List>
      </Drawer>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#d32f2f", textAlign: "center", mb: 4 }}>
        Course Assignments
      </Typography>
      {assignments.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary" }}>
          No assignments found for this course.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment._id}>
              <Card 
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft:10,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {assignment.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarToday sx={{ mr: 1, color: '#d32f2f' }} />
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<Assignment />}
                    label={`Points: ${assignment.points}`}
                    color="primary"
                    size="small"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/assignmentdetails/${encodeURIComponent(assignment.title)}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  > 
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AssignmentList;