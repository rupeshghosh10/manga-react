import { useEffect, useState } from 'react';
import MangaList from '../../components/MangaList/MangaList';
import styles from './History.module.css';
import history from '../../util/history';

const History = () => {

  const [mangaHistory, setMangaHistory] = useState(null);

  useEffect(() => {
    setMangaHistory(history.getHistory());
  }, []);

  if (!mangaHistory) {
    return (
      <div className={styles.history}>
        <h1>No History</h1>
      </div>
    );
  }

  return (
    <div className={styles.history}>
      <MangaList mangaList={mangaHistory} isLoading={false} />
    </div>
  );
}

export default History;
