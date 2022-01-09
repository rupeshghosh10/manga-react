import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import styles from './ChapterPage.module.css';
import helper from '../../util/helper';

const ChapterPage = () => {

  const [chapter, setChapter] = useState(null);
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hash, setHash] = useState('');
  const [pageHash, setPageHash] = useState([]);
  const { state } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!state) {
      mangadexApi.getChapter(params.id).then(res => {
        setChapter(res.data);
        setManga(helper.findManga(res.data));
        setIsLoading(false);
      });
    }
    else {
      setChapter(state.chapter);
      setManga(state.manga);
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (!isLoading) {
      mangadexApi.getPageHash(params.id).then(res => {
        setHash(res.chapter.hash);
        setPageHash(res.chapter.data);
      });
    }
  }, [isLoading]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={200} strokeWidth={15} />
      </div>
    );
  }

  return (
    <div className={styles.chapterPageContainer}>
      <div className={styles.title}>
        <p>{manga.attributes.title.en}</p>
        <p>Chapter: {chapter.attributes.chapter}</p>
      </div>
      <div className={styles.progress}>
        <p onClick={handlePreviousClick}>Previous Page</p>
        <p>Page: {currentPage}</p>
        <p onClick={handleNextClick}>Next Page</p>
      </div>
      {(pageHash.length !== 0 && hash !== '') &&
        <div>
          <img src={`https://uploads.mangadex.org/data/${hash}/${pageHash[currentPage - 1]}`} />
        </div>}
    </div>
  );
}

export default ChapterPage;
