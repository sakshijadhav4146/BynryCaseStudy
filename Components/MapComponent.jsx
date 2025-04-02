import React, { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Loading from "./Loading";

const libraries = ["places"];

function MapComponent({ selectedProfile }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || !selectedProfile || !mapRef.current) return;

        const { latitude, longitude } = selectedProfile.location.coordinates;
        const position = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
        };

        if (markerRef.current) {
            markerRef.current.setMap(null); 
        }

        markerRef.current = new window.google.maps.Marker({
            position,
            map: mapRef.current,
            title: `${selectedProfile.name.first} ${selectedProfile.name.last}`,
        });

        mapRef.current.setCenter(position); 
    }, [isLoaded, selectedProfile]);

    if (!isLoaded) return <Loading />;

    return (
        <GoogleMap
            center={{
                lat: parseFloat(selectedProfile.location.coordinates.latitude),
                lng: parseFloat(selectedProfile.location.coordinates.longitude),
            }}
            zoom={10}
            mapContainerStyle={{ height: "400px", width: "800px" }}
            onLoad={(map) => (mapRef.current = map)}
        />
    );
}

export default MapComponent;