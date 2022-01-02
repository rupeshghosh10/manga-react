import { useEffect, useState } from 'react';
import helper from '../../service/helper';
import mangadexApi from '../../service/mangadexApi';
import styles from './MangaInfo.module.css';

const MangaInfo = ({ manga }) => {

  const [coverName, setCoverName] = useState(null);
  const [author, setAuthor] = useState(null);
  const [artist, setArtist] = useState(null); 

  useEffect(() => {
    console.log(manga);

    const coverId = helper.findCoverId(manga);

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
      </div>
      <div className={styles.mangaDetails}>
        <div className={styles.mainDetails}>
          <div className={styles.title}>
            <h2>{manga.attributes.title.en}</h2>
          </div>
          <div>
            {manga.attributes.lastChapter && <p>Chapter: {manga.attributes.lastChapter}</p>}
          </div>
          <div>
            <p>Status: {manga.attributes.status}</p>
          </div>
          <div>
            <p>Author: Rupesh Ghosh</p>
          </div>
          <div>
            <p>Artist: Rupesh GHosh</p>
          </div>
        </div>
        <div className={styles.synopsis}>
          <h4>Description</h4>
          <p>{manga.attributes.description.en}</p>
        </div>
      </div>
    </div>
  );
}

export default MangaInfo;
