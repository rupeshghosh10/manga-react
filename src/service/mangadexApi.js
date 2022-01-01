import axios from 'axios';

const baseUrl = 'https://api.mangadex.org/';

const getRandomManga = async () => {
  const req = axios.get(baseUrl + 'manga/random');
  const res = await req;
  return res.data;
}

const getCover = async (id) => {
  const req = axios.get(baseUrl + 'cover/' + id);
  const res = await req;
  return res.data;
}

const mangadexApi = {
  getRandomManga,
  getCover
}

export default mangadexApi;
