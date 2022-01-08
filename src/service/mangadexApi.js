import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

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

const getChapterList = async (mangaId) => {
  const req = axios.get(`${baseUrl}/chapter`, {
    params: {
      manga: mangaId,
      translatedLanguage: ['en'],
      includes: ['scanlation_group'],
      'order[chapter]': 'desc',
      limit: 100
    }
  });
  const res = await req;
  return res.data;
}

const mangadexApi = {
  getRandomManga,
  getChapterList,
  searchManga,
  getManga
}

export default mangadexApi;
