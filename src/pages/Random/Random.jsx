import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import MangaInfo from '../MangaInfo/MangaInfo';

const Random = () => {

  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    mangadexApi.getRandomManga().then(res => {
      if (res.data.attributes.originalLanguage === 'ja' &&
        res.data.attributes.contentRating !== 'pornographic' &&
        counter <= 10) {
        setManga(res.data);
        setIsLoading(false);
      }
      else {
        setCounter(counter + 1);
      }
    });
  }, [counter]);

  if (isLoading) {
    return <Loading />
  }

  return <> <MangaInfo manga={manga} /> </>

}

export default Random;
