import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import io from 'socket.io-client'

const END_POINT = 'http://localhost:4000'
let socket;

function MessagesTab() {

  const { adminId, token } = useSelector((store) => store.Admin)
  const userId = adminId
  const bottomRef = useRef(null)
  const [chat, setChat] = useState()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [profile1, setProfile1] = useState(null)
  const [profile2, setProfile2] = useState(null)
  const [trainee, setTrainee] = useState([])
  const [trainer, setTrainer] = useState([])
  const [loading, setLoading] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    socket = io(END_POINT)
    socket.emit('setup', userId)
    socket.on('connection')
    return () => {
      socket.disconnect()
    }
  }, [])


  const fetchDetails = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/chat/allDetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrainee(response?.data?.trainees);
      setTrainer(response?.data?.trainers);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching trainer.');
    }
  };


  const loadChat = (userId, receiverId) => {
    setChatLoading(true)
    axiosInstance.post('/chat/accessChat', { userId, receiverId }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setMessages(res?.data?.messages)
      setChat(res?.data?.chat)
      if (res?.data?.chat?.users[0]?._id === userId) {
        setProfile1(res?.data?.chat?.users[0]?.profileImage)
        setProfile2(res?.data?.chat?.users[1]?.profileImage)
      } else {
        setProfile2(res?.data?.chat?.users[0]?.profileImage)
        setProfile1(res?.data?.chat?.users[1]?.profileImage)

      }
      let id = res.data?.chat?._id;
      socket.emit('joinChat', id)
      setMessage('')
      setChatLoading(false);
    }).catch((err) => {
      console.log(err);
      if (err?.response?.data?.errMsg) {
        toast.error(err.response.data.errMsg)
      }
    })
  }

  const sendMessage = () => {
    const chatId = chat?._id
    if (message.length !== 0) {
      axiosInstance.post('/chat/addMessage', { message, chatId, sender: userId }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        let updMsg = [...messages, res?.data?.msg];
        setMessages(updMsg)
        setMessage('')
        socket.emit('new message', res?.data?.msg, chatId)
      }).catch((err) => {
        if (err?.response?.data?.errMsg) {
          toast.error(err.response.data.errMsg)
        }
      })
    }

  }

  useEffect(() => {
    socket.on('messageResponse', (msg, room) => {
      if (room == chat?._id) {
        let updMsg = [...messages, msg];
        setMessages(updMsg)
      }
    })
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  })

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <Toaster toastOptions={3000} />

      <div className='md:grid hidden h-screen'>
        <div className="flex h-screen w-screen antialiased text-gray-800 px-4">
          <div className="sm:flex sm:flex-row h-full w-full overflow-x-hidden ">

            <div className="flex sm:flex sm:flex-col py-8 pl-2 sm:overflow-y-scroll pr-2 mr-3 gap-2 sm:w-64 md:w-96 bg-white flex-shrink-0 rounded-2xl h-full">
              <button onClick={() => navigate(-1)} className='bg-black hidden sm:block text-white hover:bg-white hover:text-black py-2 rounded-md'>Close</button>

              {loading ? <>{
                [1, 2, 3, 4, 5].map(item => {
                  return (
                    <div key={item} className="flex justify-between items-center border-2 mb-1  bg-gray-300 dark:bg-gray-400 animate-pulse rounded-lg p-2 relative">
                      <div className='flex items-center  bg-gray-400'>
                        <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse h-16 w-16 rounded-full border overflow-hidden'>
                        </div>
                        <div>
                          <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-4 w-36'></div>
                          <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-3 w-26 mt-2'></div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }</> :

                <>
                  {trainee.length !== 0 && (
                    trainee.map((trainee, index) => (
                      trainee._id ? (
                        <div key={index} onClick={() => loadChat(userId, trainee._id)} className="flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative">
                          <div className='flex items-center'>
                            <div className='h-16 w-16 rounded-full border overflow-hidden'>
                              <img src={`${trainee?.profileImage ? trainee?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}`} alt='Avatar' className="h-full w-full" />
                            </div>
                            <div className='ms-4'>
                              <div className='flex items-center'>{trainee.name}
                              </div>
                              <div style={{ fontSize: "0.73em" }}>{chat?.latestMessage?.message} </div>
                            </div>
                          </div>
                          <div className='absolute top-2 right-4'>date
                          </div>

                        </div>
                      ) : ''
                    ))
                  )}

                  {trainer.length !== 0 && (
                    trainer.map((trainer, index) => (
                      trainer._id ? (
                        <div key={index} onClick={() => loadChat(userId, trainer._id)} className="flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative">
                          <div className='flex items-center'>
                            <div className='h-16 w-16 rounded-full border overflow-hidden'>
                              <img src={`${trainer?.profileImage ? trainer?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}`} alt='Avatar' className="h-full w-full" />
                            </div>
                            <div className='ms-4'>
                              <div className='flex items-center'>{trainer.firstName} {trainer.secondName}
                              </div>
                              <div style={{ fontSize: "0.73em" }}>{chat?.latestMessage?.message} </div>
                            </div>
                          </div>
                          <div className='absolute top-2 right-4'>date
                          </div>

                        </div>
                      ) : ''
                    ))
                  )}
                </>}
            </div>



            {chatLoading ?
              <>
                <div className="flex flex-col flex-auto h-full w-fit">
                  {chat ?
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full">
                      {/* header */}
                      <div className="flex items-center justify-between px-10 p-4 bg-indigo-600 text-white rounded-t-2xl">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img
                              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                              alt="Avatar"
                              className="h-full w-full"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden animate-pulse"><img src="https://w7.pngwing.com/pngs/179/583/png-transparent-telephone-call-icon-phone-call-application-screenshot-blue-electronics-text.png" alt="" />Audio call</div>
                          <div className="h-10 w-10 rounded-full overflow-hidden animate-pulse"><img src="https://cdn-icons-png.flaticon.com/512/3687/3687415.png" alt="" /></div>
                        </div>
                      </div>
                      {/* header */}

                      {/* Converstaion */}

                      <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="grid grid-cols-12 gap-y-2">
                              <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    <img
                                      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                                      alt="Avatar"
                                      className="h-full w-full rounded-full"
                                    />
                                  </div>
                                  <div className="relative mr-3 text-lg bg-indigo-100 py-2 px-4 shadow rounded-xl animate-pulse">
                                    <div>Loading...</div>
                                    <small className="text-xs text-gray-400 animate-pulse">
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                <div className="flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    <img
                                      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                                      alt="Avatar"
                                      className="h-full w-full rounded-full"
                                    />
                                  </div>
                                  <div className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl animate-pulse">
                                    <div>Loading...</div>
                                    <small className="text-xs text-gray-400 animate-pulse">
                                    </small>
                                  </div>
                                </div>
                              </div>

                              <div ref={bottomRef} />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Converstaion */}
                    </div>
                    :
                    <div className='flex justify-center h-screen bg-white'><h1 className='self-center text-3xl animate-pulse'>Select a Chat!!</h1>
                    </div>
                  }
                </div>
              </>
              :
              <>
                <div className="flex flex-col flex-auto h-full w-fit">
                  {chat ?
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full">
                      {/* header */}
                      <div className="flex items-center justify-between px-10 p-4 bg-indigo-600 text-white rounded-t-2xl">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img
                              src={profile2 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                              alt="Avatar"
                              className="h-full w-full"
                            />
                          </div>
                          <div>
                            <h1 className="text-xl font-semibold">Name</h1>
                            <small>Online</small>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden"><img src="https://w7.pngwing.com/pngs/179/583/png-transparent-telephone-call-icon-phone-call-application-screenshot-blue-electronics-text.png" alt="" />Audio call</div>
                          <div className="h-10 w-10 rounded-full overflow-hidden"><img src="https://cdn-icons-png.flaticon.com/512/3687/3687415.png" alt="" /></div>
                        </div>
                      </div>
                      {/* header */}

                      {/* Converstaion */}

                      <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                          {messages?.map((message) => (
                            <div key={message?._id} className="grid grid-cols-12 gap-y-2">
                              {(message?.sender) == userId ?
                                <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                  <div className="flex items-center justify-start flex-row-reverse">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                      <img
                                        src={profile1 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full"
                                      />
                                    </div>
                                    <div className="relative mr-3 text-lg bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                      <div>{message?.message}</div>
                                      <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                      })}</small>
                                    </div>
                                  </div>
                                </div>
                                :
                                <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                  <div className="flex flex-row items-center">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                      <img
                                        src={profile2 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full"
                                      />
                                    </div>
                                    <div className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl">
                                      <div>{message.message}</div>
                                      <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                      })}</small>
                                    </div>
                                  </div>
                                </div>
                              }
                              <div ref={bottomRef} />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Converstaion */}


                      <div>
                        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                          <div className="flex-grow ml-4">
                            <div className="relative w-full">
                              <input
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                type="text"
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                placeholder="Type your message..."
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={() => sendMessage()}
                              type='button'
                              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            >
                              <span>Send</span>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                    :
                    <div className='flex justify-center h-screen bg-white'><h1 className='self-center text-3xl animate-pulse'>Select a Chat!!</h1>
                    </div>
                  }
                </div>
                {/* Converstaion */}
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default MessagesTab