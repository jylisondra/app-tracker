import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import NavLinks from '../navLinks/NavLinks';
import classnames from 'classnames';
import styles from './BigSideBar.module.css';
import { HiPlus } from 'react-icons/hi';

export default function BigSideBar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  const [showAddToggle, setAddToggle] = useState(false);

  return (
    <div
      className={classnames(
        styles.big_sidebar,
        showSidebar ? styles.show_sidebar : ''
      )}
    >
      <div className={styles.content}>
        <div className={styles.big_sidebar_header}>
          <p>
            <span>JOB</span>LY
          </p>
        </div>
        <NavLinks />
        <Link className={styles.add_link} to="/jobs/create">
          <div className={styles.add_container}>
            <HiPlus className={styles.add_icon} />
            <span>Add Job</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
