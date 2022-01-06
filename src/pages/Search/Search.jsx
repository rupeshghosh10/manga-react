import { useState } from 'react';
import styles from './Search.module.css';

const Search = () => {

  const [searchText, setSearchText] = useState('');

  const handleTextChange = e => {
    setSearchText(e.target.value);
  }

  return (
    <div className={styles.container}>
      <input placeholder='Search...' className={styles.input} value={searchText} onChange={handleTextChange} />
    </div>
  );
}

export default Search;
