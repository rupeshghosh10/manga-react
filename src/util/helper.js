const find = (object, type) => {
  return object.relationships.find(x => x.type === type);
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

const findScanlationGroup = (chapter) => {
  return find(chapter, 'scanlation_group')
}

const helper = {
  findCover,
  findAuthor,
  findArtist,
  findScanlationGroup
}

export default helper;
