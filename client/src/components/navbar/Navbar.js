import { useState } from 'react';
import classnames from 'classnames';
import { FaBars, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser } = useAppContext();

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_center}>
        <p>
          <span>JOB</span>LY
        </p>
        <button className={styles.btn_toggle} onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <div className={styles.btn_container}>
        <button onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle />
          <span className={styles.user}>{user.firstName}</span>
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
