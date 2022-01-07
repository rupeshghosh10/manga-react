import { useEffect, useState } from 'react';
import MangaBox from '../../components/MangaBox/MangaBox';
import mangadexApi from '../../service/mangadexApi';
import styles from './Search.module.css';

const Search = () => {

  const [searchText, setSearchText] = useState('');
  const [mangaList, setMangaList] = useState([]);

  const controller = new AbortController();

  const handleTextChange = e => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    if (searchText.length !== 0) {
      mangadexApi.searchManga(searchText, { controller }).then(res => {
        setMangaList(res.data);
        console.log(res.data);
      });
    }
    else {
      setMangaList([]);
    }
    return () => controller.abort();
  }, [searchText]);

  return (
    <>
      <div className={styles.container}>
        <input placeholder='Search...' className={styles.searchInput} value={searchText} onChange={handleTextChange} />
      </div>
      {mangaList.length !== 0 &&
        <ul className={styles.mangaList}>
          {mangaList.map((manga, i) => (
            <li className={styles.manga} key={i}>
              <MangaBox manga={manga} noOfChapter={manga.attributes.lastChapter} />
            </li>
          ))}
        </ul>}
    </>
  );
}

export default Search;
