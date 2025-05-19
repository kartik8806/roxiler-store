import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8081/signup', formData);
      if (res.status === 200) {
        setMessage('User created successfully!');
        setFormData({ name: '', email: '', password: '', address: '', role: 'user' });
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to create user.');
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="mb-4 text-primary">Create New User</h2>

      {message && (
        <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input 
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <select 
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Create User</button>
      </form>
    </div>
  );
};

export default AddUser;
