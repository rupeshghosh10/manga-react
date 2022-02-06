import Loading from '../Loading/Loading';
import MangaBox from '../MangaBox/MangaBox';
import { Link } from 'react-router-dom';
import styles from './MangaList.module.css';

const MangaList = ({ mangaList, isLoading, noMangaFound }) => {

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={140} strokeWidth={12} />
      </div>
    );
  }

  if (noMangaFound) {
    return (
      <div className={styles.noResult}>
        <h2>No Result Found</h2>
      </div>
    );
  }

  return (
    <ul className={styles.mangaList}>
      {mangaList.map((manga, i) => (
        <li className={styles.manga} key={i}>
          <div className={styles.mangaBox}>
            <Link to={`/manga/${manga.id}`} state={manga} className={styles.mangaBoxLink}>
              <MangaBox manga={manga} />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MangaList;
