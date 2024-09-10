type CreatePost = {
    text: string
    locale: string
    media?: string
}

type Post = {
    id: number
    userId: number
    text: string
    media?: string
    totalLikes: number
    totalDislikes: number
    totalComments: number
    userReaction: 'like' | 'dislike' | null
    createdAt: string
    updatedAt: string
}

type PaginationResponse<T> = {
    data: T[]
    pagination: {
        total: number
        count: number
        currentPage: number
        totalPages: number
    }
}

type PostWithUser = Post & {
    user: {
        id: number
        name: string
        lastName: string
    }
}

type UpdatePost = CreatePost & { id: number }

type PostComment = {
    id: number
    userId: number
    postId: number
    text: string
    parentId: number | null
    replies: PostComment[]
    createdAt: string
    updatedAt: string
    user: Profile
}
