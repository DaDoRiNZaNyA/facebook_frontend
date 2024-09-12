type IsUserFollowed = {
    isFollowed: boolean
}

type Follower = {
    id: number
    followerId: number
    followingId: number
    follower: Profile
}

type ChatGroup = {
    id: number
    name: string | null
    createAt: string
    participants: {
        id: number
        userId: number
        isAdmin: boolean
        lastReadAt: string | null
    }[]
}
