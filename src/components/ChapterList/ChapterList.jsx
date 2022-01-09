import { useState, useEffect } from 'react';
import moment from 'moment';
import helper from '../../util/helper';
import mangadexApi from '../../service/mangadexApi';
import styles from './ChapterList.module.css';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const ChapterList = ({ mangaId, manga }) => {

  const [chapterList, setChapterList] = useState([]);
  const [chapterAvailable, setChapterAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchChapter, setSearchChapter] = useState('');

  useEffect(() => {
    mangadexApi.getChapterList(mangaId, 0).then(res => {
      if (res.data.length === 0) {
        setChapterAvailable(false);
        setIsLoading(false);
      }
      else {
        if (res.data.length < 100) {
          setChapterList(res.data);
          setIsLoading(false);
        }
        else {
          let result = res.data;
          fetchAllChapter(result, 100);
        }
      }
    });
  }, [mangaId]);

  useEffect(() => {
    if (!isLoading) {
      if (sortOrder === 'asc') {
        setChapterList([...chapterList.sort((a, b) => a.attributes.chapter - b.attributes.chapter)]);
      }
      else if (sortOrder === 'desc') {
        setChapterList([...chapterList.sort((b, a) => a.attributes.chapter - b.attributes.chapter)]);
      }
    }
  }, [sortOrder]);

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

  const handleSortOrderChange = e => {
    setSortOrder(e.target.value);
  }

  const handleSearchChapterChange = e => {
    setSearchChapter(e.target.value.trimStart());
  }

  const chapterFilter = chapter => {
    const title = chapter.attributes.title?.toLowerCase();
    const chapterNo = chapter.attributes?.chapter;
    return title?.includes(searchChapter.toLowerCase().trim()) || chapterNo?.includes(searchChapter.trim());
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
    <>
      <div className={styles.control}>
        <div className={styles.inputContainer}>
          <p>Search Chapter</p>
          <input className={styles.input} value={searchChapter} onChange={handleSearchChapterChange} />
        </div>
        <div className={styles.sortContainer}>
          <p>Sort By</p>
          <select className={styles.select} value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <ul className={styles.chapterList}>
        {chapterList
          .filter(chapter => chapterFilter(chapter))
          .map((chapter, i) => (
            <li className={styles.chapterDetail} key={i}>
              <Link to={`/chapter/${chapter.id}`} state={{chapter, manga}} className={styles.chapterLink}>
                <div className={styles.chapter}>
                  <p className={styles.chapterName}>Chapter {chapter.attributes.chapter} : {chapter.attributes.title}</p>
                  <p className={styles.chapterDate}>{moment(chapter.attributes.updatedAt).format('MMM DD, YYYY')}</p>
                </div>
                <div className={styles.scanlationGroup}>
                  {helper.findScanlationGroup(chapter) && <p>{helper.findScanlationGroup(chapter).attributes.name}</p>}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  )
}

export default ChapterList;
