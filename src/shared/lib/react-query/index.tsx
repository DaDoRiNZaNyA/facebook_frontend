import { useState } from 'react'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TProps } from './types'
import '@tanstack/react-query'
import { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError
    }
}

export const QueryProvider = ({ children, dehydratedState }: TProps) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    )
}
