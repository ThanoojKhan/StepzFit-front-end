
import { useSelector } from "react-redux"
import { errorAlert } from "../Functions/Toasts"
import axiosInstance from "./axios"

const api_call = axiosInstance

export const createChat = async (client, freelancer, post_id) => {
    const { token } = useSelector((state) => state.User)
    try {
        const { data } = await api_call.post(`/chats`, { client: client, freelancer: freelancer, post_id: post_id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (data.status) {
            return true
        } else {
            if (data.error) {
                errorAlert(data.error)
                return false
            } else {
                errorAlert(data.message)
                return false
            }
        }
    } catch (err) {
        errorAlert(err)
    }
}

export const getUserChatList = async (user_id) => {
    const { token } = useSelector((state) => state.User)
    console.log(token);
    try {
        const { data } = await api_call.get(`user/getUserChatList/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (data.error) {
            errorAlert(data.error)
        } else {
            return data.list
        }
    } catch (err) {
        errorAlert(err)
    }
}

export const sendMessage = async (messageData) => {
    const { token } = useSelector((state) => state.User)
    try {
        const { data } = await api_call.post(`/chat/send-message`, { messageData }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data.message
    } catch (err) {
        errorAlert(err)
    }
}

export const getMessagesByChat = async (chat_id) => {
    const { token } = useSelector((state) => state.User)
    try {
        const { data } = await api_call.get(`/chat/get-all-messages/${chat_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (data.error) {
            errorAlert(data.error)
        } else {
            return data.messages
        }
    } catch (err) {
        errorAlert(err)
    }
}

export const setUnreadMessage = async (receiver, chat, setZero = false) => {
    const { token } = useSelector((state) => state.User)
    try {
        const { data } = await api_call.post(`/chat/unreadMessage`, { chat, receiver, setZero }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data.unread
    } catch (err) {
        errorAlert(err)
    }
}

export const chatListSearch = async (id, regex) => {
    const { token } = useSelector((state) => state.User)
    try {
        const { data } = await api_call.get(`/getChatList/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const lists = data.list.map(obj => {
            return {
                ...obj, users: obj.users.filter(item => item._id !== id)
            }
        })
        const result = lists.filter((item) => regex.test(item?.users[0]?.profile?.full_name))
        return result
    } catch (err) {
        errorAlert(err)
    }
}