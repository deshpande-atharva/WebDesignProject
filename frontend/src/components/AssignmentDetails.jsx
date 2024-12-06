import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress, Container } from "@mui/material";

const AssignmentDetails = () => {
  const { title } = useParams(); // Capture the assignment title from the route
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/assignments/getAssignment/?title=${title}`
        );
        setAssignment(response.data); // Assume the API returns the assignment details
      } catch (err) {
        setError("Unable to fetch the assignment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [title]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {assignment?.title}
      </Typography>
      <Typography variant="body1">
        {assignment?.description || "No description available."}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Due Date: {assignment?.dueDate || "No due date provided."}
      </Typography>
    </Container>
  );
};

export default AssignmentDetails;
