import classnames from 'classnames';
import { useAppContext } from '../../context/AppContext';
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
      </div>
    </div>
  );
}
