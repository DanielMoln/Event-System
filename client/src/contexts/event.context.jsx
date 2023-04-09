import { createContext, useEffect, useState } from "react";
import { sendGetRequest } from "../lib/Network";

export const EventContext = createContext({
  events: [],
});

export const EventContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const value = {
    events,
    setEvents,
  };

  const getEvents = async () => {
    const response = await sendGetRequest("/event");
    setEvents(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    !isLoading && (
      <EventContext.Provider value={value}>{children}</EventContext.Provider>
    )
  );
};
