'use client'

import { Chat, useSocket } from '@/entities/Socket/SocketContext'
import { ChatCard } from '@/shared/components/ChatCard'
import { useEffect, useState } from 'react'

type Props = {
    messages: {
        email: string
    }
    locale: string
}

export const Chats = ({ messages, locale }: Props) => {
    const { socket } = useSocket()
    const [chats, setChats] = useState<Chat[]>([])

    useEffect(() => {
        if (!socket) return
        const token = localStorage.getItem('access')

        const handleUserChats = (chats: Chat[]) => {
            setChats(chats)
        }

        const getMessages = () => socket.emit('getUserChats', { token })

        if (!token) return

        if (token) {
            socket.emit('authenticate', { token })
        }

        socket.on('userChats', handleUserChats)

        getMessages()

        socket.on('receiveMessage', getMessages)

        return () => {
            socket.off('userChats', handleUserChats)
            socket.off('receiveMessage', getMessages)
        }
    }, [socket])

    return (
        <div className="w-full flex flex-col h-full mt-[20px] gap-y-[20px]">
            {chats?.map((chat) => (
                <div key={chat.id} className="flex justify-center w-full">
                    <ChatCard chat={chat} />
                </div>
            ))}
        </div>
    )
}
