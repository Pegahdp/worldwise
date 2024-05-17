import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Map.module.css";
import Button from "./Button";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const { cities } = useCities();
  const {
    isLoading,
    position: geologicalPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geologicalPosition)
      setMapPosition([geologicalPosition.lat, geologicalPosition.lng]);
  }, [geologicalPosition]);

  console.log("mapPosition", mapPosition);
  return (
    <div className={styles.mapContainer}>
      {!geologicalPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "loading..." : "Get your current position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span> {city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const naviagte = useNavigate();
  useMapEvents({
    click: (e) => {
      naviagte(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
