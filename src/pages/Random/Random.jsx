import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import mangadexApi from '../../service/mangadexApi';
import MangaInfo from '../MangaInfo/MangaInfo';

const Random = () => {

  const [manga, setManga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mangadexApi.getRandomManga().then(res => {
      setManga(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />
  }
  else {
    return <> {manga && <MangaInfo manga={manga} />} </>
  }
}

export default Random;
