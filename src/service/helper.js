const findCoverId = (manga) => {
  return manga.relationships.find(x => x.type === 'cover_art').id;
}

const helper = {
  findCoverId
}

export default helper;
