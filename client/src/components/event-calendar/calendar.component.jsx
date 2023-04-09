import React, { useContext } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Link } from "react-router-dom";
import { EventContext } from "../../contexts/event.context";

const CalendarWrapper = styled("div")(({ theme }) => ({
  maxWidth: "500px",
  width: "100%",
  maxHeight: "600px",
  height: "100%",
  boxShadow: "0.5rem 0.5rem black, -0.5rem -0.5rem #ccc",
  padding: "10px",
}));

const CalendarDay = styled("div")(({ theme }) => ({
  padding: "10px",
  width: "50px",
  height: "50px",
  border: "1.5px solid gray",
  color: "#111",
  textAlign: "center",
  borderRadius: "100%",
  cursor: "grab",
  "&:hover": {
    opacity: "0.5",
  },
}));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Day = {
  year: 2022,
  month: 1, // do not forgot, minus 1 in the month array!!
  dayOfMonth: 1,
  title: "",
};

const MyCalendar = ({ highlightedDays }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [today, setToday] = useState(new Date());
  const { events } = useContext(EventContext);

  useEffect(() => {
    setToday(new Date());
    setIsLoading(false);
  }, []);

  const getRandomColor = () => {
    const colors = ["green", "red", "orange", "black", "purple"];
    const randomNumber = parseInt(Math.random() * colors.length);
    return colors[randomNumber];
  };

  const getNameOfMonth = (number) => {
    return months[number];
  };

  const isDayExistsInHighlightedDays = (day) => {
    const currentYear = parseInt(
      moment(today).format("YYYY-MM-DD").split("-")[0]
    );
    const currentMonth = parseInt(
      moment(today).format("YYYY-MM-DD").split("-")[1]
    );

    for (let i = 0; i < highlightedDays.length; i++) {
      const element = highlightedDays[i].dayOfMonth;
      if (
        element === day &&
        highlightedDays[i].month === currentMonth &&
        highlightedDays[i].year === currentYear
      ) {
        return true;
      }
    }
    return false;
  };

  const forwardPaginating = () => {
    const currentDate = moment(today).format("YYYY-MM-DD");
    let year = parseInt(currentDate.split("-")[0]);
    let month = parseInt(currentDate.split("-")[1]);

    if (month === months.length) {
      year += 1;
      setToday(new Date(`${year}-01-01`));
    } else {
      month += 1;
      setToday(new Date(`${year}-${month}-01`));
    }
  };

  const backwardsPaginating = () => {
    const currentDate = moment(today).format("YYYY-MM-DD");
    let year = parseInt(currentDate.split("-")[0]);
    let month = parseInt(currentDate.split("-")[1]);

    if (month === 1) {
      year -= 1;
      setToday(new Date(`${year}-12-01`));
    } else {
      month -= 1;
      setToday(new Date(`${year}-${month}-01`));
    }
  };

  const renderAvailableDays = () => {
    const maximumDaysInTheMonth = moment(today).daysInMonth();
    const days = [];

    for (let i = 0; i < maximumDaysInTheMonth; i++) {
      days[i] = i + 1;
    }

    return days.map((day, i) => {
      if (highlightedDays) {
        if (isDayExistsInHighlightedDays(day)) {
          const { title } = highlightedDays.find((x) => {
            if (x.dayOfMonth === day) {
              return x;
            }
          });
          const findedEvent = events.find((event) => event.Name === title);

          return (
            <Grid item key={i + day}>
              <Tooltip title={title}>
                <Link to={`/event/details/${findedEvent.id}`}>
                  <CalendarDay
                    key={i + day}
                    style={{
                      color: "#fff",
                      backgroundColor: getRandomColor(),
                      border: "none",
                    }}
                  >
                    {day}
                  </CalendarDay>
                </Link>
              </Tooltip>
            </Grid>
          );
        }

        return (
          <Grid item key={i + day}>
            <CalendarDay>{day}</CalendarDay>
          </Grid>
        );
      }

      return (
        <Grid item key={i + day}>
          <CalendarDay>{day}</CalendarDay>
        </Grid>
      );
    });
  };

  return (
    !isLoading && (
      <CalendarWrapper>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ margin: "1em 0" }}
        >
          <Grid item xs={2}>
            <IconButton onClick={backwardsPaginating}>
              <ArrowCircleLeftOutlinedIcon
                sx={{ width: "50px", height: "50px" }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h1" color="purple">
              {today.getFullYear()} {getNameOfMonth(today.getMonth())}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={forwardPaginating}>
              <ArrowCircleRightOutlinedIcon
                sx={{ width: "50px", height: "50px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          gap={0.5}
        >
          {renderAvailableDays()}
        </Grid>
      </CalendarWrapper>
    )
  );
};

export default MyCalendar;
