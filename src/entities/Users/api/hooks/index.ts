import { useQuery } from '@tanstack/react-query'
import { getFollowers, getIsUserFollowed, getUsers } from '../handlers'

export const useGetUsers = ({
    enabled,
    ...params
}: {
    page?: number
    size?: number
    search?: string
    enabled?: boolean
}) => {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
        enabled: enabled,
    })
}

export const useGetIsUserFollowed = (params: { id: number }) => {
    return useQuery({
        queryKey: ['isUserFollowed', params],
        queryFn: () => getIsUserFollowed(params),
        refetchOnMount: true,
    })
}

export const useGetFollowers = (params: { page?: number; size?: number }) => {
    return useQuery({
        queryKey: ['followers', params],
        queryFn: () => getFollowers(params),
    })
}
