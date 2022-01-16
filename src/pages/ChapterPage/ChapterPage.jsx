import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import styles from './ChapterPage.module.css';
import helper from '../../util/helper';
import PageImage from '../../components/PageImage/PageImage';

const ChapterPage = () => {

  const [chapter, setChapter] = useState(null);
  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hash, setHash] = useState('');
  const [pageHash, setPageHash] = useState([]);
  const [images, setImages] = useState([]);
  const { state } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!state) {
      mangadexApi.getChapter(params.id).then(res => {
        document.title = `${helper.findManga(res.data).attributes.title.en} | Manga React`;
        setChapter(res.data);
        setManga(helper.findManga(res.data));
        setIsLoading(false);
      });
    }
    else {
      document.title = `${state.manga.attributes.title.en} | Manga React`;
      setChapter(state.chapter);
      setManga(state.manga);
      setIsLoading(false);
    }
  }, [params, state]);

  useEffect(() => {
    if (!isLoading) {
      mangadexApi.getPageHash(params.id).then(res => {
        setHash(res.chapter.hash);
        setPageHash(res.chapter.data);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (pageHash.length !== 0 && hash.length !== 0) {
      getAllPageImages(1, []);
    }
  }, [pageHash, hash]);

  const getAllPageImages = (pageNumber, imagesArray) => {
    mangadexApi
      .getPageImage(`https://uploads.mangadex.org/data/${hash}/${pageHash[pageNumber - 1]}`)
      .then(res => {
        imagesArray = [...imagesArray, Buffer.from(res, 'binary').toString('base64')];
        setImages([...imagesArray]);
        if (pageNumber === chapter.attributes.pages) {
          return;
        }
        getAllPageImages(pageNumber + 1, imagesArray);
      });
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    if (currentPage <= chapter.attributes.pages) {
      setCurrentPage(currentPage + 1);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={200} strokeWidth={15} />
      </div>
    );
  }

  if (currentPage > chapter.attributes.pages) {
    return (
      <div className={styles.chapterPageContainer}>
        <div className={styles.progress}>
          <span onClick={handlePreviousClick} className={`${currentPage === 1 ? styles.disabled : ''}`}>
            Previous
          </span>
          <span>
            Chapter {chapter.attributes.chapter} : Page {currentPage - 1}
          </span>
          <span onClick={handleNextClick} className={`${currentPage > chapter.attributes.pages ? styles.disabled : ''}`}>
            Next
          </span>
        </div>
        <div className={styles.navigation}>
          <h2>End of Chapter</h2>
          <Link to={`/manga/${manga.id}`}>Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chapterPageContainer}>
      <div className={styles.progress}>
        <span onClick={handlePreviousClick} className={`${currentPage === 1 ? styles.disabled : ''}`}>
          Previous
        </span>
        <span>
          Chapter {chapter.attributes.chapter} : Page {currentPage}
        </span>
        <span onClick={handleNextClick}>
          Next
        </span>
      </div>
      <div className={styles.imageContainer}>
        <PageImage image={images[currentPage - 1]} />
      </div>
    </div>
  );
}

export default ChapterPage;
