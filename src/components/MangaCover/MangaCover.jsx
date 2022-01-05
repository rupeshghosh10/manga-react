import styles from './MangaCover.module.css';

const MangaCover = ({ mangaId, fileName }) => {
  return <img src={`https://uploads.mangadex.org/covers/${mangaId}/${fileName}`} alt="cover" className={styles.image} />
}

export default MangaCover;
