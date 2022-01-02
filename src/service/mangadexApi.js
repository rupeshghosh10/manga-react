import axios from 'axios';

const baseUrl = 'https://api.mangadex.org/';

const getRandomManga = async () => {
  const req = axios.get(`${baseUrl}manga/random?includes[]=author&includes[]=artist&includes[]=cover_art`);
  const res = await req;
  return res.data;
}

const mangadexApi = {
  getRandomManga
}

export default mangadexApi;
