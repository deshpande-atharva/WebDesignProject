// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { CircularProgress, Typography, Container, Box } from "@mui/material";

// const AssignmentDetails = () => {
//   const { title } = useParams();  // Capture the assignment _id from the URL
//   if (!title) {
//     return <p>No title provided in the URL.</p>;
//   }
//   const [assignment, setAssignment] = useState(null); // To store the specific assignment
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAssignmentDetails = async () => {
//       try {
//         // Make the backend call to get the specific assignment by ID
//         const response = await axios.get(`http://localhost:5000/api/assignments/getAssignment/?title=${title}`);
//         setAssignment(response.data.data);
//       } catch (err) {
//         setError("Unable to fetch assignment details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignmentDetails();
//   }, [title]);  // The effect runs whenever the `id` changes

//   if (loading) return <CircularProgress sx={{ margin: "auto", display: "block", marginTop: 4 }} />;
//   if (error) return <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>{error}</Typography>;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       {assignment ? (
//         <Box>
//           <Typography variant="h4" gutterBottom>{assignment.title}</Typography>
//           <Typography variant="h6">Description: {assignment.description}</Typography>
//           <Typography variant="body1">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</Typography>
//           <Typography variant="body1">Points: {assignment.points}</Typography>
//           <Typography variant="body1">Submission Type: {assignment.submissionType}</Typography>
//           {/* Add more fields as necessary */}
//         </Box>
//       ) : (
//         <Typography variant="h6" sx={{ textAlign: "center" }}>Assignment not found.</Typography>
//       )}
//     </Container>
//   );
// };

// export default AssignmentDetails;






import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Container, Box } from "@mui/material";

const AssignmentDetails = () => {
  const { title } = useParams(); // Capture the assignment _id from the URL
  if (!title) {
    return <p>No title provided in the URL.</p>;
  }
  const [assignment, setAssignment] = useState(null); // To store the specific assignment
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        // Make the backend call to get the specific assignment by title
        const response = await axios.get(`http://localhost:5000/api/assignments/getAssignment/?title=${title}`);
        setAssignment(response.data.data);
      } catch (err) {
        setError("Unable to fetch assignment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [title]); // The effect runs whenever the `title` changes

  if (loading)
    return <CircularProgress sx={{ margin: "auto", display: "block", marginTop: 4 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Assignment not found.
        </Typography>
      )}
    </Container>
  );
};

export default AssignmentDetails;
