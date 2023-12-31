import React from 'react'
import Dashboard from '../../components/traineeComponents/dashBoard/dashboard'
import SideBar from '../../components/traineeComponents/sideBar'
import NavBar from "../../components/traineeComponents/NavBar"
import { Toaster } from 'react-hot-toast'

function DashBoard() {

  return (
    <div className='flex'>
      <NavBar />
      <SideBar />
      <Dashboard />
    </div>
  )
}

export default DashBoard