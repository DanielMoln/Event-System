import { Link, useParams } from "react-router-dom";
import DynamicAccord from "../DynamicAccord.component";
import { Fragment, useContext } from "react";
import { EventContext } from "../../contexts/event.context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import pokembej from "../../assests/pokembej.jpg";

import L from "leaflet";
import { Typography } from "@mui/material";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: pokembej,
  iconUrl: pokembej,
  shadowUrl: pokembej,
});

const EventsMap = () => {
  const { events } = useContext(EventContext);
  const defaultPostion =
    events.length > 0
      ? [events[0].Location.longitude, events[0].Location.latitude]
      : [0, 0];

  const icon = L.icon({
    iconRetinaUrl: pokembej,
    iconUrl: pokembej,
    shadowUrl: pokembej,
  });

  const renderMarkers = () => {
    return events.map((event, i) => {
      const { Location } = event;
      const position = [Location.longitude, Location.latitude];

      return (
        <Marker key={event + i} position={position}>
          <Popup>
            <Typography>{event.Name}</Typography>
            <Link to={`/event/details/${event.id}`}>Megnézem</Link>
          </Popup>
        </Marker>
      );
    });
  };

  return (
    <Fragment>
      <MapContainer
        center={defaultPostion}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </Fragment>
  );
};

export default EventsMap;
