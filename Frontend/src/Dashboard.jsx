import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import DashboardCard from './DashboardCard';
import UserList from './UserList';

const Dashboard = () => {

  const getAllUserData = async()=>{
    try {
         
        const response = await axios.get('http://localhost:8081/get-all-user');
      if (response) {
       
        console.log(response.data);

        
        
      }else {
        alert("store data connot be fetch");
        
      }
       } catch (error) {
        console.log(error);
        
       }
  }

  useEffect(()=>{
    getAllUserData();
  },[])

  return (
  
    <>
       <DashboardCard/>
       <UserList/>
       
    </>
  )
}

export default Dashboard