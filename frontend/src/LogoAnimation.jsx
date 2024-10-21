import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap'; // Import ProgressBar
import './LogoAnimation.css'; 

const LogoAnimation = ({ onComplete }) => {
  //const [progress, setProgress] = useState(0); // State for progress
  useEffect(() => {
    // Trigger the onComplete function after the animation duration
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds for animation

    return () => {
      clearTimeout(timer); // Cleanup timer
    };
  }, [onComplete]);


  return (
    <div className="logo-animation-container">
      <div className="college-logo">N</div>
    </div>
  );
};

export default LogoAnimation;
