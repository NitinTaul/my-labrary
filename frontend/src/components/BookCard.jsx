// frontend/src/components/BookCard.jsx
import React from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function BookCard({ book }) {
  const { user } = React.useContext(AuthContext);
  const [adding, setAdding] = React.useState(false);

  const handleAdd = async () => {
    if (!user) {
      return alert('Please log in to add this book to your library.');
    }
    try {
      setAdding(true);
      await api.post(`/api/mybooks/${book._id}`);
      alert('Added to My Books!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding book');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card" style={{ width: 250 }}>
      <img src={book.coverImage} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title" style={{fontSize: '1rem'}}>{book.title}</h5>
        <p className="card-text" style={{fontSize: '.9rem'}}>{book.author}</p>
        <p>err</p>
        <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>
          {adding ? 'Adding...' : 'Want to Read'}
        </button>
      </div>
    </div>
  );
}
