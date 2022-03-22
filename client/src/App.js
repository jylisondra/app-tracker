import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// styles
import './App.css';

// pages
import Landing from './pages/landing/Landing';
import Error from './pages/error/Error';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
