import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import apiService from "../redux/apiService";

const Calendar = ({ courseId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (courseId) {
      apiService
        .get(`/schedule?courseId=674ce22fffeceed88f5b04d6`)
        .then((response) => setSchedule(response.data))
        .catch((error) => console.log("Error fetching schedules:", error));
    }
  }, [courseId]);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startCalendar = startOfWeek(startMonth);
  const endCalendar = endOfWeek(endMonth);

  const days = [];
  let day = startCalendar;

  while (day <= endCalendar) {
    days.push(day);
    day = addDays(day, 1);
  }


  const renderDays = () => {
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <Box display="flex" justifyContent="space-between">
        {headers.map((header, index) => (
          <Box flex={1} key={index} textAlign="center">
            <Typography variant="h6">{header}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderCells = () => {
    return (
      <Box display="flex" flexWrap="wrap">
        {days.map((day, index) => {
          const dayNumber = format(day, "d");
          const dayOfWeek = format(day, "EEEE");
          const dayEvents = schedule.filter(event =>
            event.days.includes(dayOfWeek) &&
            new Date(event.startDate) <= day &&
            new Date(event.endDate) >= day
          );

          return (
            <Box
              key={index}
              flex="1 0 14%"
              height="100px"
              border="1px solid #ddd"
              backgroundColor={isSameMonth(day, startMonth) ? "#fff" : "#f5f5f5"}
              textAlign="center"
              position="relative"
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: isSameDay(day, new Date()) ? "bold" : "normal",
                  color: isSameDay(day, new Date()) ? "#d32f2f" : "inherit",
                }}
              >
                {dayNumber}
              </Typography>

              {dayEvents.map((event, i) => (
                <Box
                  key={i}
                  sx={{
                    fontSize: "0.8rem",
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    padding: "2px",
                    borderRadius: "5px",
                    marginTop: "5px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.location} ({event.time})
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#d32f2f", fontWeight: "bold" }}
      >
        {format(currentDate, "MMMM yyyy")}
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
          onClick={() => setCurrentDate((prev) => addDays(prev, -30))}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
          onClick={() => setCurrentDate((prev) => addDays(prev, 30))}
        >
          Next
        </Button>
      </Box>

      {renderDays()}
      {renderCells()}
    </Box>
  );
};

Calendar.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default Calendar;
