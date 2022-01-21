import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MangaBox from '../../components/MangaBox/MangaBox';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import styles from './MangaPage.module.css';
import ChapterList from '../../components/ChapterList/ChapterList';
import history from '../../util/history';

const MangaInfo = () => {

  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!state) {
      mangadexApi.getManga(params.id).then(res => {
        document.title = `${res.data.attributes.title.en} | Manga React`;
        setManga(res.data);
        setIsLoading(false);
        history.addManga(res.data);
      });
    }
    else {
      document.title = `${state.attributes.title.en} | Manga React`;
      setManga(state);
      setIsLoading(false);
      history.addManga(state);
    }
  }, [params]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={200} strokeWidth={15} /> 
      </div>
    );
  }

  return (
    <div className={styles.mangaInfoContainer}>
      <div className={styles.mangaBoxContainer}>
        <MangaBox manga={manga} showFullTags={true} />
      </div>
      <ChapterList mangaId={params.id} manga={manga} />
    </div>
  );
}

export default MangaInfo;
