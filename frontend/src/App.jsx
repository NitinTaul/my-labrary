// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/mybooks" element={user ? <MyBooks /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
