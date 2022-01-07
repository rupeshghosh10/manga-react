import moment from 'moment';
import { useEffect, useState } from 'react';
import MangaBox from '../../components/MangaBox/MangaBox';
import mangadexApi from '../../service/mangadexApi';
import helper from '../../util/helper';
import styles from './MangaInfo.module.css';

const MangaInfo = ({ manga }) => {

  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    mangadexApi.getChapterList(manga.id).then(res => {
      setChapterList(res.data);
    })
  }, [manga.id]);

  return (
    <>
      <div className={styles.mangaBoxContainer}>
        <MangaBox manga={manga} noOfChapter={chapterList.length} />
      </div>
      {chapterList.length !== 0 &&
        <ul className={styles.chapterList}>
          {chapterList.map((chapter, i) => (
            <li className={styles.chapterDetail} key={i}>
              <div className={styles.chapter}>
                <p>Chapter {chapter.attributes.chapter} : {chapter.attributes.title}</p>
                <p className={styles.chapterDate}>{moment(chapter.attributes.updatedAt).format('MMM DD, YYYY')}</p>
              </div>
              <div className={styles.scanlationGroup}>
                <p>{helper.findScanlationGroup(chapter).attributes.name}</p>
              </div>
            </li>
          ))}
        </ul>}
    </>
  );
}

export default MangaInfo;
