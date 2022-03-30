import NavLinks from '../navLinks/NavLinks';
import { useAppContext } from '../../context/AppContext';
import classnames from 'classnames';
import styles from './BigSideBar.module.css';

export default function BigSideBar() {
  const { showSidebar, toggleSidebar } = useAppContext();

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
      </div>
    </div>
  );
}
