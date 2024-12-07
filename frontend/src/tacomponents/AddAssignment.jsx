// components/AddAssignment.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssignment } from '../redux/assignmentsSlice';  // Import the async action
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const AddAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: '',
    dueDate: '',
    allowedAttempts: '',
    submissionType: '',
    submissionDetails: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch(); // Use dispatch from Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the action to create the assignment
      const resultAction = await dispatch(addAssignment(formData));

      // Check if the action was successful
      if (addAssignment.fulfilled.match(resultAction)) {
        setSuccess('Assignment created successfully!');
        setError('');
        setFormData({  // Reset form
          title: '',
          description: '',
          points: '',
          dueDate: '',
          allowedAttempts: '',
          submissionType: '',
          submissionDetails: ''
        });
      }
    } catch (err) {
      setSuccess('');
      setError('Failed to create the assignment.');
      console.error('Error creating assignment:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Assignment
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            width: '100%'
          }}
        >
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            size="small"
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            size="small"
          />
          <TextField
            label="Points"
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: e.target.value })}
            required
            size="small"
          />
          <TextField
            label="Due Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
            size="small"
          />
          <TextField
            label="Allowed Attempts"
            type="number"
            value={formData.allowedAttempts}
            onChange={(e) => setFormData({ ...formData, allowedAttempts: e.target.value })}
            required
            size="small"
          />
          <FormControl required size="small">
            <InputLabel>Submission Type</InputLabel>
            <Select
              value={formData.submissionType}
              label="Submission Type"
              onChange={(e) => setFormData({ ...formData, submissionType: e.target.value })}
            >
              <MenuItem value="file">File</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="link">Link</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Submission Details"
            multiline
            rows={2}
            value={formData.submissionDetails}
            onChange={(e) => setFormData({ ...formData, submissionDetails: e.target.value })}
            size="small"
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              backgroundColor: '#d32f2f', 
              color: '#fff',
              '&:hover': {
                backgroundColor: '#9a0007'
              }
            }}
          >
            Create Assignment
          </Button>
        </form>
        {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ marginTop: 2 }}>{success}</Typography>}
      </Box>
    </Container>
  );
};

export default AddAssignment;
