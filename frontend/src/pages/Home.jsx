import { Container, Box, Typography, Button, Paper, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Background from '../images/Background.jpg';  // Import the new background image
import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg'; // Add the new image
import img6 from '../images/img6.jpeg';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',  // Make the Box container relative
          height: '100vh',
          background: `url(${Background}) no-repeat center center`,  // Update to Background.jpg
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',  // Align content at the bottom
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          width: '100%',  // Ensure full width
        }}
      >
        <Box sx={{ paddingBottom: 4 }}> {/* Add padding to prevent overlap */}
          <Typography variant="h3" component="h2" gutterBottom>
            WELCOME TO NORTHEASTERN
          </Typography>
          <Typography variant="h6" gutterBottom>
            A global research university, powered by experience
          </Typography>
          <Link to="/">  {/* Link to the login page */}
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: 'red',  // Set button color to red
                '&:hover': {
                  backgroundColor: 'darkred',  // Darker red on hover
                },
              }}
              size="large"
            >
              LOGIN
            </Button>
          </Link>
        </Box>
      </Box>

      {/* About Section */}
      <Container maxWidth="xl" sx={{ py: 8, px: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              ABOUT US
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 1898, we’re renowned for our experiential learning model, high-impact research,
              deep partnerships, and worldwide reach. From day one, we’ve pursued innovative ways of teaching
              and research that place a premium on experience and engagement with the world.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'red',  // Set button color to red
                '&:hover': {
                  backgroundColor: 'darkred',  // Darker red on hover
                },
                marginTop: 2,
              }}
            >
              Read More
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3}>
              <img src={img2} alt="About Us" style={{ width: '100%', height: 'auto' }} />
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Team Section */}
      <Container maxWidth="xl" sx={{ py: 8, px: 0 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          TEAM
        </Typography>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Meet our talented Directors
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ img: img3, name: 'Khaled Bugrara', title: 'Teaching Professor and Executive Director' },
            { img: img4, name: 'Erik Brenner', title: 'Director of Diversity Initiatives & Engagement' },
            { img: img5, name: 'Marissa Brush', title: 'Assistant Director of Enrollment Operations' }].map((member, index) => (
            <Box sx={{ width: '30%', margin: 2 }} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={member.img}
                  alt={member.name}
                  sx={{
                    height: 'auto',  // Allow image height to adjust automatically
                    objectFit: 'cover',  // Ensure images fit properly without stretching
                    width: '100%', // Ensure the image takes full width of the container
                    objectPosition: 'center',  // Center the image
                  }}
                />
                <CardContent>
                  <Typography variant="h5">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Contact Section */}
      <Container maxWidth="xl" sx={{ py: 8, px: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Office Address:</strong> Northeastern University, 360 Huntington Ave, Boston, MA 02115
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> contact@northeastern.edu
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> +1 617-373-2000
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <img src={img6} alt="Husky Logo" style={{ width: '80%', height: 'auto' }} />
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center', backgroundColor: '#333', color: 'white', width: '100%' }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} Northeastern University. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;


