import MangaCover from '../MangaCover/MangaCover';
import Tag from '../Tag/Tag';
import helper from '../../util/helper';
import styles from './MangaBox.module.css';

const MangaBox = ({ manga }) => {

  const cover = helper.findCover(manga);
  const author = helper.findAuthor(manga);
  const artist = helper.findArtist(manga);
  const tags = manga.attributes.tags;

  return (
    <div className={styles.mangaBox}>
      <div className={styles.imageBox}>
        <MangaCover mangaId={manga.id} fileName={cover.attributes.fileName} />
      </div>
      <div className={styles.details}>
        <div>
          <h4 className={styles.title}>{manga.attributes.title.en}</h4>
        </div>
        <div>
          <p className={styles.status}>Status: {manga.attributes.status}</p>
        </div>
        <div>
          {manga.attributes.lastChapter && <p>Chapter: {manga.attributes.lastChapter}</p>}
        </div>
        <div>
          <p>Author: {author.attributes.name}</p>
        </div>
        <div>
          {artist && <p>Artist: {artist.attributes.name}</p>}
        </div>
      </div>
      <div className={styles.tags}>
        {tags.map((tag, i) => <Tag key={i} tag={tag.attributes.name.en} />)}
      </div>
      <div className={styles.synopsis}>
        <h4>Description</h4>
        <p>{manga.attributes.description.en}</p>
      </div>
    </div>
  );
}

export default MangaBox;
