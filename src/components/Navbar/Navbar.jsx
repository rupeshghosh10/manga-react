import { FaBars } from 'react-icons/fa';
import styles from './Navbar.module.css';
import logo from '../../Icon.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {

  const [toggle, setToggle] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const changeWidth = () => {
    setScreenWidth(window.innerWidth);
  }

  const handleToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
  }, []);

  return (
    <nav className={toggle ? styles.noBorder : ''}>
      <div className={styles.header}>
        <button className={`${styles.toggle} ${toggle ? styles.toggleRotate : ''}`} onClick={handleToggle}>
          <FaBars />
        </button>
        <img src={logo} alt="logo" className={styles.logo} />
        <h2 className={styles.headerName}>MangaReact</h2>
      </div>
      {(toggle || screenWidth > 740) &&
        <div className={styles.linksContainer}>
          <ul className={styles.links}>
            <li>
              <a href="/">Discover</a>
            </li>
            <li>
              <a href="/">Search</a>
            </li>
            <li>
              <a href="/">History</a>
            </li>
            <li>
              <a href="/">Saved</a>
            </li>
            <li>
              <a href="/">Random</a>
            </li>
            <li>
              <a href="/">Github</a>
            </li>
          </ul>
        </div>}
      <div className={styles.account}>
        <a href='/'>Log In</a>
      </div>
    </nav>
  )
};

export default Navbar;
