import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import SmallSideBar from '../../components/smallSideBar/SmallSideBar';
import BigSideBar from '../../components/bigSideBar/BigSideBar';

export default function SharedLayout() {
  return (
    <>
      <main>
        <BigSideBar />
      </main>
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
