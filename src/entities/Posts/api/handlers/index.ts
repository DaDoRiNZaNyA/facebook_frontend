import { httpClient } from '@/shared/api/axios'
import { POSTS_URLS } from '@/shared/api/urls'

export const createPost = async (data: CreatePost) => {
    const { locale, ...rest } = data
    return await httpClient.post<never, Post>(POSTS_URLS.POSTS, rest)
}

export const getMyPosts = async (params: { page?: number; size?: number; search?: string }) => {
    return await httpClient.get<never, PaginationResponse<PostWithUser>>(POSTS_URLS.MY_POSTS, { params })
}
