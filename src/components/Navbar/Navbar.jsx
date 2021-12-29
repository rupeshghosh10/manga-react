import { FaBars } from 'react-icons/fa';
import styles from './Navbar.module.css';
import logo from '../../Icon.svg';

const Navbar = () => {
  return (
    <nav>
      <div className={styles.header}>
        <button className={styles.toggle}>
          <FaBars />
        </button>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
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
      </div>
      <div className={styles.account}>
        <a href='/'>Log In</a>
      </div>
    </nav>
  )
};

export default Navbar;
