import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './Profile';
import AddStore from './AddStore';
import AddUser from './AddUser';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/signup' element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
          } />

          <Route path='/' element={<PublicRoute><Login /></PublicRoute>
        } />


        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
        </Route>

<Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
  <Route path="/home" element={<Home />} />
  <Route path="/Profile" element={<Profile />} />
  <Route path="/Addstore" element={<AddStore />} />
  <Route path="/AddUser" element={<AddUser />} />
</Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
