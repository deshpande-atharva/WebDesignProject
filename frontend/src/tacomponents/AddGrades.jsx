import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const AddGrades = () => {
  const [formData, setFormData] = useState({ studentId: '', subject: '', grade: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/grades', formData);
      console.log('Grade Submitted:', response.data);
      setSnackbar({ open: true, message: 'Grade submitted successfully' });
      setFormData({ studentId: '', subject: '', grade: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting grade:', error);
      setSnackbar({ open: true, message: 'Error submitting grade' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Grades
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <TextField
          label="Student ID"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          required
        />
        <TextField
          label="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
        <TextField
          label="Grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#d32f2f', color: '#fff' }}>
          Submit
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  );
};

export default AddGrades;