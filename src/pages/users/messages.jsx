import React from 'react'
import MessagesTab from '../../components/traineeComponents/messages/messagesTab'
import SideBar from '../../components/traineeComponents/sideBar'
import { Toaster } from 'react-hot-toast'

function Messages() {

  return (
    <div className='flex'><Toaster toastOptions={3000} />
        <SideBar/>
        <MessagesTab/>
    </div>
  )
}

export default Messages