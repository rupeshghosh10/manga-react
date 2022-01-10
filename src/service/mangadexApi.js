import axios from 'axios';

// const baseUrl = 'https://api.mangadex.org';
const baseUrl = 'https://desolate-sea-78726.herokuapp.com';

const getRandomManga = async () => {
  const req = axios.get(`${baseUrl}/manga/random`, {
    params: {
      includes: ['author', 'artist', 'cover_art']
    }
  });
  const res = await req;
  return res.data;
}

const searchManga = async (title, { controller }) => {
  const req = axios.get(`${baseUrl}/manga`, {
    signal: controller.signal,
    params: {
      originalLanguage: ['ja'],
      availableTranslatedLanguage: ['en'],
      title: title,
      contentRating: ['safe', 'suggestive', 'erotica'],
      includes: ['author', 'artist', 'cover_art'],
      limit: 12
    }
  });
  const res = await req;
  return res.data;
}

const getManga = async (mangaId) => {
  const req = axios.get(`${baseUrl}/manga/${mangaId}`, {
    params: {
      includes: ['author', 'artist', 'cover_art']
    }
  });
  const res = await req;
  return res.data;
}

const getChapterList = async (mangaId, offset) => {
  const req = axios.get(`${baseUrl}/chapter`, {
    params: {
      manga: mangaId,
      translatedLanguage: ['en'],
      includes: ['scanlation_group'],
      'order[chapter]': 'desc',
      limit: 100,
      offset: offset
    }
  });
  const res = await req;
  return res.data;
}

const getChapter = async (chapterId) => {
  const req = axios.get(`${baseUrl}/chapter/${chapterId}`, {
    params: {
      includes: ['manga']
    }
  });
  const res = await req;
  return res.data;
}

const getPageHash = async (chapterId) => {
  const req = axios.get(`${baseUrl}/at-home/server/${chapterId}`);
  const res = await req;
  return res.data;
}

const getPageImage = async (url) => {
  const req = axios.get(url, {
    responseType: 'arraybuffer'
  });
  const res = await req;
  return res.data;
}

const mangadexApi = {
  getRandomManga,
  getChapterList,
  searchManga,
  getManga,
  getChapter,
  getPageHash,
  getPageImage
}

export default mangadexApi;
