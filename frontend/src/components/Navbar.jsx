// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">My Library</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/mybooks">My Books</Link></li>}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item nav-link"> {user.email} </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
