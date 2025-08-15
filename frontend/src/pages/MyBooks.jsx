// frontend/src/pages/MyBooks.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MyBookCard from '../components/MyBookCard';

export default function MyBooks() {
  const [mybooks, setMybooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/mybooks');
      setMybooks(res.data.mybooks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>My Books</h2>
      {loading ? <div>Loading...</div> : (
        <div className="d-flex flex-column gap-3">
          {mybooks.length === 0 && <p>You have no books yet.</p>}
          {mybooks.map(m => (
            <MyBookCard key={m._id} mybook={m} onUpdated={load} />
          ))}
        </div>
      )}
    </div>
  );
}
