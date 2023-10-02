
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './App.css';
import NextDay from './components/NextDay';
import WeatherApp from './components/Page/Weather';

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherApp/>} />
          <Route path="/NextDay" element={<NextDay/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;