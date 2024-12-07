import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const TALayout = ({ children }) => {
  const navigate = useNavigate();
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Add Assignment', icon: <AssignmentIcon />, path: 'addassignment' },
    { text: 'Add Grades', icon: <GradeIcon />, path: 'addgrades' }
  ];

  const handleNavigation = (path) => {
    navigate(`/ta/${path}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            borderRight: '1px solid #ddd'
          },
        }}
      >
        <Box sx={{ overflow: 'auto', marginTop: '64px' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#d32f2f' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          marginLeft: `${drawerWidth}px`,
          backgroundColor: '#fff'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TALayout;