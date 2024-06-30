import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Map from './pages/Map/Map';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </Router>
    );
}
export default App;
