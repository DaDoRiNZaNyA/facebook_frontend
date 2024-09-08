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
    createdAt: string
    updatedAt: string
}
