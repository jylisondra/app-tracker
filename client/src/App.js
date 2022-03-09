import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// styles
import './App.css';

// pages
import Landing from './pages/landing/Landing';
import Error from './pages/error/Error';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
