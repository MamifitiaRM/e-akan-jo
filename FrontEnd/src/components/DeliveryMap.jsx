import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { DEFAULT_MAP_CENTER } from "../utils/utility";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = ({ position, onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

const DeliveryMap = ({ position, onSelect }) => {
  return (
    <MapContainer
      center={position || DEFAULT_MAP_CENTER}
      zoom={13}
      scrollWheelZoom={false}
      className="h-64 w-full border-2 border-gray-300 z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} onSelect={onSelect} />
    </MapContainer>
  );
};

export default DeliveryMap;
