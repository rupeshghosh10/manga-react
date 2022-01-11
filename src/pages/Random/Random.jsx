import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import styles from './Random.module.css';

const Random = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Random | Manga React';
  }, []);

  useEffect(() => {
    mangadexApi.getRandomManga().then(res => {
      if (res.data.attributes.originalLanguage === 'ja' &&
        res.data.attributes.contentRating !== 'pornographic' &&
        counter <= 10) {
        setIsLoading(false);
        navigate(`/manga/${res.data.id}`, { state: res.data });
      }
      else {
        setCounter(counter + 1);
      }
    });
  }, [counter]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size={200} strokeWidth={15} />
      </div>
    )
  }

  return <> </>

}

export default Random;
