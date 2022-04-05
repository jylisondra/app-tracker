import {
  RiDashboard3Line,
  RiProfileLine,
  RiBriefcase4Line,
  RiFileUserLine,
} from 'react-icons/ri';

const links = [
  {
    id: 1,
    text: 'Dashboard',
    path: '/',
    icon: <RiDashboard3Line />,
  },
  {
    id: 2,
    text: 'Jobs',
    path: 'jobs',
    icon: <RiProfileLine />,
  },
  {
    id: 3,
    text: 'Interviews',
    path: 'interviews',
    icon: <RiBriefcase4Line />,
  },
  {
    id: 4,
    text: 'Profile',
    path: 'profile',
    icon: <RiFileUserLine />,
  },
];

export default links;
