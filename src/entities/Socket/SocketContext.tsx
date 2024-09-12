'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface SocketContextType {
    socket: Socket | null
}

export type Chat = {
    id: number
    participants: { user: Profile }[]
    messages: {
        createdAt: string
        content: string
        sender: {
            id: number
            name: string
            lastName: string
        }
        isRead: boolean
    }[]
    name?: string
}

export type Message = {
    chatGroupId: number
    content: string
    id: number
    isRead: boolean
    createdAt: string
    senderId: number
    sender: Profile
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('access')
        setToken(storedToken)
    }, [])

    useEffect(() => {
        const newSocket = io('http://localhost:4000', {
            reconnection: true,
            timeout: 10000,
        })

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server')
        })

        if (token) {
            newSocket.emit('authenticate', { token })
        }

        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [token])

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
