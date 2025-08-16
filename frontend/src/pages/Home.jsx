// // frontend/src/pages/Home.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import BookCard from '../components/BookCard';

// export default function Home() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBooks() {
//       try {
//         setLoading(true);
//         const res = await api.get('/api/books');
//         setBooks(res.data.books);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBooks();
//   }, []);

//   if (loading) return <div>Loading books...</div>;

//   return (
//     <div>
//       <h2>Books</h2>
//       <div className="d-flex flex-wrap gap-3">
//         {books.map(b => <BookCard key={b._id} book={b} />)}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")

      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      {books.map(book => (
        <BookCard key={book._id} book={book} user={user} />
      ))}
    </div>
  );
}
