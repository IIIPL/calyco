import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Crosshair, Loader2 } from 'lucide-react';

// Fix for default marker icon in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapPanListener({ setAddressDetails }) {
  const map = useMapEvents({
    dragend: () => {
      const center = map.getCenter();
      fetchAddress(center.lat, center.lng, setAddressDetails);
    },
    zoomend: () => {
      const center = map.getCenter();
      fetchAddress(center.lat, center.lng, setAddressDetails);
    }
  });
  return null;
}

const fetchAddress = async (lat, lng, setAddressDetails) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    const data = await res.json();
    if (data && data.address) {
      const { address } = data;
      setAddressDetails({
        street: address.road || address.street || address.pedestrian || address.path || address.residential || address.commercial || address.industrial || address.suburb || '',
        areaName: address.neighbourhood || address.suburb || address.village || address.city_district || address.quarter || address.county || address.municipality || '',
        city: address.city || address.town || address.state_district || address.district || address.county || '',
        pincode: address.postcode || '',
        locationLink: `https://maps.google.com/?q=${lat},${lng}`
      });
    } else {
      setAddressDetails({ locationLink: `https://maps.google.com/?q=${lat},${lng}` });
    }
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    setAddressDetails({ locationLink: `https://maps.google.com/?q=${lat},${lng}` });
  }
};

const LocationPicker = ({ onLocationSelect, initialPosition = { lat: 28.6139, lng: 77.2090 } }) => {
  const [position, setPosition] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const mapRef = useRef(null);
  
  // Try to get user location on mount
  useEffect(() => {
    handleLocateMe();
  }, []);

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      setLoadingLoc(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          if (mapRef.current) {
            mapRef.current.flyTo(newPos, 15);
          } else {
            setPosition(newPos);
          }
          fetchAddress(newPos.lat, newPos.lng, onLocationSelect);
          setLoadingLoc(false);
        },
        (err) => {
          console.warn("Geolocation denied or failed", err);
          setLoadingLoc(false);
          // Fallback to initial position but don't auto-fetch address
          if (!mapRef.current) setPosition(initialPosition);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      if (!mapRef.current) setPosition(initialPosition);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#e5e0d8] shadow-sm z-0 h-[250px] w-full">
      {position ? (
        <>
          <MapContainer center={position} zoom={15} ref={mapRef} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapPanListener setAddressDetails={onLocationSelect} />
          </MapContainer>
          
          {/* Central fixed marker mimicking Swiggy/Blinkit */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[400]">
            <div className="relative -mt-[41px]">
               <img src={icon} alt="marker" className="w-[25px] h-[41px] drop-shadow-md" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
           {loadingLoc ? <Loader2 className="w-6 h-6 animate-spin" /> : "Loading map..."}
        </div>
      )}
      
      <button
        type="button"
        onClick={handleLocateMe}
        disabled={loadingLoc}
        className="absolute bottom-4 right-4 z-[400] bg-white rounded-full p-2.5 shadow-md border border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50"
        title="Locate Me"
      >
        {loadingLoc ? <Loader2 className="w-5 h-5 animate-spin" /> : <Crosshair className="w-5 h-5 text-[#493657]" />}
      </button>
      
      <div className="absolute top-2 left-2 right-2 z-[400] pointer-events-none">
        <div className="bg-white/90 backdrop-blur text-xs text-gray-600 px-3 py-2 rounded-lg shadow-sm border border-gray-100 inline-block pointer-events-auto">
          <MapPin className="w-3 h-3 inline mr-1 text-[#493657]" />
          Drag map to pin location
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
