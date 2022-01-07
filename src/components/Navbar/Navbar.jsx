import { FaBars } from 'react-icons/fa';
import styles from './Navbar.module.css';
import logo from '../../Icon.svg';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    return () => window.removeEventListener('resize', changeWidth);
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
      {(toggle || screenWidth > 750) &&
        <div className={styles.linksContainer}>
          <ul className={styles.links}>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={handleToggle}>
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? styles.active : ''} onClick={handleToggle}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => isActive ? styles.active : ''} onClick={handleToggle}>
                History
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved" className={({ isActive }) => isActive ? styles.active : ''} onClick={handleToggle}>
                Saved
              </NavLink>
            </li>
            <li>
              <NavLink to="/random" className={({ isActive }) => isActive ? styles.active : ''} onClick={handleToggle}>
                Random
              </NavLink>
            </li>
            <li>
              <a href="https://github.com/RupeshGhosh10/manga-react">Github</a>
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
