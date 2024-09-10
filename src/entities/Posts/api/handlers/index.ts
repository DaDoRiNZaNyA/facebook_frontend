import { httpClient } from '@/shared/api/axios'
import { POSTS_URLS } from '@/shared/api/urls'

export const createPost = async (data: CreatePost) => {
    const { locale, ...rest } = data
    return await httpClient.post<never, Post>(POSTS_URLS.POSTS, rest)
}

export const getMyPosts = async (params: { page?: number; size?: number; search?: string }) => {
    return await httpClient.get<never, PaginationResponse<PostWithUser>>(POSTS_URLS.MY_POSTS, { params })
}

export const deletePost = async (params: { id: number; locale: string }) => {
    return await httpClient.delete<never, any>(POSTS_URLS.POSTS + `/${params.id}`)
}

export const getPost = async (params: { id: number }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + POSTS_URLS.POST + `/${params.id}`, {
        cache: 'force-cache',
        next: {
            revalidate: 300,
        },
    })
    const post: PostWithUser = await res.json()
    return post
}

export const updatePost = async (data: UpdatePost) => {
    const { locale, id, ...rest } = data
    return await httpClient.put<never, Post>(POSTS_URLS.POSTS + `/${id}`, rest)
}

export const getPosts = async (params: { page?: number; size?: number; search?: string; userId?: number }) => {
    return await httpClient.get<never, PaginationResponse<PostWithUser>>(POSTS_URLS.MY_POSTS, { params })
}

export const getPostsServer = async (params: { page?: number; size?: number; search?: string; userId?: number }) => {
    const queryParams = new URLSearchParams({
        page: params.page?.toString() || '1',
        size: params.size?.toString() || '10',
        search: params.search || '',
        userId: params.userId?.toString() || '',
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${POSTS_URLS.POSTS}?${queryParams}`, {
        cache: 'force-cache',
        next: {
            revalidate: 300,
        },
    })
    const posts: PaginationResponse<PostWithUser> = await res.json()
    return posts
}
