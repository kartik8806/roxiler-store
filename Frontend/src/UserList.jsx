import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/get-all-user')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center text-secondary mb-3">User List</h3>
      <table className="table table-striped table-bordered text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-muted">No data available</td>
            </tr>
          ) : (
            userData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className={`text-capitalize ${user.role === 'admin' ? 'text-danger fw-bold' : 'text-primary'}`}>
                  {user.role || 'N/A'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
          <div className='text-center'>
       <Link to="/AddUser" className="btn btn-outline-primary btn-sm">
          AddUser
        </Link>

          </div>
    
    </div>
  );
};

export default UserList;