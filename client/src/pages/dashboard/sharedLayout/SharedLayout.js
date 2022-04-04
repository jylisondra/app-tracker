import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import classnames from 'classnames';

import Navbar from '../../../components/navbar/Navbar';
import SmallSideBar from '../../../components/smallSideBar/SmallSideBar';
import BigSideBar from '../../../components/bigSideBar/BigSideBar';

import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  const { showSidebar } = useAppContext();
  return (
    <>
      <main>
        <SmallSideBar />
        <BigSideBar />
      </main>
      <div>
        <Navbar />
        <div
          className={classnames(
            styles.content_page,
            showSidebar ? styles.active_sidebar : ''
          )}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
