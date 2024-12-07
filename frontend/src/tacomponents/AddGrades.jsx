import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddGrades = () => {
  const [formData, setFormData] = useState({ studentId: '', subject: '', grade: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Grade Submitted:', formData);
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
    </Box>
  );
};

export default AddGrades;
