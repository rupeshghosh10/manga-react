const addManga = (manga) => {
  if (isEmpty()) {
    console.log('ran');
    localStorage.setItem('mangaReactHistory', JSON.stringify([manga]));
  }
  else {
    let mangaHistory = JSON.parse(localStorage.getItem('mangaReactHistory'));
    let index = alreadyExist(mangaHistory, manga);
    if (index !== -1) {
      mangaHistory.splice(index, 1);
    }
    else if (mangaHistory.length === 10) {
      mangaHistory.pop();
    }
    localStorage.setItem('mangaReactHistory', JSON.stringify([manga, ...mangaHistory]));
  }
}

const getHistory = () => {
  return JSON.parse(localStorage.getItem('mangaReactHistory'));
}

const isEmpty = () => {
  return localStorage.getItem('mangaReactHistory') === null;
}

const alreadyExist = (mangaHistory, manga) => {
  return mangaHistory.findIndex(x => x.id === manga.id);
}

const history = {
  addManga,
  getHistory
}

export default history
