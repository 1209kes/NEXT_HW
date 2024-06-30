import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import liftData from '../../assets/lift_data.json';
import L from 'leaflet';
import markerImage from '../Map/marker.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../Map/Map.module.css';

const makerIcon = L.icon({
    iconUrl: markerImage,
    iconSize: [35, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const MapPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedStation = queryParams.get('station');

    const [liftLocations, setLiftLocations] = useState([]);
    const [hasLiftData, setHasLiftData] = useState(true);

    useEffect(() => {
        try {
            const filteredLiftLocations = liftData.DATA.filter((item) => {
                return item.sw_nm === selectedStation && item.node_wkt;
            })
                .map((item) => {
                    const match = item.node_wkt.match(/POINT\(([^ ]+) ([^ ]+)\)/);
                    if (match) {
                        const lng = parseFloat(match[1]);
                        const lat = parseFloat(match[2]);
                        return { lat, lng };
                    } else {
                        return null;
                    }
                })
                .filter((location) => location !== null);

            setLiftLocations(filteredLiftLocations);
            setHasLiftData(filteredLiftLocations.length > 0);
        } catch (error) {
            setHasLiftData(false);
        }
    }, [selectedStation]);

    if (!hasLiftData) {
        return (
            <>
                <Header />
                <div className={styles.message}>
                    리프트 위치 정보가 없습니다.
                </div>
                <Footer />
            </>
        );
    }

    return liftLocations.length > 0 ? (
        <MapContainer
            center={[liftLocations[0].lat, liftLocations[0].lng]}
            zoom={20}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {liftLocations.map((location, idx) => (
                <Marker key={idx} position={[location.lat, location.lng]} icon={makerIcon}>
                    <Popup>리프트 위치 {idx + 1}</Popup>
                </Marker>
            ))}
        </MapContainer>
    ) : (
        <div className={styles.message}>리프트 위치 정보가 없습니다.</div>
    );
};

export default MapPage;
