import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Link} from "react-router-dom"

const DashboardCard = () => {
  const [userCount, setUserCount] = useState(0);
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/get-all-user')
      .then(response => response.json())
      .then(data => setUserCount(data.length))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8081/get-all-store')
      .then(response => response.json())
      .then(data => setStoreData(data))
      .catch(err => console.log(err));
  }, []);

  const storeCount = storeData.length;
  const total = userCount + storeCount;
  const pieData = [
    { name: 'Registered Users', value: userCount },
    { name: 'Store Register', value: storeCount },
    { name: 'Others', value: Math.max(0, 100 - total) },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
   <div className="container mt-4">
  <div className="row">
    {/* Pie Chart Section */}
    <div className="col-md-5 ms-4 me-3">
      <h2 className="h5 fw-bold mb-4">User Distribution</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    {/* Table Section */}
    <div className="col-md-6 ms-3 border-start ps-4">
      <h3 className="h6 fw-bold text-primary mb-3">Store Listings</h3>
      <table className="table table-bordered text-center shadow-sm small">
        <thead className="table-primary text-dark">
          <tr>
            <th>Store Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map((store) => (
            <tr key={store.id}>
              <td>{store.store_name}</td>
              <td>{store.store_email}</td>
              <td>{store.store_address}</td>
              <td>{store.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Link to="/Addstore" className="btn btn-outline-primary btn-sm">
          Add New Store
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default DashboardCard;
