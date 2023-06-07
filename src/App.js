import { Routes, Route } from 'react-router-dom'

import HomePage from 'pages/homePage/HomePage';
import LoginPage from 'pages/loginPage/LoginPage';
import RegisterPage from 'pages/registerPage/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/"  element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  );
}

export default App;
