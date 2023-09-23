import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { chatListSearch, getUserChatList } from '../../../api/Chat'
import axiosInstance from '../../../api/axios'
import Conversation from './Conversation'
import io from "socket.io-client"
import { errorAlert } from '../../../Functions/Toasts'

// let socket = io(import.meta.env.VITE_BASEURL)

function Chat() {

    const { userId, token } = useSelector(state => state.User)
    const id = userId
    const [chatList, setChatList] = useState([])
    const [chatSelected, selectedChat] = useState(null)
    const [changeList, setChangeList] = useState(null)
    const [showchat, setShowChat] = useState({ list: true, conv: false })
    const [loading, setLoading] = useState(false)


    const fetchData = async () => {
        try {
            setLoading(false)
            const response = await axiosInstance.get(`/chat/userChatList`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data + '==');
            setChatList(response?.data);
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div style={{ width: '95%' }} className=" mt-20 mx-10 md:mx-25 sm:w-auto">
                <div className="md:grid hidden grid-cols-12 h-full">
                    <div className="md:col-span-4 border-2">
                        <div className='fixed bottom-0 w-4/12 z-10 px-2'>
                            <input type='text' placeholder='Search name...' className='p-2 md:block hidden w-full outline-none border-2 rounded-lg border-gray-400' onChange={async (e) => { const regex = new RegExp(e.target.value, "i"); setChatList(await chatListSearch(id, regex)) }} />
                        </div>
                        <div className='p-2 overflow-x-hidden overflow-y-auto hideScrollBar mb-10'>
                            {
                                loading ? <div className='overflow-x-hidden overflow-y-auto rounded-xl'>
                                    {
                                        [1, 2, 3, 4, 5].map(item => {
                                            return (
                                                <div key={item} className='flex relative justify-between mt-2 px-3 items-center bg-gray-300 dark:bg-gray-400 animate-pulse rounded-xl w-full h-16'>
                                                    <div className='flex items-center bg-gray-400'>
                                                        <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-full h-12 w-12 mr-2'></div>
                                                        <div>
                                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-4 w-36'></div>
                                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-3 w-26 mt-2'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> :
                                    <>
                                        <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' onClick={async () => { selectedChat() }}>
                                            <div className='flex items-center'>
                                                <div className='relative'>
                                                    <img src={chatList?.trainer?.profileImage} alt='pic of opponent' className="rounded-full object-cover h-12 w-12" />
                                                </div>
                                                <div className='ms-2'>{chatList?.trainer?.firstName} {chatList?.trainer?.SecondName}
                                                    <div className='ms-1 w-4 h-4.5' style={{ fontSize: "0.73em" }}>last</div>
                                                </div>
                                            </div>
                                            <div className='absolute top-2 right-4'>
                                                date
                                            </div>
                                        </div>
                                        
                                        <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' onClick={async () => { selectedChat() }}>
                                            <div className='flex items-center'>
                                                <div className='relative'>
                                                    <img src={chatList?.admin?.profileImage} alt='pic of opponent' className="rounded-full w-12" />
                                                </div>
                                                <div className='ms-2'>{chatList?.admin?.name}
                                                    <div className='ms-1 w-4 h-4.5' style={{ fontSize: "0.73em" }}>last</div>
                                                </div>
                                            </div>
                                            <div className='absolute top-2 right-4'>
                                                date
                                            </div>
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                    {/* <Conversation socket={socket} goback={[showchat, setShowChat]} selected={chatSelected} refreshList={[changeList, setChangeList]} /> */}
                </div>

                {/* //mobile */}

                {/* <div className="grid md:hidden grid-cols-12 h-screen">
                    {showchat.list && <div className="col-span-12 mt-16 border-2">
                        <div className='fixed bottom-0 w-full z-10 px-2'>
                            <input type='text' placeholder='Search name...' className='p-2 w-full outline-none border-2 rounded-lg border-gray-400' onChange={async (e) => { const regex = new RegExp(e.target.value, "i"); setChatList(await chatListSearch(id, regex)) }} />
                        </div>
                        <div className='p-2 overflow-x-hidden overflow-y-scroll hideScrollBar mb-10'>
                            {
                                loading ? <div className='overflow-x-hidden overflow-y-scroll hideScrollBar rounded-xl'>
                                    {
                                        [1, 2, 3, 4, 5].map(item => {
                                            return (
                                                <div key={item} className='flex relative justify-between mt-2 px-3 items-center bg-gray-300 dark:bg-gray-400 animate-pulse rounded-xl w-full h-16'>
                                                    <div className='flex items-center bg-gray-400'>
                                                        <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-full h-12 w-12 mr-2'></div>
                                                        <div>
                                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-4 w-36'></div>
                                                            <div className=' bg-gray-500 dark:bg-gray-500 animate-pulse rounded-lg h-3 w-26 mt-2'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                    : <>
                                        <div className='flex justify-between items-center border-2 mb-1 cursor-pointer rounded-lg p-2 relative' onClick={selectedChat()}>
                                            <div className='flex items-center'>
                                                <div className='relative'>
                                                    <img src='' alt='pic of opponent' className="rounded-full w-12" />
                                                </div>
                                                <div className='ms-2'>
                                                    <div className='flex items-center'>Deleted Account</div>
                                                </div>
                                                <div className='ms-2'>
                                                    <div className='flex items-center'><img className='ms-1 w-4 h-4.5' src='' alt='profile' /></div>
                                                    <div style={{ fontSize: "0.73em" }}>lastmessage</div>
                                                </div>
                                            </div>
                                            <div className='absolute top-2 right-4'>
                                                date
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>}
                    {showchat.conv && <Conversation socket={socket} goback={[showchat, setShowChat]} selected={chatSelected} refreshList={[changeList, setChangeList]} />}
                </div> */}
            </div>
        </>
    )
}

export default Chat
