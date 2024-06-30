// src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';
import stationData from '../../assets/station_data.json';
import liftData from '../../assets/lift_data.json';

const Home = () => {
    const [line, setLine] = useState('');
    const [station, setStation] = useState('');
    const [lines, setLines] = useState([]);
    const [stations, setStations] = useState([]);
    const [liftStations, setLiftStations] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        const uniqueLines = [...new Set(stationData.DATA.map((item) => item.line_num))]
            .filter((line) => /^\d+호선$/.test(line))
            .sort((a, b) => parseInt(a) - parseInt(b));
        setLines(uniqueLines);

        // 리프트 정보가 있는 역 목록 생성
        const liftStationSet = new Set(liftData.DATA.map((item) => item.SW_NM));
        setLiftStations(liftStationSet);
    }, []);

    const handleLineChange = (e) => {
        const selectedLine = e.target.value;
        setLine(selectedLine);
        const filteredStations = stationData.DATA.filter((item) => item.line_num === selectedLine).map(
            (item) => item.station_nm
        );
        setStations([...new Set(filteredStations)].sort());
        setStation('');
    };

    const handleSearch = () => {
        if (line && station) {
            navigate(`/map?line=${line}&station=${station}`);
        }
    };

    return (
        <div className={styles.background}>
            <Header />
            <div className={styles.main}>
                <div className={styles.line}>
                    <label>
                        노선:
                        <select value={line} onChange={handleLineChange}>
                            <option value="">선택</option>
                            {lines.map((line) => (
                                <option key={line} value={line}>
                                    {line}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className={styles.station}>
                    <label>
                        역:
                        <select value={station} onChange={(e) => setStation(e.target.value)}>
                            <option value="">선택</option>
                            {stations.map((station) => (
                                <option key={station} value={station}>
                                    {station}
                                    {liftStations.has(station) ? ' (리프트 있음)' : ''}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button className={styles.button} onClick={handleSearch} disabled={!line || !station}>
                    찾기
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
