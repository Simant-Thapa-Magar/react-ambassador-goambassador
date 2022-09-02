import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductFrontEnd from './Pages/ProductFrontEnd';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Stats from './Pages/Stats';
import Rankings from './Pages/Rankings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<ProductFrontEnd />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/stats'} element={<Stats />} />
          <Route path={'/rankings'} element={<Rankings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
