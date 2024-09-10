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

export const getPostServer = async (params: { id: number }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + POSTS_URLS.POST + `/${params.id}`, {
        cache: 'no-cache',
        next: {
            revalidate: 0,
        },
    })
    const post: PostWithUser = await res.json()
    return post
}

export const getPost = async (params: { id: number; locale: string }) => {
    return await httpClient.get<never, PostWithUser>(POSTS_URLS.POST + `/${params.id}`)
}

export const updatePost = async (data: UpdatePost) => {
    const { locale, id, ...rest } = data
    return await httpClient.put<never, Post>(POSTS_URLS.POSTS + `/${id}`, rest)
}

export const getPosts = async (params: { page?: number; size?: number; search?: string; userId?: number }) => {
    return await httpClient.get<never, PaginationResponse<PostWithUser>>(POSTS_URLS.POSTS, { params })
}

export const getPostsServer = async (params: { page?: number; size?: number; search?: string; userId?: number }) => {
    const queryParams = new URLSearchParams({
        page: params.page?.toString() || '1',
        size: params.size?.toString() || '10',
        search: params.search || '',
        userId: params.userId?.toString() || '',
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${POSTS_URLS.POSTS}?${queryParams}`, {
        cache: 'no-cache',
        next: {
            revalidate: 0,
        },
    })
    const posts: PaginationResponse<PostWithUser> = await res.json()
    return posts
}

export const likePost = async (data: { postId: number; isLike: boolean }) => {
    return await httpClient.post<never, { message: string }>(POSTS_URLS.LIKE, data)
}

export const getPostComments = async (params: { id: number }) => {
    return await httpClient.get<never, PostComment[]>(POSTS_URLS.COMMENTS + `/${params.id}`)
}

export const getPostCommentsServer = async (params: { id: number }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + POSTS_URLS.COMMENTS + `/${params.id}`, {
        cache: 'no-cache',
        next: {
            revalidate: 0,
        },
    })
    const comments: PostComment[] = await res.json()
    return comments
}

export const createComment = async ({
    locale,
    ...data
}: {
    postId: number
    text: string
    parentId?: number
    locale: string
}) => {
    return await httpClient.post<never, PostComment>(POSTS_URLS.COMMENTS, data)
}

export const updateComment = async ({ locale, id, ...data }: { id: number; text: string; locale: string }) => {
    return await httpClient.put<never, PostComment>(POSTS_URLS.COMMENTS + `/${id}`, data)
}

export const deleteComment = async ({ locale, id }: { id: number; locale: string }) => {
    return await httpClient.delete<never, PostComment>(POSTS_URLS.COMMENTS + `/${id}`)
}
