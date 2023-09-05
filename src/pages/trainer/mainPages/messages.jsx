import React from 'react'
import { Toaster } from 'react-hot-toast'
import SideBar from '../../../components/trainerComponents/sideBar'
import MessagesTrainer from '../../../components/trainerComponents/messages/messages'
function Messages() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <SideBar />
      <MessagesTrainer/>
    </div>
  )
}

export default Messages