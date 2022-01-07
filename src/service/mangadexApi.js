import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

const getRandomManga = async () => {
  const req = axios.get(`${baseUrl}/manga/random?includes[]=author&includes[]=artist&includes[]=cover_art`);
  const res = await req;
  return res.data;
}

const searchManga = async (title, { controller }) => {
  const req = axios.get(`${baseUrl}/manga?title=${title}&originalLanguage[]=ja&availableTranslatedLanguage[]=en`, {
    signal: controller.signal
  });
  const res = await req;
  return res.data;
}

const getChapterList = async (mangaId) => {
  const req = axios.get(`${baseUrl}/chapter?manga=${mangaId}&translatedLanguage[]=en&includes[]=scanlation_group`);
  const res = await req;
  return res.data;
}

const mangadexApi = {
  getRandomManga,
  getChapterList,
  searchManga
}

export default mangadexApi;
