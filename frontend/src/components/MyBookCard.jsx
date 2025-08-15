// frontend/src/components/MyBookCard.jsx
import React, { useState } from 'react';
import api from '../services/api';

export default function MyBookCard({ mybook, onUpdated }) {
  const [status, setStatus] = useState(mybook.status);
  const [rating, setRating] = useState(mybook.rating || '');
  const [err, setErr] = useState(null);

  const updateStatus = async (newStatus) => {
    try {
      setErr(null); // reset previous error
      await api.patch(`/api/mybooks/${mybook.bookId._id}/status`, { status: newStatus });
      setStatus(newStatus);
      onUpdated && onUpdated();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErr('Could not update status');
    }
  };

  const updateRating = async (newRating) => {
    try {
      setErr(null);
      await api.patch(`/api/mybooks/${mybook.bookId._id}/rating`, { rating: newRating });
      setRating(newRating);
      onUpdated && onUpdated();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErr('Could not update rating');
    }
  };

  return (
    <div className="card p-3">
      <div className="d-flex gap-3">
        <img src={mybook.bookId.coverImage} alt={mybook.bookId.title} style={{ width: 80 }} />
        <div>
          <h5>{mybook.bookId.title}</h5>
          <p>{mybook.bookId.author}</p>

          <div className="mb-2">
            <label className="me-2">Status:</label>
            <select value={status} onChange={(e) => updateStatus(e.target.value)}>
              <option>Want to Read</option>
              <option>Currently Reading</option>
              <option>Read</option>
            </select>
          </div>

          <div>
            <label className="me-2">Rating:</label>
            <select value={rating || ''} onChange={(e) => updateRating(Number(e.target.value))}>
              <option value="">--</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {err && <div className="text-danger mt-2">{err}</div>}
        </div>
      </div>
    </div>
  );
}
