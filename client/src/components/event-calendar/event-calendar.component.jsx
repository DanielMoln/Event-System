import { Fragment, useContext, useEffect, useState } from "react";
import MyCalendar, { Day } from "./calendar.component";
import moment from "moment";
import { EventContext } from "../../contexts/event.context";

const EventCalendar = () => {
  const [highlightedDays, setHighlightedDays] = useState([]);
  const { events } = useContext(EventContext);

  useEffect(() => {
    const days = events.map((event) => {
      const newDay = Object.assign({}, Day);
      newDay.dayOfMonth = new Date(event.Date).getDate();
      newDay.title = event.Name;
      newDay.month = parseInt(
        moment(event.Date).format("YYYY-MM-DD").split("-")[1]
      );
      newDay.year = new Date(event.Date).getFullYear();

      return newDay;
    });
    setHighlightedDays(days);
  }, []);

  return (
    <Fragment>
      <h1>Eseménynaptár</h1>
      <MyCalendar highlightedDays={[...highlightedDays]} />
    </Fragment>
  );
};
export default EventCalendar;
