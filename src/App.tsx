import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductFrontEnd from './Pages/ProductFrontEnd';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<ProductFrontEnd />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/profile'} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
