import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react';
import axios from 'axios';
import CardInfo from './CardInfo';

const Home = () => {

  
  

  const getAllStoreData = async()=>{
    try {
         
        const response = await axios.get('http://localhost:8081/get-all-store');
      if (response) {
        // console.log(response.data);
        
        
      }else {
        alert("store data connot be fetch");
        
      }
       } catch (error) {
        console.log(error);
        
       }
  }
  useEffect(()=>{
    getAllStoreData();
  },[])
  return (
    <>
   <Navbar/>
   <CardInfo/>
    </>
  )
}

export default Home

