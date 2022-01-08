import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MangaInfo from './pages/MangaInfo/MangaInfo';
import Random from './pages/Random/Random';
import Search from './pages/Search/Search';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exacte path="/random" element={<Random />} />
        <Route exacte path="/search" element={<Search />} />
        <Route exacte path="/manga/:id" element={<MangaInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
