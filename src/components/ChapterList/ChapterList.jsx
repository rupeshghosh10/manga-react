import { useState, useEffect } from 'react';
import moment from 'moment';
import helper from '../../util/helper';
import mangadexApi from '../../service/mangadexApi';
import styles from './ChapterList.module.css';
import Loading from '../Loading/Loading';

const ChapterList = ({ mangaId }) => {

  const [chapterList, setChapterList] = useState([]);
  const [chapterAvailable, setChapterAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mangadexApi.getChapterList(mangaId, 0).then(res => {
      if (res.data.length === 0) {
        setChapterAvailable(false);
        setIsLoading(false);
      }
      else {
        setChapterList(res.data);
        if (res.data.length < 100) {
          setIsLoading(false);
        }
        else {
          let result = [...res.data];
          fetchAllChapter(result, 100);
        }
      }
    });
  }, [mangaId]);

  const fetchAllChapter = (result, offset) => {
    mangadexApi.getChapterList(mangaId, offset).then(res => {
      result = [...result, ...res.data];
      if (res.data.length < 100) {
        setChapterList([...chapterList, ...result]);
        setIsLoading(false);
        return;
      }
      fetchAllChapter(result, offset + 100);
    });
  }

  if (isLoading) {
    return (
      <div className={styles.chapterList}>
        <Loading size={80} strokeWidth={10} />
      </div>
    )
  }

  if (!chapterAvailable) {
    return (
      <div className={styles.chapterList}>
        <h3>No Chapter Available</h3>
      </div>
    )
  }

  return (
    <ul className={styles.chapterList}>
      {chapterList.map((chapter, i) => (
        <li className={styles.chapterDetail} key={i}>
          <div className={styles.chapter}>
            <p className={styles.chapterName}>Chapter {chapter.attributes.chapter} : {chapter.attributes.title}</p>
            <p className={styles.chapterDate}>{moment(chapter.attributes.updatedAt).format('MMM DD, YYYY')}</p>
          </div>
          <div className={styles.scanlationGroup}>
            {helper.findScanlationGroup(chapter) && <p>{helper.findScanlationGroup(chapter).attributes.name}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ChapterList;
