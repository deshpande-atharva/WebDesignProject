import React from 'react';
import TALayout from './TALayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddAssignment from './AddAssignment';
import AddGrades from './AddGrades';

const TADashboard = () => {
  return (
    <TALayout>
      <Routes>
        <Route path="/" element={<Navigate to="addassignment" />} />
        <Route path="addassignment" element={<AddAssignment />} />
        <Route path="addgrades" element={<AddGrades />} />
      </Routes>
    </TALayout>
  );
};

export default TADashboard;