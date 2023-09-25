import React, { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';

const END_POINT = 'http://localhost:4000'
let socket;

function MessagesTab() {

    const { userId, token } = useSelector((store) => store.User)
    const bottomRef = useRef(null)
    const [chat, setChat] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [profile1, setProfile1] = useState(null)
    const [profile2, setProfile2] = useState(null)
    const [trainer, setTrainer] = useState('')
    const [admin, setAdmin] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showToaster, setShowToaster] = useState(false)


    useEffect(() => {
        socket = io(END_POINT)
        socket.emit('setup', userId)
        socket.on('connection', chat?._id)
        return () => {
            socket.disconnect()
        }
    }, [])


    const fetchDetails = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get('/user/trainerDetails', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTrainer(response?.data?.trainer?.trainerId);
            setAdmin(response?.data?.admin);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setShowToaster(true)
            toast.error('An error occurred while fetching trainer.');
        }
    };


    const loadChat = (userId, receiverId) => {
        setIsLoading(true)
        axiosInstance.post('/chat/accessChat', { userId, receiverId }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setMessages(res.data.messages)
            setChat(res.data.chat)
            if (res.data.chat.users[0]._id === userId) {
                setProfile1(res?.data?.chat?.users[0]?.profileImage)
                setProfile2(res?.data?.chat?.users[1]?.profileImage)
            } else {
                setProfile2(res?.data?.chat?.users[0]?.profileImage)
                setProfile1(res?.data?.chat?.users[1]?.profileImage)
            }
            let id = res?.data?.chat?._id;
            socket.emit('joinChat', id)
            setMessage('')
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            if (err?.response?.data?.errMsg) {
                setShowToaster(true)
                toast.error(err?.response?.data?.errMsg)
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
                    setShowToaster(true)
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
    }, [])

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <>
            {isLoading ? <Loader /> : ''}
            {showToaster && <Toaster toastOptions={3000} />}

            <div style={{ width: '95%' }} className="h-screen">
                <div className="flex h-full my-20 md:my-0 md:h-screen antialiased text-gray-800">
                    <div className="sm:flex sm:flex-row  w-full overflow-x-auto">
                        <div className="flex flex-col  p-5 overflow-x-auto overflow-y-auto sm:w-64 bg-gray-700 flex-shrink-0">
                            {trainer?._id && (
                                <div
                                    onClick={() => loadChat(userId, trainer._id)}
                                    className="flex mt-14 flex-col items-center hover:scale-105 bg-indigo-100 border border-gray-200 w-full py-6 px-4 rounded-lg cursor-pointer">
                                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                                        <img
                                            src={
                                                trainer?.profileImage ||
                                                'https://www.kreedon.com/wp-content/uploads/2022/07/certified_personal_trainer_mobile_hero_image_2x-696x427.jpg'
                                            }
                                            alt="Avatar"
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <div className="text-sm font-semibold mt-2">
                                        {trainer?.firstName} {trainer?.secondName}
                                    </div>
                                </div>
                            )}
                            {admin?._id && (
                                <div
                                    onClick={() => loadChat(userId, admin._id)}
                                    className="flex flex-col hover:scale-105 transition-transform items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg cursor-pointer">
                                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                                        <img
                                            src={
                                                admin?.profileImage ||
                                                'https://imgix.watchcrunch.com/images/2023/6/6/Hrwk4wWYexAhykkcbpC1bdJx3fQS9Sb8GV8vvOby.jpg?auto=format&fit=crop&h=400&ixlib=php-3.3.1&w=400&s=58553d0f542c6d4cd6b460447ad6cdeb'
                                            }
                                            alt="Avatar"
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <div className="text-sm font-semibold mt-2">{admin?.name}</div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col flex-auto h-full p-6">
                            {chat ? (
                                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                                        <div className="flex flex-col h-full">
                                            {messages.map((message) => (
                                                <div key={message._id} className="grid grid-cols-12 gap-y-2">
                                                    {(message?.sender?._id || message?.sender) == userId ? (
                                                        <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                                            <div className="flex items-center justify-start flex-row-reverse">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                    <img
                                                                        src={profile1 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                                        alt="Avatar"
                                                                        className="h-full w-full rounded-full"
                                                                    />
                                                                </div>
                                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                    <div>{message?.message}</div>
                                                                    <small className="text-xs text-gray-400">
                                                                        {new Date(message?.createdAt).toLocaleString('en-US', {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            hour12: true,
                                                                        })}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                                            <div className="flex flex-row items-center">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                    <img
                                                                        src={profile2 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                                        alt="Avatar"
                                                                        className="h-full w-full rounded-full"
                                                                    />
                                                                </div>
                                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                    <div>{message.message}</div>
                                                                    <small>
                                                                        {new Date(message?.createdAt).toLocaleString('en-US', {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            hour12: true,
                                                                        })}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div ref={bottomRef} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                        <div className="flex-grow ml-4 relative">
                                            <input
                                                onChange={(e) => setMessage(e.target.value)}
                                                value={message}
                                                type="text"
                                                className="flex w-full border rounded-xl text-white focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                placeholder="Type your message..."
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <button
                                                onClick={() => {
                                                    sendMessage();
                                                }}
                                                type="button"
                                                className="flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl  px-4 py-1 flex-shrink-0"
                                            >
                                                <span>Send</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center h-screen">
                                    <h1 className="self-center text-3xl">Select any message!!</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessagesTab