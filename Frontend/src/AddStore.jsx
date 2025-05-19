import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStore = () => {
  const [form, setForm] = useState({ store_name: '', store_email: '', store_address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/create-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || 'Store created!');
        navigate('/Dashboard'); // Or redirect to another page
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Add New Store</h2>
    
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="bg-gray-50 p-4 rounded shadow-sm">
        <label className="block text-sm font-medium mb-1">Store Name</label>
        <input
          type="text"
          name="store_name"
          value={form.store_name}
          onChange={handleChange}
          placeholder="Store Name"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          required
        />
      </div>

      <div className="bg-gray-50 p-4 rounded shadow-sm">
        <label className="block text-sm font-medium mb-1">Store Email</label>
        <input
          type="email"
          name="store_email"
          value={form.store_email}
          onChange={handleChange}
          placeholder="Store Email"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          required
        />
      </div>

      <div className="bg-gray-50 p-4 rounded shadow-sm">
        <label className="block text-sm font-medium mb-1">Store Address</label>
        <input
          type="text"
          name="store_address"
          value={form.store_address}
          onChange={handleChange}
          placeholder="Store Address"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-black font-semibold py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
      
    </form>
  </div>
</div>

  );
};

export default AddStore;
