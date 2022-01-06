import moment from 'moment';
import { useEffect, useState } from 'react';
import MangaCover from '../../components/MangaCover/MangaCover';
import Tag from '../../components/Tag/Tag';
import mangadexApi from '../../service/mangadexApi';
import helper from '../../util/helper';
import styles from './MangaInfo.module.css';

const MangaInfo = ({ manga }) => {

  const cover = helper.findCover(manga);
  const author = helper.findAuthor(manga);
  const artist = helper.findArtist(manga);
  const tags = manga.attributes.tags;

  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    mangadexApi.getChapterList(manga.id).then(res => {
      setChapterList(res.data);
    })
  }, [manga.id]);

  return (
    <>
      <div className={styles.mangaInfo}>
        <div className={styles.imageBox}>
          <MangaCover mangaId={manga.id} fileName={cover.attributes.fileName} />
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
          {tags.map((tag, i) => <Tag key={i} tag={tag.attributes.name.en} />)}
        </div>
        <div className={styles.synopsis}>
          <h4>Description</h4>
          <p className={styles.description}>{manga.attributes.description.en}</p>
        </div>
      </div>
      {chapterList.length !== 0 && <div className={styles.chapterList}>
        {chapterList.map((chapter, i) => {
          return (
            <div className={styles.chapterDetail} key={i}>
              <div className={styles.chapter}>
                <p>Chapter {chapter.attributes.chapter} : {chapter.attributes.title}</p>
                <p className={styles.chapterDate}>{moment(chapter.attributes.updatedAt).format('MMM DD, YYYY')}</p>
              </div>
              <div className={styles.scanlationGroup}>
                <p>{helper.findScanlationGroup(chapter).attributes.name}</p>
              </div>
            </div>
          )
        })}
      </div>}
    </>
  );
}

export default MangaInfo;
