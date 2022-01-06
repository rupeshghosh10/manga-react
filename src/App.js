import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Random from './pages/Random/Random';
import Search from './pages/Search/Search';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exacte path="/random" element={<Random />} />
        <Route exacte path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
