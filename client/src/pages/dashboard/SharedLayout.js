import { Link, Outlet } from 'react-router-dom';

export default function SharedLayout() {
  return (
    <>
      <nav>
        <Link to="stats">Stats</Link>
        <Link to="all-jobs">All Jobs</Link>
        <Link to="add-job">Add Job</Link>
        <Link to="profile">Profile</Link>
      </nav>
      <Outlet />
    </>
  );
}
