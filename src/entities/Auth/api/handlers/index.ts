import { httpClient } from '@/shared/api/axios'
import { AUTH_URLS } from '@/shared/api/urls'

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
    const { locale, ...rest } = data
    return await httpClient.put<never, Profile>(AUTH_URLS.UPDATE_PROFILE, rest)
}
