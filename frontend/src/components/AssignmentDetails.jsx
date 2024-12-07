import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Container, Box, Drawer, List, ListItem, ListItemText, Button, TextField, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useSelector } from 'react-redux';

const AssignmentDetails = () => {
  const [assignment, setAssignment] = useState(null); // To store the specific assignment
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // To store the selected file
  const [message, setMessage] = useState(''); // To display success or error messages
  const [showSubmitForm, setShowSubmitForm] = useState(false); // To toggle form visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title } = useParams(); // Capture the assignment _id from the URL
  const user = useSelector((state) => state.auth.user); // Get the logged-in user
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        // Make the backend call to get the specific assignment by title
        const response = await axios.get(`http://localhost:5000/api/assignments/getAssignment/?title=${title}`);
        setAssignment(response.data.data);
      } catch (error) {
        setError(error.message || "Unable to fetch assignment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [title]); // The effect runs whenever the `title` changes

  if (!title) {
    return <p>No title provided in the URL.</p>;
  }

  if (loading)
    return <CircularProgress sx={{ margin: "auto", display: "block", marginTop: 4 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>
        {error}
      </Typography>
    );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);  // Ensure user ID is sent
    formData.append("assignmentId", assignment._id);  // Ensure assignment ID is sent

    console.log(assignment._id);

    try {
      const response = await axios.post('http://localhost:5000/api/submissions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmissionCount((prevCount) => prevCount + 1);
      setMessage(response.data.message || "Submission successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Submission failed. Please try again.");
    }
  };

  // Logout Function using Redux
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(139, 0, 0, 0.8)', // Semi-transparent dark red
            color: 'white', // Set text color to white
            position: 'fixed'
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
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Grades" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemText primary="Announcements" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard')}>
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

      {assignment ? (
        <>
          {/* Title Section */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#8B0000", // Dark red color for the title
              fontWeight: "bold",
              textAlign: "center", // Center the title
              marginBottom: "32px", // Add spacing between title and details box
            }}
          >
            {assignment.title}
          </Typography>

          {/* Details Section with Hover Effect */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px 32px", // Increase padding for a wider box
              maxWidth: "900px", // Increase the box width
              backgroundColor: "#ffffff",
              margin: "0 auto", // Keep the box centered
              transition: "all 0.3s ease", // Smooth transition for hover effect
              "&:hover": {
                backgroundColor: "#f0f0f0", // Lighter background on hover
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow on hover
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#8B0000", // Dark red color for the labels
                fontWeight: "bold",
                marginBottom: "4px", // Reduced space between label and content
              }}
            >
              Description:
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "12px" }}>
              {assignment.description}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#8B0000", // Dark red color for the labels
                fontWeight: "bold",
                marginBottom: "4px", // Reduced space between label and content
              }}
            >
              Due Date:
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "12px" }}>
              {new Date(assignment.dueDate).toLocaleDateString()}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#8B0000", // Dark red color for the labels
                fontWeight: "bold",
                marginBottom: "4px", // Reduced space between label and content
              }}
            >
              Points:
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "12px" }}>
              {assignment.points}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#8B0000", // Dark red color for the labels
                fontWeight: "bold",
                marginBottom: "4px", // Reduced space between label and content
              }}
            >
              Submission Type:
            </Typography>
            <Typography variant="body1">{assignment.submissionType}</Typography>
          </Box>

          {/* Submit Assignment Button */}
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                backgroundColor: '#1976D2',
                '&:hover': { backgroundColor: '#1565C0' },
              }}
              onClick={() => setShowSubmitForm(!showSubmitForm)}
            >
              {showSubmitForm ? "Hide Submission Form" : "Submit Assignment"}
            </Button>
          </Box>

          {/* Submit Form */}
          {showSubmitForm && (
            <Card
            elevation={3}
            sx={{
              backgroundColor: '#F0F8FF',
              padding: 4,
              maxWidth: 600,
              margin: 'auto',
              boxShadow: 3,
              marginTop: 4
            }}
          >
              <Typography variant="h5" gutterBottom>
                Submit Your Assignment
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            inputProps={{ accept: '.zip,.rar' }} // Restrict file types
            sx={{ marginBottom: 3 }}
          />
                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                  Submit
                </Button>
              </form>

              {message && (
                <Typography
                  variant="body2"
                  sx={{
                    color: message.includes("failed") ? 'red' : 'green',
                    marginTop: 2,
                    textAlign: 'center',
                  }}
                >
                  {message}
                </Typography>
              )}
            </Card>
          )}
           <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Total Submissions: {submissionCount}
        </Typography>
        </>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
          Assignment not found
        </Typography>
      )}
    </Container>
  );
};

export default AssignmentDetails;
