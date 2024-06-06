import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/main';
import Detail from './pages/detail';
import New from './pages/new';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/new" element={<New />} />
            </Routes>
        </Router>
    );
}

export default App;
