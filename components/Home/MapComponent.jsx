import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// --- FIX FOR MISSING MARKER ICONS ---
// This solves the issue where markers don't show up in React builds
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  useEffect(() => {
    // 1. Initialize map centered on the Red Sea area (based on your image)
    const map = L.map("map", {
      zoomControl: false, // Hide zoom for a cleaner "Figma" look
      attributionControl: false,
    }).setView([24.0, 38.0], 6);

    // 2. Use a Terrain Tile Layer to match the image's "bumpy" texture
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 13,
      },
    ).addTo(map);

    // 3. Add the markers
    const locations = [
      { name: "Shebara", coords: [25.4411, 37.1235] }, // Estimated coords from image
      { name: "Desert Rock", coords: [26.5411, 37.9235] },
      { name: "Bahrain", coords: [26.0667, 50.5577] },
    ];

    locations.forEach((loc) => {
      L.marker(loc.coords).addTo(map).bindPopup(loc.name);
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <style>
        {`
          /* Custom CSS to match the image color palette */
          .pixel-perfect-map .leaflet-tile-container {
            filter: sepia(0.5) hue-rotate(-15deg) saturate(0.6) contrast(1.1) brightness(1.05);
          }
          .leaflet-container {
            background: #e8dcc4; /* Match the sand background */
          }
        `}
      </style>
      <div
        id='map'
        className='pixel-perfect-map'
        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default MapComponent;
