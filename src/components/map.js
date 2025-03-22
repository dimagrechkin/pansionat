'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const defaults = {
    zoom: 10,
}

const Map = () => {
    return (
        <MapContainer
            center={[50.4351, 30.51]}
            zoom={defaults.zoom}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[50.4351, 30.51]} draggable={false}>
                <Popup>Пансионат в Киеве</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
