import { NavLink } from 'react-router-dom';
import links from '../../utils/links';
import { useAppContext } from '../../context/AppContext';
import styles from './NavLinks.module.css';
import classnames from 'classnames';
export default function NavLinks() {
  const { toggleSidebar } = useAppContext();
  return (
    <div className={styles.navlinks}>
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              classnames(styles.navlink, isActive ? styles.active : '')
            }
          >
            <div className={styles.icon}>{icon}</div>
            <span className={styles.link_name}>{text}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
