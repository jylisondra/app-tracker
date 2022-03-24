import { FaAlignJustify, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { user } = useAppContext();
  return (
    <nav className="navbar">
      <div className="nav-center">
        <button className="btn-toggle" onClick={() => console.log('toggled')}>
          <FaAlignJustify />
        </button>
        <p>LOGO HERE</p>
      </div>

      <div className="btn-container">
        <button>
          <FaUserCircle />
          <p>{user.firstName}</p>
          <FaCaretDown />
        </button>
      </div>
    </nav>
  );
}
