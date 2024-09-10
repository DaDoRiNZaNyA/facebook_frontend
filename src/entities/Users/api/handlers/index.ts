import { httpClient } from '@/shared/api/axios'
import { USERS_URLS } from '@/shared/api/urls'

export const getUsers = async (params: { page?: number; size?: number; search?: string }) => {
    return await httpClient.get<never, PaginationResponse<Profile & { isFollowed: boolean }>>(USERS_URLS.USERS, {
        params,
    })
}

export const getUser = async (params: { id: number }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + USERS_URLS.USERS + `/${params.id}`, {
        cache: 'force-cache',
        next: {
            revalidate: 300,
        },
    })
    const user: Profile = await res.json()
    return user
}
