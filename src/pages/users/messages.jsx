import React from 'react'
import MessagesTab from '../../components/traineeComponents/messages/messagesTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'
import NavBar from '../../components/traineeComponents/NavBar'

function Messages() {

  return (
    <div className='flex'>
      <NavBar />
      <SideBar />
      <MessagesTab />
    </div>
  )
}

export default Messages