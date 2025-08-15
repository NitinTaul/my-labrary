// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { register } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h3>Register</h3>
      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary">Register</button>
    </form>
  );
}
