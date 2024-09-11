import { httpClient } from '@/shared/api/axios'
import { AUTH_URLS, FOLLOW_URLS, USERS_URLS } from '@/shared/api/urls'

export const login = async (data: LoginData) => {
    const { locale, ...rest } = data
    return await httpClient.post<never, LoginResponse>(AUTH_URLS.LOGIN, rest)
}

export const register = async (data: RegisterData) => {
    const { locale, ...rest } = data
    return await httpClient.post<never, RegisterResponse>(AUTH_URLS.REGISTER, rest)
}

export const getProfile = async () => {
    return await httpClient.get<never, Profile>(AUTH_URLS.GET_PROFILE)
}

export const updateProfile = async (data: UpdateProfilenData) => {
    const { locale, avatar, ...rest } = data
    if (avatar) {
        await uploadAvatar(avatar)
    }
    return await httpClient.put<never, Profile>(AUTH_URLS.UPDATE_PROFILE, rest)
}

export const getFollowing = async () => {
    return await httpClient.get<never, Following[]>(FOLLOW_URLS.FOLLOWING)
}

export const follow = async ({ locale, userId }: { userId: number; locale: string }) => {
    return await httpClient.post<never, any>(FOLLOW_URLS.FOLLOW + '/' + userId)
}

export const unfollow = async ({ locale, userId }: { userId: number; locale: string }) => {
    return await httpClient.delete<never, any>(FOLLOW_URLS.FOLLOW + '/' + userId)
}

export const uploadAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await httpClient.post<never, Profile>(USERS_URLS.AVATAR, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
            return formData
        },
    })
}
