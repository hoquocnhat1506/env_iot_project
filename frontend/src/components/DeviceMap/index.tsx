import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-search/dist/leaflet-search.min.css";
import "leaflet-search";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import iconLocation from "../../assets/svg/iconLocation.png";

const DeviceMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const newMarkerRef = useRef<L.Marker | null>(null);
  const locationInfoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: L.Map | null = null;

    if (mapContainer.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          map = L.map(mapContainer.current).setView(userLocation, 12);

          L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            attribution: "&copy; Google Maps",
          }).addTo(map);

          L.control.zoom({ position: "topright" }).addTo(map);

          const geocoder = L.Control.Geocoder.nominatim();
          const geocoderControl = L.Control.geocoder({
            geocoder: geocoder,
            collapsed: false,
            placeholder: "Search for a location...",
          }).addTo(map);

          geocoderControl.on("markgeocode", function (event) {
            const { center, name, properties } = event.geocode;

            if (newMarkerRef.current) {
              map?.removeLayer(newMarkerRef.current);
            }

            const newMarkerIcon = L.icon({
              iconUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });

            const newMarker = L.marker(center, { icon: newMarkerIcon }).addTo(
              map!
            );
            newMarkerRef.current = newMarker;

            const { city, state, country } = properties;
            const locationInfo = `<b>Name:</b> ${name}<br><b>City:</b> ${
              city || "N/A"
            }<br><b>State:</b> ${state || "N/A"}<br><b>Country:</b> ${
              country || "N/A"
            }`;

            if (locationInfoRef.current) {
              locationInfoRef.current.innerHTML = locationInfo;
              const iconLocationElement = document.createElement("img");
              iconLocationElement.src = iconLocation;
              iconLocationElement.alt = "Location Icon";
              locationInfoRef.current.appendChild(iconLocationElement);
            }
          });

          map.on("click", (event) => {
            const latlng = event.latlng;

            if (newMarkerRef.current) {
              map?.removeLayer(newMarkerRef.current);
            }

            const newMarkerIcon = L.icon({
              iconUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });

            const newMarker = L.marker(latlng, { icon: newMarkerIcon }).addTo(
              map!
            );
            newMarkerRef.current = newMarker;

            if (locationInfoRef.current) {
              locationInfoRef.current.innerHTML = `Lat: ${latlng.lat}, Long: ${latlng.lng}`;
              const iconLocationElement = document.createElement("img");
              iconLocationElement.src = iconLocation;
              iconLocationElement.alt = "Location Icon";
              locationInfoRef.current.appendChild(iconLocationElement);
            }
          });
        },
        (error) => {
          console.error("Error getting user location:", error);

          map = L.map(mapContainer.current).setView([0, 0], 2);

          L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            attribution: "&copy; Google Maps",
          }).addTo(map);

          L.control.zoom({ position: "topright" }).addTo(map);

          const searchControl = new L.Control.Search({
            layer: L.layerGroup([L.marker([0, 0])]),
            propertyName: "name",
            marker: L.marker([0, 0]),
            collapsed: false,
            textPlaceholder: "Search...",
          });

          map.addControl(searchControl);

          const geocoder = L.Control.Geocoder.nominatim();
          const geocoderControl = L.Control.geocoder({
            geocoder: geocoder,
            collapsed: false,
            placeholder: "Search for a location...",
          }).addTo(map);

          geocoderControl.on("markgeocode", function (event) {
            const { center, name, properties } = event.geocode;

            if (newMarkerRef.current) {
              map?.removeLayer(newMarkerRef.current);
            }

            const newMarkerIcon = L.icon({
              iconUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });

            const newMarker = L.marker(center, { icon: newMarkerIcon }).addTo(
              map!
            );
            newMarkerRef.current = newMarker;

            const { city, state, country } = properties;
            const locationInfo = `<b>Name:</b> ${name}<br><b>City:</b> ${
              city || "N/A"
            }<br><b>State:</b> ${state || "N/A"}<br><b>Country:</b> ${
              country || "N/A"
            }`;

            if (locationInfoRef.current) {
              locationInfoRef.current.innerHTML = locationInfo;
            }
          });

          map.on("click", (event) => {
            const latlng = event.latlng;

            if (newMarkerRef.current) {
              map?.removeLayer(newMarkerRef.current);
            }

            const newMarkerIcon = L.icon({
              iconUrl: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });

            const newMarker = L.marker(latlng, { icon: newMarkerIcon }).addTo(
              map!
            );
            newMarkerRef.current = newMarker;
          });
        }
      );
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className={styles["map"]}>
      <div ref={mapContainer} style={{ height: "100vh" }} />

      <div className={styles["box-location"]}>
        <div
          className={styles["box-location__main"]}
          ref={locationInfoRef}
          style={{ marginTop: "10px", fontSize: "16px" }}
        ></div>
      </div>
    </div>
  );
};

export default DeviceMap;
