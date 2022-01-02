const find = (manga, type) => {
  return manga.relationships.find(x => x.type == type);
}

const findCover = (manga) => {
  return find(manga, 'cover_art');
}

const findAuthor = (manga) => {
  return find(manga, 'author');
}

const findArtist = (manga) => {
  return find(manga, 'artist');
}

const helper = {
  findCover,
  findAuthor,
  findArtist
}

export default helper;
