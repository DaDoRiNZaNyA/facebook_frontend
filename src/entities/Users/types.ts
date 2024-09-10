type IsUserFollowed = {
    isFollowed: boolean
}

type Follower = {
    id: number
    followerId: number
    followingId: number
    follower: Profile
}
