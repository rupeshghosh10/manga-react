import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ChapterPage from './pages/ChapterPage/ChapterPage';
import Discover from './pages/Discover/Discover';
import MangaInfo from './pages/MangaPage/MangaPage';
import Random from './pages/Random/Random';
import Search from './pages/Search/Search';
import History from './pages/History/History';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exacte path="/" element={<Discover />} />
        <Route exacte path="/random" element={<Random />} />
        <Route exacte path="/search" element={<Search />} />
        <Route exacte path="/manga/:id" element={<MangaInfo />} />
        <Route exacte path="/chapter/:id" element={<ChapterPage />} />
        <Route exacte path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
