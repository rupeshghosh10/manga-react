import { useEffect, useState } from 'react';
import mangadexApi from '../../service/mangadexApi';
import MangaInfo from '../MangaInfo/MangaInfo';

const Random = () => {

  const [manga, setManga] = useState(null);

  useEffect(() => {
    mangadexApi.getRandomManga().then(res => {
      setManga(res.data);
    });
  }, []);

  return (
    <>
      {manga && <MangaInfo manga={manga} />}
    </>
  )
}

export default Random;
