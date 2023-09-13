import React, { useEffect, useRef } from 'react';

function ChatConversation({ messages, userId, profile1, profile2, onSendMessage }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="flex flex-col flex-auto rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">

                        {messages.map((message) => (
                            <div key={message._id} className="grid grid-cols-12 gap-y-2">
                                {(message?.sender?._id || message?.sender) == userId ?
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
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>{message.message}</div>
                                                <small>{new Date(message?.createdAt).toLocaleString('en-US', {
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
                <div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => onSendMessage(e.target.value)}
                                    type="text"
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    placeholder="Type your message..."
                                />
                            </div>
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={onSendMessage}
                                type="button"
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            >
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatConversation;
