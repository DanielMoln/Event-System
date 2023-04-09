import { Fragment, useContext, useEffect, useState } from "react";
import { sendGetRequest } from "../../lib/Network";
import DynamicAccord from "../DynamicAccord.component";
import { EventContext } from "../../contexts/event.context";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const MyEventBlock = styled(Typography)(({ theme }) => ({
  height: "80px",
  marginBottom: "30px",
  width: "100%",
  padding: "10px 20px",
  boxShadow: "0.5rem 0.5rem black, -0.5rem -0.5rem #ccc",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Home = () => {
  const { events } = useContext(EventContext);

  return (
    <Fragment>
      {events.length === 0 ? (
        <h1>Nincs elérhető esemény!</h1>
      ) : (
        events.map((event, i) => {
          return (
            <MyEventBlock>
              <Link to={`/event/details/${event.id}`}>
                <Typography variant="h2">{event.Name}</Typography>
              </Link>
            </MyEventBlock>
          );
        })
      )}
    </Fragment>
  );
};

export default Home;
