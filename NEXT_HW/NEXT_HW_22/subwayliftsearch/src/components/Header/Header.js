import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
            <div className={styles.top}>
                <Link to="/">
                    <img className={styles.icon} src="/images/home.png" alt="home" />
                </Link>
                <h1>서울시 지하철 리프트 위치 찾기</h1>
                <img className={styles.icon} src="/images/info.png" alt="info" />
            </div>
    );
};

export default Header;
