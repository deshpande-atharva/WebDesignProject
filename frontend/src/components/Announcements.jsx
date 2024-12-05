// import { useEffect, useState } from 'react';
// import { Box, Button, Typography, Card, CardContent, Stack } from '@mui/material';
// import { CheckCircleOutline, MarkEmailUnread } from '@mui/icons-material';
// import apiService from '../redux/apiService';

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     const sampleAnnouncements = [
//       {
//         title: 'Exciting Research Opportunities in Engineering at Northeastern College',
//         description: 'Explore cutting-edge research opportunities with renowned faculty on projects ranging from renewable energy systems to robotics.',
//         read: false,
//       },
//       {
//         title: 'Engineering Industry Collaboration at Northeastern College',
//         description: 'Join collaborative projects with top engineering firms, solving real-world challenges in product development and innovation.',
//         read: false,
//       },
//       {
//         title: 'Interdisciplinary Engineering Projects at Northeastern College',
//         description: 'Collaborate across disciplines like mechanical, electrical, civil, and computer engineering for innovative project development.',
//         read: false,
//       },
//       {
//         title: 'Advanced Engineering Workshops and Seminars at Northeastern College',
//         description: 'Attend workshops and seminars to engage with industry experts and enhance your skills in emerging engineering technologies.',
//         read: false,
//       },
//       {
//         title: 'Engineering Mentorship Program at Northeastern College',
//         description: 'Participate in a mentorship program that pairs you with professionals and faculty for personalized guidance throughout your academic journey.',
//         read: false,
//       },
//       {
//         title: 'State-of-the-Art Engineering Labs at Northeastern College',
//         description: 'Access advanced labs equipped with the latest technology to support hands-on learning and innovative project development.',
//         read: false,
//       },
//       {
//         title: 'Student-Led Engineering Clubs and Societies',
//         description: 'Join vibrant student-led clubs and societies focused on robotics, AI, sustainable energy, and more.',
//         read: false,
//       },
//       {
//         title: 'Entrepreneurship Opportunities for Engineering Students',
//         description: 'Learn how to transform your innovative ideas into startups through our entrepreneurship initiatives and support.',
//         read: false,
//       },
//       {
//         title: 'Engineering Leadership Development Program',
//         description: 'Develop leadership skills through structured programs designed to prepare you for managerial roles in engineering.',
//         read: false,
//       },
//       {
//         title: 'Global Engineering Exchange Programs',
//         description: 'Participate in global exchange programs to gain international exposure and collaborate with students from partner universities.',
//         read: false,
//       },
//       {
//         title: 'Sustainability and Green Technology Initiatives',
//         description: 'Work on sustainability projects focused on renewable energy, waste management, and eco-friendly technologies.',
//         read: false,
//       },
//       {
//         title: 'AI and Machine Learning Research at Northeastern College',
//         description: 'Join research groups working on cutting-edge AI and machine learning projects to solve real-world problems.',
//         read: false,
//       },
//       {
//         title: 'Networking Events with Industry Leaders',
//         description: 'Attend networking events and career fairs to connect with industry leaders and explore career opportunities.',
//         read: false,
//       },
//       {
//         title: 'Cybersecurity Research and Training Programs',
//         description: 'Participate in cybersecurity research and training to address the growing challenges in information security.',
//         read: false,
//       },
//       {
//         title: 'Data Science Bootcamps for Engineering Students',
//         description: 'Enhance your data science skills through intensive bootcamps designed for engineering students.',
//         read: false,
//       },
//     ];

//     apiService.get('/announcements')
//       .then(response => setAnnouncements(response.data || sampleAnnouncements))
//       .catch(() => setAnnouncements(sampleAnnouncements));
//   }, []);

//   const handleRead = (index) => {
//     setAnnouncements((prevAnnouncements) => {
//       const updatedAnnouncements = [...prevAnnouncements];
//       updatedAnnouncements[index].read = true;
//       return updatedAnnouncements;
//     });
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: 'center',
//           fontWeight: 'bold',
//           marginBottom: 4,
//           color: '#d32f2f', // Red color for the heading
//         }}
//       >
//         Announcements
//       </Typography>
//       <Stack spacing={3} direction="row" flexWrap="wrap" justifyContent="center">
//         {announcements.map((announcement, index) => (
//           <Box
//             key={index}
//             sx={{
//               width: { xs: '100%', sm: '45%', md: '30%' },
//               margin: '10px',
//             }}
//           >
//             <Card
//               sx={{
//                 backgroundColor: announcement.read ? '#f5f5f5' : '#fff',
//                 boxShadow: announcement.read ? 'none' : '0 4px 20px rgba(0,0,0,0.1)',
//                 transition: 'all 0.3s ease-in-out',
//                 borderRadius: 3,
//                 '&:hover': {
//                   boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
//                   transform: 'translateY(-5px)',
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 'bold',
//                     color: '#d32f2f',
//                     textAlign: 'center',
//                   }}
//                 >
//                   {announcement.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 2 }}>
//                   {announcement.description}
//                 </Typography>
//                 <Button
//                   startIcon={announcement.read ? <CheckCircleOutline /> : <MarkEmailUnread />}
//                   variant="outlined"
//                   sx={{
//                     backgroundColor: announcement.read ? '#fff' : '#d32f2f',
//                     color: announcement.read ? '#d32f2f' : '#fff',
//                     borderColor: '#d32f2f',
//                     width: '100%',
//                     '&:hover': {
//                       backgroundColor: announcement.read ? '#f5f5f5' : '#b71c1c',
//                     },
//                   }}
//                   onClick={() => handleRead(index)}
//                 >
//                   {announcement.read ? 'Read' : 'Mark as Read'}
//                 </Button>
//               </CardContent>
//             </Card>
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Announcements;


import { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { CheckCircleOutline, MarkEmailUnread } from '@mui/icons-material';
import apiService from '../redux/apiService';

const Announcements = () => {
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
      .then((response) => setAnnouncements(response.data || sampleAnnouncements))
      .catch(() => setAnnouncements(sampleAnnouncements));
  }, []);

  const handleRead = (index) => {
    setAnnouncements((prevAnnouncements) => {
      const updatedAnnouncements = [...prevAnnouncements];
      updatedAnnouncements[index].read = true;
      return updatedAnnouncements;
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 4,
          color: '#d32f2f',
        }}
      >
        Announcements
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {announcements.map((announcement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: announcement.read ? '#f5f5f5' : '#fff',
                boxShadow: announcement.read ? 'none' : '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                borderRadius: 3,
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
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
                <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 2 }}>
                  {announcement.description}
                </Typography>
                <Button
                  startIcon={announcement.read ? <CheckCircleOutline /> : <MarkEmailUnread />}
                  variant="outlined"
                  sx={{
                    backgroundColor: announcement.read ? '#fff' : '#d32f2f',
                    color: announcement.read ? '#d32f2f' : '#fff',
                    borderColor: '#d32f2f',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: announcement.read ? '#f5f5f5' : '#b71c1c',
                    },
                  }}
                  onClick={() => handleRead(index)}
                >
                  {announcement.read ? 'Read' : 'Mark as Read'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Announcements;


