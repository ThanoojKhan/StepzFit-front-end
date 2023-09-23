import React from 'react'
import MessagesTab from '../../components/traineeComponents/messages/messagesTab'
import SideBar from '../../components/traineeComponents/sideBar'
import NavBar from '../../components/traineeComponents/NavBar'
import Chat from '../../components/traineeComponents/Chat/Chat'

function Messages() {

  return (
    <div className='flex'>
      <NavBar />
      <SideBar />
      {/* <MessagesTab /> */}
      <Chat/>
    </div>
  )
}

export default Messages