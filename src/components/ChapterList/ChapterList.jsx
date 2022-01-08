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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    mangadexApi.getChapterList(mangaId, 0).then(res => {
      if (res.data.length === 0) {
        setChapterAvailable(false);
      }
      else {
        setChapterList(res.data);
      }
      if (res.data.length < 100) {
        setIsLoading(false);
      }
    });
  }, [mangaId]);

  useEffect(() => {
    if (chapterList.length >= 100) {
      setOffset(offset + 100);
    }
  }, [chapterList]);

  useEffect(() => {
    if (offset > 0) {
      mangadexApi.getChapterList(mangaId, offset).then(res => {
        if (res.data.length === 0) {
          setIsLoading(false);
        }
        else {
          setChapterList([...chapterList, ...res.data]);
        }
      });
    }
  }, [offset])

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
