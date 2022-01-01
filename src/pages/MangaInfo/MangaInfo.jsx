import { useEffect, useState } from 'react';
import mangadexApi from '../../service/mangadexApi';
import styles from './MangaInfo.module.css';

const MangaInfo = ({ manga }) => {

  const [coverName, setCoverName] = useState(null);

  useEffect(() => {
    const coverId = manga.relationships.find(x => x.type === 'cover_art').id;
    mangadexApi.getCover(coverId).then(res => {
      setCoverName(res.data.attributes.fileName);
    });
  }, []);

  return (
    <div className={styles.mangaInfo}>
      <div className={styles.imageBox}>
        {coverName &&
          <img src={`https://uploads.mangadex.org/covers/${manga.id}/${coverName}`}
            alt="cover"
            className={styles.image} />}
        <table>
          <tbody>
            <tr>
              <th>Author</th>
              <td>Rupesh Ghosh</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{manga.attributes.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.mangaDetails}>
        <div className={styles.title}>
          {manga.attributes.title.en}
        </div>
        <div className={styles.synopsis}>
          {manga.attributes.description.en}
        </div>
      </div>
    </div>
  );
}

export default MangaInfo;
