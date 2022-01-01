import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Random from './pages/Random/Random';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exacte path="/random" element={<Random />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
