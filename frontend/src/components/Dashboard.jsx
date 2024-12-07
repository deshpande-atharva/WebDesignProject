import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Container,CardMedia } from '@mui/material';
 import { useEffect, useState } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { logout } from '../redux/authSlice'; 
import { useDispatch } from 'react-redux';
 import axios from 'axios';
import { Button, Stack } from '@mui/material';
import { CheckCircleOutline, MarkEmailUnread } from '@mui/icons-material';
import apiService from '../redux/apiService';
import img7 from '../images/img7.jpg';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedule, setSchedule] = useState([]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch courses based on IDs stored in localStorage
  useEffect(() => {
    const storedCourseIds = localStorage.getItem('courses'); // Fetch course IDs
    const courseIds = storedCourseIds ? storedCourseIds.split(',') : [];

    if (courseIds.length > 0) {
      // Fetch details for each course
      const fetchCourses = async () => {
        try {
          const courseDataPromises = courseIds.map((id) =>
            axios.get(`http://localhost:5000/api/courses/${id}`)
          );
          const courseResponses = await Promise.all(courseDataPromises);
          const fetchedCourses = courseResponses.map((response) => response.data);
          setEnrolledCourses(fetchedCourses);
        } catch (error) {
          console.error('Error fetching enrolled courses:', error);
        }
      };

      fetchCourses();
    }
  }, []);

    // Logout Function using Redux
    const handleLogout = () => {
      // Dispatch logout action and clear localStorage
      dispatch(logout());
      
      localStorage.clear();
      navigate('/');
    };

    const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const sampleAnnouncements = [
      {
        title: 'Exciting Research Opportunities in Engineering at Northeastern College',
        description: 'Explore cutting-edge research opportunities with renowned faculty on projects ranging from renewable energy systems to robotics.',
        read: false,
      },
      {
        title: 'Engineering Industry Collaboration at Northeastern College',
        description: 'Join collaborative projects with top engineering firms, solving real-world challenges in product development and innovation.',
        read: false,
      },
      {
        title: 'Interdisciplinary Engineering Projects at Northeastern College',
        description: 'Collaborate across disciplines like mechanical, electrical, civil, and computer engineering for innovative project development.',
        read: false,
      },
      {
        title: 'Advanced Engineering Workshops and Seminars at Northeastern College',
        description: 'Attend workshops and seminars to engage with industry experts and enhance your skills in emerging engineering technologies.',
        read: false,
      },
      {
        title: 'Engineering Mentorship Program at Northeastern College',
        description: 'Participate in a mentorship program that pairs you with professionals and faculty for personalized guidance throughout your academic journey.',
        read: false,
      },
      {
        title: 'State-of-the-Art Engineering Labs at Northeastern College',
        description: 'Access advanced labs equipped with the latest technology to support hands-on learning and innovative project development.',
        read: false,
      },
      {
        title: 'Student-Led Engineering Clubs and Societies',
        description: 'Join vibrant student-led clubs and societies focused on robotics, AI, sustainable energy, and more.',
        read: false,
      },
      {
        title: 'Entrepreneurship Opportunities for Engineering Students',
        description: 'Learn how to transform your innovative ideas into startups through our entrepreneurship initiatives and support.',
        read: false,
      },
      {
        title: 'Engineering Leadership Development Program',
        description: 'Develop leadership skills through structured programs designed to prepare you for managerial roles in engineering.',
        read: false,
      },
      {
        title: 'Global Engineering Exchange Programs',
        description: 'Participate in global exchange programs to gain international exposure and collaborate with students from partner universities.',
        read: false,
      },
      {
        title: 'Sustainability and Green Technology Initiatives',
        description: 'Work on sustainability projects focused on renewable energy, waste management, and eco-friendly technologies.',
        read: false,
      },
      {
        title: 'AI and Machine Learning Research at Northeastern College',
        description: 'Join research groups working on cutting-edge AI and machine learning projects to solve real-world problems.',
        read: false,
      },
      {
        title: 'Networking Events with Industry Leaders',
        description: 'Attend networking events and career fairs to connect with industry leaders and explore career opportunities.',
        read: false,
      },
      {
        title: 'Cybersecurity Research and Training Programs',
        description: 'Participate in cybersecurity research and training to address the growing challenges in information security.',
        read: false,
      },
      {
        title: 'Data Science Bootcamps for Engineering Students',
        description: 'Enhance your data science skills through intensive bootcamps designed for engineering students.',
        read: false,
      },
    ];

    apiService.get('/announcements')
      .then(response => setAnnouncements(response.data || sampleAnnouncements))
      .catch(() => setAnnouncements(sampleAnnouncements));
  }, []);

  const handleRead = (index) => {
    setAnnouncements((prevAnnouncements) => {
      const updatedAnnouncements = [...prevAnnouncements];
      updatedAnnouncements[index].read = true;
      return updatedAnnouncements;
    });
  };

   // Fetch courses based on IDs stored in localStorage
   useEffect(() => {
    const storedCourseIds = localStorage.getItem('courses');
    const courseIds = storedCourseIds ? storedCourseIds.split(',') : [];
    if (courseIds.length > 0) {
      const fetchCourses = async () => {
        try {
          const courseDataPromises = courseIds.map((id) => axios.get(`http://localhost:5000/api/courses/${id}`));
          const courseResponses = await Promise.all(courseDataPromises);
          const fetchedCourses = courseResponses.map((response) => response.data);
          setCourses(fetchedCourses);

          // Fetch schedules for all courses
          const fetchSchedules = async () => {
            try {
              const schedulePromises = courseIds.map((courseId) => 
                axios.get(`http://localhost:5000/api/schedules?courseId=${courseId}`)
              );
              const scheduleResponses = await Promise.all(schedulePromises);
              const fetchedSchedules = scheduleResponses.map((response) => response.data);
              setSchedule(fetchedSchedules);
            } catch (error) {
              console.error('Error fetching schedules:', error);
            }
          };
          fetchSchedules();
        } catch (error) {
          console.error('Error fetching enrolled courses:', error);
        }
      };
      fetchCourses();
    }
  }, []);

  const renderCourseContent = () => (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" sx={{ 
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#d32f2f', // Red color for the heading
      }}>
          Enrolled Courses
        </Typography>
        <Grid container spacing={4}>
          {enrolledCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  backgroundColor: '#E8E8D8', // Fresh background color (light blue)
                  padding: 3,
                  margin: 'auto',
                  marginTop: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Course Code:</strong> {course.courseCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Description:</strong> {course.description}
                  </Typography>
                </CardContent>
                {/* Button to view details */}
                <Box sx={{ padding: 2, marginTop: 'auto', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#1976D2', // Blue background for the button
                      '&:hover': { backgroundColor: '#1565C0' }, // Darker blue on hover
                      
                    }}
                    onClick={() => alert(`Viewing details for ${course.name}`)} // Replace with actual navigation or action
                  >
                    View Assignments
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  

const renderScheduleContent = () => (
  <Box sx={{ margin: 3 }}>
    <Typography variant="h4" align="center" sx={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#d32f2f', // Red color for the heading
       }}>
      Course Schedule
    </Typography>
    {schedule.length === 0 ? (
      <Typography variant="body1" align="center">No schedule available</Typography>
    ) : (
      schedule.map((scheduleItems, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          {/* Grid Container */}
          <Grid container spacing={3} justifyContent="center">
            {scheduleItems.map((scheduleItem) => (
              <Grid item key={scheduleItem._id} xs={12} sm={6} md={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Image in the Card */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={img7}  // Placeholder image
                    alt="Course Image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {`Days: ${scheduleItem.days.join(', ')}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`Time: ${scheduleItem.time}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`Location: ${scheduleItem.location}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Duration: ${new Date(scheduleItem.duration.startDate).toLocaleDateString()} - ${new Date(scheduleItem.duration.endDate).toLocaleDateString()}`}
                    </Typography>
                  </CardContent>
                  {/* Course Name under the card */}
                  <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {courses[index]?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))
    )}
  </Box>
);

const renderGradesContent = () => (
  <Box>
  <Grid container spacing={2}>
    {enrolledCourses.map((job, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: '#F7F7E8',
            padding: 4,
            marginTop: 4,
            maxWidth: 600,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
        <Typography variant="h6" component="div">
          {courses.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {courses.courseCode}
        </Typography>
      
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
);

const renderAnnouncementsContent = () => (
  <Box sx={{ padding: 3 }}>
    <Typography
      variant="h4"
      sx={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#d32f2f', // Red color for the heading
      }}
    >
      Announcements
    </Typography>
    <Stack spacing={3} direction="row" flexWrap="wrap" justifyContent="center">
      {announcements.map((announcement, index) => (
        <Box
          key={index}
          sx={{
            width: { xs: '100%', sm: '45%', md: '30%' }, // Responsive width
          }}
        >
          <Card
            sx={{
              backgroundColor: announcement.read ? '#f5f5f5' : '#fff',
              boxShadow: announcement.read ? 'none' : '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
              borderRadius: 3,
              height: 300, // Fixed height for cards
              display: 'flex',
              marginTop: 5,
              flexDirection: 'column',
              justifyContent: 'space-between',
              '&:hover': {
                boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#d32f2f',
                  textAlign: 'center',
                }}
              >
                {announcement.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 1,
                  marginBottom: 2,
                  flexGrow: 1,
                  textAlign: 'center',
                }}
              >
                {announcement.description}
              </Typography>
            </CardContent>
            <Button
              startIcon={announcement.read ? <CheckCircleOutline /> : <MarkEmailUnread />}
              variant="outlined"
              sx={{
                backgroundColor: announcement.read ? '#fff' : '#d32f2f',
                color: announcement.read ? '#d32f2f' : '#fff',
                borderColor: '#d32f2f',
                width: '90%', // Slightly smaller button width for alignment
                alignSelf: 'center', // Centers the button in the card
                marginBottom: 2, // Adds margin below the button
                '&:hover': {
                  backgroundColor: announcement.read ? '#f5f5f5' : '#b71c1c',
                },
              }}
              onClick={() => handleRead(index)}
            >
              {announcement.read ? 'Read' : 'Mark as Read'}
            </Button>
          </Card>
        </Box>
      ))}
    </Stack>
  </Box>
);

  // const renderScheduleContent = () => (
  //   <Box>
  //     <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
  //       Course Schedule
  //     </Typography>
  //     {schedule.length === 0 ? (
  //       <Typography variant="body1" align="center">No schedule available</Typography>
  //     ) : (
  //       schedule.map((scheduleItems, index) => (
  //         <Box key={index}>
  //           <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
  //             {courses[index]?.name} Schedule
  //           </Typography>
  //           {scheduleItems.map((scheduleItem) => (
  //             <Card key={scheduleItem._id} sx={{ marginBottom: 3, padding: 2 }}>
  //               <CardContent>
  //                 <Typography variant="h6" component="div">{`Days: ${scheduleItem.days.join(', ')}`}</Typography>
  //                 <Typography variant="body1" color="text.secondary">{`Time: ${scheduleItem.time}`}</Typography>
  //                 <Typography variant="body1" color="text.secondary">{`Location: ${scheduleItem.location}`}</Typography>
  //                 <Typography variant="body2" color="text.secondary">{`Duration: ${new Date(scheduleItem.duration.startDate).toLocaleDateString()} - ${new Date(scheduleItem.duration.endDate).toLocaleDateString()}`}</Typography>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </Box>
  //       ))
  //     )}
  //   </Box>
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Left Sidebar (Drawer) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(139, 0, 0, 0.8)', // Semi-transparent dark red
            color: 'white', // Set text color to white
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
          <ListItem button onClick={ () => setSelectedTab(0)}>
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(1)}>
            <ListItemText primary="Grades" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab(2)}>
            <ListItemText primary="Announcements" />
          </ListItem>
          <ListItem button onClick={ () => setSelectedTab(3)}>
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
      <Container sx={{ mt: 3 }}>
          
          {selectedTab === 0 && renderCourseContent()}
          {selectedTab === 1 && renderGradesContent()}
          {selectedTab === 2 && renderAnnouncementsContent()}
          {selectedTab === 3 && renderScheduleContent()}
        </Container>
    </Box>
  );
};

export default Dashboard;
