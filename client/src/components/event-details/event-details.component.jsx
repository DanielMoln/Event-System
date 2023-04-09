import { useParams } from "react-router-dom";
import DynamicAccord from "../DynamicAccord.component";
import { Fragment, useContext } from "react";
import { EventContext } from "../../contexts/event.context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import pokembej from "../../assests/pokembej.jpg";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: pokembej,
  iconUrl: pokembej,
  shadowUrl: pokembej,
});

const EventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const event = events.find((event) => event.id == id);
  const { Location } = event;
  const position = [Location.longitude, Location.latitude];

  const icon = L.icon({
    iconRetinaUrl: pokembej,
    iconUrl: pokembej,
    shadowUrl: pokembej,
  });

  return (
    <Fragment>
      <DynamicAccord
        key={event + Math.random()}
        data={event}
        defaultExpand={true}
        panel={"data" + Math.random()}
        accordIndex={id}
      />

      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{event.Name}</Popup>
        </Marker>
      </MapContainer>
    </Fragment>
  );
};

export default EventDetails;
