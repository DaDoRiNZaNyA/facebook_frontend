import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../handlers'

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
