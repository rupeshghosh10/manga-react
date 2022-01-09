import Loading from '../Loading/Loading';
import MangaBox from '../MangaBox/MangaBox';
import { Link } from 'react-router-dom';
import styles from './MangaList.module.css';

const MangaList = ({ mangaList, isLoading }) => {

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={150} strokeWidth={12} />
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
