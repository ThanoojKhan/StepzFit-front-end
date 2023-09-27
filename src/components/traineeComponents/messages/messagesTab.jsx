import React, { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import { useNavigate } from 'react-router-dom';

const END_POINT = import.meta.env.VITE_BASEURL
let socket;

function MessagesTab() {

    const { userId } = useSelector((store) => store.User)
    const bottomRef = useRef(null)
    const [chat, setChat] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [profile1, setProfile1] = useState(null)
    const [profile2, setProfile2] = useState(null)
    const [trainer, setTrainer] = useState('')
    const [name, setName] = useState('')
    const [admin, setAdmin] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)
    const [showToaster, setShowToaster] = useState(false)
    const [chatId, setChatId] = useState('')
    const [msg, setMsg] = useState('')
    const [latestMessage, setLatestMessage] = useState([])
    const navigate = useNavigate()


    useEffect(() => {

        socket = io(END_POINT)
        socket.emit('setup', userId)
        socket.on('connection', chat?._id)
        return () => {
            socket.disconnect()
        }
    }, [chat])

    const fetchDetails = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get('/chat/userChatList',);
            setTrainer(response?.data?.trainer);
            setLatestMessage(response?.data?.latestMessage?.latestMessage)
            setAdmin(response?.data?.admin);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setShowToaster(true)
            toast.error('An error occurred while fetching trainer.');
        }
    };

    const loadChat = (userId, receiverId) => {
        setChatLoading(true)
        axiosInstance.post('/chat/accessChat', { userId, receiverId }).then((res) => {
            setMessages(res?.data?.messages)
            setChat(res?.data?.chat)
            setChatId(res?.data?.chat?._id)
            socket.emit('joinChat', chat?._id);
            setMessage('')
            setChatLoading(false);
        }).catch((err) => {
            console.log(err);
            if (err?.response?.data?.errMsg) {
                setShowToaster(true)
                setChatLoading(false)
                toast.error(err?.response?.data?.errMsg)
            }
        })
    }
    const sendMessage = () => {
        if (message.length !== 0) {
            axiosInstance.post('/chat/addMessage', { message, chatId, sender: userId }).then((res) => {
                let updMsg = [...messages, res?.data?.msg];
                setMessages(updMsg)
                setMessage('')
                socket.emit('new message', res?.data?.msg, chatId)
            }).catch((err) => {
                if (err?.response?.data?.errMsg) {
                    setShowToaster(true)
                    toast.error(err.response.data.errMsg)
                }
            })
        }
    }

    useEffect(() => {
        socket.on('messageResponse', (msg, room) => {
            setMsg(msg)
            if (room === chatId) {
                let updMsg = [...messages, msg];
                setMessages(updMsg)
            }
        })
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chat]);
    console.log(JSON.stringify(msg) + '===');
    useEffect(() => {
        fetchDetails();
    }, []);

    function formatMessageDate(createdAt) {
        const currentDate = new Date();
        const messageDate = new Date(createdAt);

        if (
            currentDate.getDate() === messageDate.getDate() &&
            currentDate.getMonth() === messageDate.getMonth() &&
            currentDate.getFullYear() === messageDate.getFullYear()
        ) {
            return messageDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
        } else if (
            currentDate.getDate() - messageDate.getDate() === 1 &&
            currentDate.getMonth() === messageDate.getMonth() &&
            currentDate.getFullYear() === messageDate.getFullYear()
        ) {
            return 'Yesterday';
        } else {
            const day = messageDate.getDate().toString().padStart(2, '0');
            const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
            const year = messageDate.getFullYear();
            return `${day}/${month}/${year}`;
        }
    }
    return (
        <>
            {showToaster && <Toaster toastOptions={3000} />}
            <div className='md:grid hidden h-screen'>
                <div className="flex h-screen w-screen antialiased text-gray-800 px-4">
                    <div className="sm:flex sm:flex-row h-full w-full overflow-x-hidden ">
                        <div className="flex sm:flex sm:flex-col py-8 pl-2 sm:overflow-y-auto pr-2 mr-3 gap-2 sm:w-64 md:w-96 bg-white flex-shrink-0 rounded-2xl h-full">
                            <button onClick={() => navigate(-1)} className='bg-black hidden sm:block text-white hover:bg-white hover:text-black py-2 rounded-md'>Close</button>

                            {isLoading ? <>{
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
                                    {
                                        trainer?._id && (
                                            <div onClick={() => { loadChat(userId, trainer?._id); setName(`${trainer?.firstName} ${trainer?.secondName}`) }} className="flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative">
                                                <div className='flex items-center'>
                                                    <div className='h-16 w-16 rounded-full border overflow-hidden'>
                                                        <img src={`${trainer?.profileImage ? trainer?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}`} alt='Avatar' className="h-full w-full" />
                                                    </div>
                                                    <div className='ms-4'>
                                                        <div className='flex items-center'>{trainer?.firstName} {trainer?.secondName}
                                                        </div>
                                                        <div style={{ fontSize: "0.73em" }}>{trainer?._id == latestMessage?.sender ? latestMessage?.message : ''}</div>
                                                    </div>
                                                </div>
                                                <div className='absolute top-2 right-4'>
                                                    {trainer?._id === latestMessage?.sender && (
                                                        formatMessageDate(latestMessage?.createdAt)
                                                    )}
                                                </div>

                                            </div>
                                        )
                                    }

                                    {
                                        admin?._id && (
                                            <div onClick={() => { loadChat(userId, admin?._id); setName(`${admin?.firstName} ${admin?.secondName}`) }} className="flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative">
                                                <div className='flex items-center'>
                                                    <div className='h-16 w-16 rounded-full border overflow-hidden'>
                                                        <img src={`${admin?.profileImage ? admin?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}`} alt='Avatar' className="h-full w-full" />
                                                    </div>
                                                    <div className='ms-4'>
                                                        <div className='flex items-center'>{admin?.firstName} {admin?.secondName}
                                                        </div>
                                                        <div style={{ fontSize: "0.73em" }}>{admin?._id == latestMessage?.sender ? latestMessage?.message : ''}</div>
                                                    </div>
                                                </div>
                                                <div className='absolute top-2 right-4'>
                                                    {admin?._id === latestMessage?.sender && (
                                                        formatMessageDate(latestMessage?.createdAt)
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
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
                                                {/* <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-full overflow-hidden animate-pulse"><img src="https://w7.pngwing.com/pngs/179/583/png-transparent-telephone-call-icon-phone-call-application-screenshot-blue-electronics-text.png" alt="" />Audio call</div>
                                                <div className="h-10 w-10 rounded-full overflow-hidden animate-pulse"><img src="https://cdn-icons-png.flaticon.com/512/3687/3687415.png" alt="" /></div>
                                            </div> */}
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
                                                        <h1 className="text-xl text-white font-semibold">{name}</h1>
                                                        {/* <small>Online</small> */}
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
                                                                className="flex w-full border text-white rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
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
            </div >
        </>
    )
}

export default MessagesTab