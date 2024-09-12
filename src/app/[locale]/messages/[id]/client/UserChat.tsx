'use client'

import { useProfile } from '@/entities/Auth/api/hooks'
import { Message, useSocket } from '@/entities/Socket/SocketContext'
import { SendIcon } from '@/shared/components/icons'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { User } from '@nextui-org/user'
import { useRouter } from '@/navigation'

type Props = {
    locale: string
    id: number
}

export const UserChat = ({ locale, id }: Props) => {
    const { socket } = useSocket()
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const { data: profile } = useProfile()
    const { push } = useRouter()

    const chatEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    useEffect(() => {
        if (!socket || !profile) return
        const token = localStorage.getItem('access')

        const handleGetMessages = (messages: Message[]) => {
            setChatMessages(messages)
            if (!messages[messages.length - 1]?.isRead && messages[messages.length - 1]?.senderId !== profile?.id) {
                socket.emit('markAllMessagesAsRead', { token, groupId: id })
            }
        }

        const saveMessage = (message: Message) => {
            if (message.chatGroupId === id) setChatMessages((prev) => [...prev, message])
        }

        if (token) {
            socket.emit('authenticate', { token })
            socket.emit('getMessages', { token, groupId: id })
        }

        socket.on('messages', handleGetMessages)

        socket.on('receiveMessage', saveMessage)

        return () => {
            socket.off('messages', handleGetMessages)
            socket.off('receiveMessage', saveMessage)
        }
    }, [socket, id, profile?.id])

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const token = localStorage.getItem('access')

        if (token) {
            socket?.emit('sendMessage', { groupId: id, message: newMessage, token })
            setNewMessage('')
        }
    }

    return (
        <div className="xl:w-1/2 w-full flex flex-col h-[calc(100vh-180px)] mt-[20px]">
            <div className="flex flex-col flex-grow overflow-y-auto p-4 border border-gray-300 rounded-lg gap-y-[20px]">
                {chatMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 text-sm rounded-lg max-w-[90%] justify-end flex items-start gap-x-[20px] w-fit ${
                            message.senderId === profile?.id
                                ? 'bg-default-400 self-end flex-row-reverse'
                                : 'bg-default-400 self-start flex-row'
                        }`}
                    >
                        <div
                            className={
                                'flex flex-col gap-y-[5px] min-w-[130px] ' +
                                (message.senderId === profile?.id ? ' items-end' : ' items-start')
                            }
                        >
                            <User
                                as="button"
                                name={message.sender.name + ' ' + message.sender?.lastName}
                                avatarProps={{
                                    size: 'sm',
                                    src: message.sender?.avatar
                                        ? process.env.NEXT_PUBLIC_BACKEND_URL + message.sender.avatar
                                        : undefined,
                                }}
                                onClick={() => push(`/users/${message.sender.id}`)}
                            />
                            <span className="text-xs">
                                {dayjs().isSame(dayjs(message.createdAt), 'day')
                                    ? dayjs(message.createdAt).format('HH:mm')
                                    : dayjs(message.createdAt).format('DD.MM.YYYY HH:mm')}
                            </span>
                        </div>
                        <p className="pt-1">{message.content}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="mt-[20px]">
                <Input
                    placeholder="Write a message..."
                    size="lg"
                    classNames={{ inputWrapper: '!pr-0' }}
                    value={newMessage}
                    onValueChange={(e) => setNewMessage(e)}
                    endContent={
                        <Button
                            color="secondary"
                            isIconOnly
                            size="lg"
                            endContent={<SendIcon size={22} />}
                            onClick={handleSendMessage}
                        />
                    }
                />
            </div>
        </div>
    )
}
