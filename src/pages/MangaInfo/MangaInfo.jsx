import { useEffect, useState } from 'react';
import mangadexApi from '../../service/mangadexApi';
import helper from '../../util/helper';
import styles from './MangaInfo.module.css';

const MangaInfo = ({ manga }) => {

  const cover = helper.findCover(manga);
  const author = helper.findAuthor(manga);
  const artist = helper.findArtist(manga);
  const tags = manga.attributes.tags;

  const [chapterList, setChapterList] = useState(null);

  useEffect(() => {
    mangadexApi.getChapterList(manga.id).then(res => {
      setChapterList(res.data);
      console.log(res.data);
    })
  }, [manga.id]);

  return (
    <>
      <div className={styles.mangaInfo}>
        <div className={styles.imageBox}>
          <img src={`https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`}
            alt="cover"
            className={styles.image} />
        </div>
        <div className={styles.mainDetails}>
          <div>
            <h2 className={styles.title}>{manga.attributes.title.en}</h2>
          </div>
          <div>
            <p className={styles.status}>{manga.attributes.status}</p>
          </div>
          <div>
            {chapterList && <p>Chapter: {chapterList.length}</p>}
          </div>
          <div>
            <p>Author: {author.attributes.name}</p>
          </div>
          <div>
            <p>Artist: {artist.attributes.name}</p>
          </div>
        </div>
        <div className={styles.tags}>
          {tags.map((tag, i) => <div key={i} className={styles.tag}>{tag.attributes.name.en}</div>)}
        </div>
        <div className={styles.synopsis}>
          <h4>Description</h4>
          <p className={styles.description}>{manga.attributes.description.en}</p>
        </div>
      </div>
      <div>
        {chapterList && chapterList.map((chapter, i) => <p key={i}>Chapter {i+1}: {chapter.attributes.title}</p>)}
      </div>
    </>
  );
}

export default MangaInfo;
