import { httpClient } from '@/shared/api/axios'
import { CHAT_URLS, FOLLOW_URLS, USERS_URLS } from '@/shared/api/urls'

export const getUsers = async (params: { page?: number; size?: number; search?: string }) => {
    return await httpClient.get<never, PaginationResponse<Profile & { isFollowed: boolean }>>(USERS_URLS.USERS, {
        params,
    })
}

export const getUser = async (params: { id: number }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + USERS_URLS.USERS + `/${params.id}`, {
        cache: 'no-cache',
        next: {
            revalidate: 0,
        },
    })
    const user: Profile = await res.json()
    return user
}

export const getIsUserFollowed = async (params: { id: number }) => {
    return await httpClient.get<never, IsUserFollowed>(FOLLOW_URLS.isUserFollowed + `/${params.id}`)
}

export const getFollowers = async (params: { page?: number; size?: number }) => {
    return await httpClient.get<never, PaginationResponse<Follower & { isFollowed: boolean }>>(FOLLOW_URLS.FOLLOWERS, {
        params,
    })
}

export const createChatGroup = async (data: { name?: string; userIds: number[] }) => {
    return await httpClient.post<never, ChatGroup>(CHAT_URLS.CREATE_GROUP, data)
}
