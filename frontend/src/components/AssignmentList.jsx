import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
import { Assignment, CalendarToday } from "@mui/icons-material";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/getAll?courseId=${courseId}`);
        setAssignments(response.data.data);
      } catch (err) {
        setError("Unable to fetch assignments for this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <CircularProgress sx={{ margin: "auto", display: "block", marginTop: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                    to={`/assignments/${assignment._id}`}
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