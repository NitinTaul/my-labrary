// // frontend/src/components/BookCard.jsx
// import React from 'react';
// import api from '../services/api';
// import { AuthContext } from '../context/AuthContext';

// export default function BookCard({ book }) {
//   const { user } = React.useContext(AuthContext);
//   const [adding, setAdding] = React.useState(false);

//   const handleAdd = async () => {
//     if (!user) {
//       return alert('Please log in to add this book to your library.');
//     }
//     try {
//       setAdding(true);
//       await api.post(`/api/mybooks/${book._id}`);
//       alert('Added to My Books!');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error adding book');
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="card" style={{ width: 250 }}>
//       <img src={book.coverImage} className="card-img-top" alt={book.title} />
//       <div className="card-body">
//         <h5 className="card-title" style={{fontSize: '1rem'}}>{book.title}</h5>
//         <p className="card-text" style={{fontSize: '.9rem'}}>{book.author}</p>
//         <p>err</p>
//         <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>
//           {adding ? 'Adding...' : 'Want to Read'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function BookCard({ book, user }) {
//   const handleWantToRead = async () => {
//     if (!user) {
//       alert('Please log in to add books');
//       return;
//     }
//     await fetch('/api/books/mybooks', {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...book, status: 'Want to Read' })
//     });
//   };

//   return (
//     <div>
//       <h3>{book.title}</h3>
//       <p>{book.author}</p>
//       <button onClick={handleWantToRead}>Want to Read</button>
//     </div>
//   );
// }

export default function BookCard({ book, user }) {
  const handleWantToRead = async () => {
    if (!user) {
      alert("Please log in to add books");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/books/mybooks", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...book, status: "Want to Read" }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Error:", errText);
        alert("Failed to add book");
        return;
      }

      alert("Book added to 'Want to Read'!");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={handleWantToRead}>Want to Read</button>
    </div>
  );
}
