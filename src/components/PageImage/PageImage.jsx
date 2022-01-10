import Loading from '../Loading/Loading';
import styles from './PageImage.module.css';

const PageImage = ({ image }) => {

  if (!image) {
    return (
      <div className={styles.loading}>
        <Loading size={120} strokeWidth={12} />
      </div>
    );
  }

  return (
    <img src={`data:image/jpeg;charset=utf-8;base64,${image}`} className={styles.image} />
  );
}

export default PageImage;
