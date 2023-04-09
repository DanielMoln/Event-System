import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/main-layout/main-layout.componen";
import Home from "./components/home/home.component";
import EventCalendar from "./components/event-calendar/event-calendar.component";
import EventDetails from "./components/event-details/event-details.component";
import EventsMap from "./components/events-map/events-map.component";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="event/calendar" element={<EventCalendar />} />
        <Route path="event/map" element={<EventsMap />} />
        <Route path="event/details/:id" element={<EventDetails />} />
        <Route path="*" element={<h1>Ilyen oldal nem található!</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
