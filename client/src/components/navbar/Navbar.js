import { useState } from 'react';
import classnames from 'classnames';
import { FaBars, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logoutUser, showSidebar, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav
      className={classnames(
        styles.navbar,
        showSidebar ? styles.active_sidebar : ''
      )}
    >
      <div className={styles.nav_left}>
        <button className={styles.btn_toggle} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <p className={styles.logo}>
          <span>JOB</span>LY
        </p>
      </div>
      <div className={styles.nav_center}></div>

      <div className={styles.btn_container}>
        <button onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle />
          <span className={styles.user}>{user && user.firstName}</span>
          <FaCaretDown />
        </button>
        <div
          className={classnames(
            styles.dropdown,
            showLogout ? styles.show_dropdown : ''
          )}
        >
          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
