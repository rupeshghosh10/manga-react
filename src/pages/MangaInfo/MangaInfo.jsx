import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MangaBox from '../../components/MangaBox/MangaBox';
import mangadexApi from '../../service/mangadexApi';
import helper from '../../util/helper';
import styles from './MangaInfo.module.css';

const MangaInfo = () => {

  const [chapterList, setChapterList] = useState([]);
  const [manga, setManga] = useState(null);
  const { state } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!state) {
      mangadexApi.getManga(params.id).then(res => {
        setManga(res.data);
      });
      mangadexApi.getChapterList(params.id).then(res => {
        setChapterList(res.data);
      });
    }
    else {
      setManga(state);
      mangadexApi.getChapterList(params.id).then(res => {
        setChapterList(res.data);
      });
    }
  }, [params]);

  return (
    manga &&
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
