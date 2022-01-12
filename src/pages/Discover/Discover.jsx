import { useState, useEffect } from 'react';
import MangaList from '../../components/MangaList/MangaList';
import mangadexApi from '../../service/mangadexApi';
import styles from './Discover.module.css';

const Discover = () => {

  const [topFollowedManga, setTopFollowedManga] = useState([]);
  const [isLoadingTopFollowed, setIsLoadingTopFollowed] = useState(true);

  const [relevantManga, setRelevantManga] = useState([]);
  const [isLoadingRelevant, setIsLoadingRelevant] = useState(true);

  const [recentlyUpdateManga, setRecentlyUpdateManga] = useState([]);
  const [isLoadingRecentlyUpdated, setIsLoaingRecentlyUpdate] = useState(true);

  useEffect(() => {
    mangadexApi.getTopFollowedManga().then(res => {
      setTopFollowedManga(res.data);
      setIsLoadingTopFollowed(false);
    });
    mangadexApi.getTopRevelantManga().then(res => {
      setRelevantManga(res.data);
      setIsLoadingRelevant(false);
    });
    mangadexApi.getRecentlyUpdateManga().then(res => {
      setRecentlyUpdateManga(res.data);
      setIsLoaingRecentlyUpdate(false);
    })
  }, [isLoadingTopFollowed, isLoadingRelevant, isLoadingRecentlyUpdated]);

  useEffect(() => {
    document.title = 'Discover | Manga React';
  }, [])

  return (
    <div className={styles.DiscoverContainer}>
      <div className={styles.relevantMangaCOntainer}>
        <h2>Discover</h2>
        <MangaList mangaList={relevantManga} isLoading={isLoadingRelevant} />
      </div>
      <div className={styles.topFollowedMangaContainer}>
        <h2>Top Followed Manga</h2>
        <MangaList mangaList={topFollowedManga} isLoading={isLoadingTopFollowed} />
      </div>
      <div className={styles.recentlyUpdateMangaContainer}>
        <h2>Recently Added</h2>
        <MangaList mangaList={recentlyUpdateManga} isLoading={isLoadingRecentlyUpdated} />
      </div>
    </div>
  );
}

export default Discover;
