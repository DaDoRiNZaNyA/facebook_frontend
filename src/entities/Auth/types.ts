type LoginData = {
    email: string
    password: string
    locale: string
}

type LoginResponse = {
    accessToken: string
    refreshToken: string
}

type RegisterData = {
    email: string
    password: string
    name: string
    lastName: string
    locale: string
}

type RegisterResponse = {
    accessToken: string
    refreshToken: string
}

type Profile = {
    id: number
    email: string
    name: string
    lastName: string
}

type UpdateProfilenData = {
    email: string
    name: string
    lastName?: string
    locale: string
}

type Following = {
    id: number
    followerId: number
    followingId: number
    createdAt: string
    following: Profile
}
