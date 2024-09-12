'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketProvider } from '@/entities/Socket/SocketContext'

export interface ProvidersProps {
    children: React.ReactNode
    themeProps?: ThemeProviderProps
}

const queryClient = new QueryClient()

export function Providers({ children, themeProps }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <NextUIProvider>
                    <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
                </NextUIProvider>
            </SocketProvider>
        </QueryClientProvider>
    )
}
