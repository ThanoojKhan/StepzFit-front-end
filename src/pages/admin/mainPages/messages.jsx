import React from 'react'
import { Toaster } from 'react-hot-toast'
import MessagesAdmin from '../../../components/adminComponents/messages/messages'
function Messages() {
  return (
    <div className='flex'><Toaster toastOptions={3000} />
      <MessagesAdmin/>
    </div>
  )
}

export default Messages