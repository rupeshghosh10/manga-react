import { useEffect, useState } from 'react';
import MangaList from '../../components/MangaList/MangaList';
import mangadexApi from '../../service/mangadexApi';
import styles from './Search.module.css';

const Search = () => {

  const [searchText, setSearchText] = useState('');
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMangaFound, setNoMangaFound] = useState(false);

  const controller = new AbortController();

  const handleTextChange = e => {
    setSearchText(e.target.value);
    setNoMangaFound(false);
  }

  useEffect(() => {
    document.title = 'Search | Manga React';
  }, []);

  useEffect(() => {
    if (searchText.length !== 0) {
      setIsLoading(true);
      mangadexApi.searchManga(searchText, { controller }).then(res => {
        if (res.data.length === 0) {
          setNoMangaFound(true);
        }
        setMangaList(res.data);
        setIsLoading(false);
      }).catch(() => {
        setMangaList([]);
      });
    }
    else {
      setMangaList([]);
      setIsLoading(false);
      setNoMangaFound(false);
    }
    return () => controller.abort();
  }, [searchText]);

  return (
    <>
      <div className={styles.container}>
        <input placeholder='Search...' className={styles.searchInput} value={searchText} onChange={handleTextChange} />
      </div>
      <MangaList mangaList={mangaList} isLoading={isLoading} noMangaFound={noMangaFound} />
    </>
  );
}

export default Search;
