import Loading from '../Loading/Loading';
import styles from './PageImage.module.css';
import { Link } from 'react-router-dom';

const PageImage = ({ image, endOfChapter, mangaId }) => {

  if (endOfChapter) {
    return (
      <div className={styles.navigation}>
        <h1>End of Chapter</h1>
        <Link to={`/manga/${mangaId}`}>Go Back</Link>
      </div>
    );
  }

  if (!image) {
    return (
      <div className={styles.loading}>
        <Loading size={120} strokeWidth={12} />
      </div>
    );
  }

  return <img src={`data:image/jpeg;charset=utf-8;base64,${image}`} className={styles.image} />;
}

export default PageImage;
