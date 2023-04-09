import styled from "@emotion/styled";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ExpandMoreIcon } from "../lib/GlobalIcons";
import { MyAccordion, SubTitle } from "../lib/StyledComponents";
import theme from "../themes/theme";

const Description = styled(Typography)(({ theme }) => ({
  maxWidth: "600px",
  width: "100%",
  wordBreak: "break-all",
}));

function DynamicAccord({ data, panel, accordIndex, defaultExpand }) {
  const underMD = useMediaQuery(theme.breakpoints.down("md"));
  const underS = useMediaQuery(theme.breakpoints.down("sm"));
  const { Name, Date, TimePoint, Location, Organizer } = data;

  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenImageView, setIsOpenImageView] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <MyAccordion
        key={data + "" + accordIndex}
        expanded={defaultExpand ? true : expanded === panel}
        onChange={handleAccordionChange(panel)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={defaultExpand ? undefined : <ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SubTitle variant="h4" sx={{ width: "33%", flexShrink: 0 }}>
            # Esemény
          </SubTitle>
          {!underMD && (
            <Typography sx={{ color: "text.secondary" }}>{Name}</Typography>
          )}
        </AccordionSummary>

        <AccordionDetails>
          <SubTitle variant="h4">Esemény adatok:</SubTitle>

          {underS ? (
            <>
              <Typography variant="body1">
                Esemény címe: <strong>{Name}</strong>
              </Typography>
              <Typography variant="body1">
                Esemény időpontja:{" "}
                <strong>
                  {moment(Date).format("YYYY.MM.DD") + " " + TimePoint}
                </strong>
              </Typography>
              <Typography variant="body1">
                Esemény helyszíne: <strong>{Location.Name}</strong>
              </Typography>
              <Typography variant="body1">
                Esemény koordinátái:{" "}
                <strong>
                  {Location.langitude + ", " + Location.longitude}
                </strong>
              </Typography>
            </>
          ) : (
            <dl>
              <dd>
                <Typography variant="body1">
                  Esemény címe: <strong>{Name}</strong>
                </Typography>
                <Typography variant="body1">
                  Esemény időpontja:{" "}
                  <strong>
                    {moment(Date).format("YYYY.MM.DD") + " " + TimePoint}
                  </strong>
                </Typography>
                <Typography variant="body1">
                  Esemény helyszíne: <strong>{Location.Name}</strong>
                </Typography>
                <Typography variant="body1">
                  Esemény koordinátái:{" "}
                  <strong>
                    {Location.latitude + ", " + Location.longitude}
                  </strong>
                </Typography>
              </dd>
            </dl>
          )}

          <SubTitle variant="h4">Szervező adatai:</SubTitle>

          {underS ? (
            <>
              <Typography variant="body1">
                Szervező neve: <strong>{Organizer.Name}</strong>
              </Typography>
              <Typography variant="body1">
                Szervező e-mail címe <strong>{Organizer.Email}</strong>
              </Typography>
              <Typography variant="body1">
                Szervező telefonszáma <strong>{Organizer.Phone}</strong>
              </Typography>
            </>
          ) : (
            <dl>
              <dd>
                <Typography variant="body1">
                  Szervező neve: <strong>{Organizer.Name}</strong>
                </Typography>
                <Typography variant="body1">
                  Szervező e-mail címe <strong>{Organizer.Email}</strong>
                </Typography>
                <Typography variant="body1">
                  Szervező telefonszáma <strong>{Organizer.Phone}</strong>
                </Typography>
              </dd>
            </dl>
          )}

          <SubTitle variant="h4" sx={{ margin: "1rem 0" }}>
            Leírás
          </SubTitle>

          {underS ? (
            <Description variant="body1">{data.Description}</Description>
          ) : (
            <dl>
              <dd>
                <Description variant="body1">{data.Description}</Description>
              </dd>
            </dl>
          )}
        </AccordionDetails>
      </MyAccordion>
    </>
  );
}

export default DynamicAccord;
