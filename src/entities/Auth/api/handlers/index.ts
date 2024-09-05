import { httpClient } from '@/shared/api/axios'
import { AUTH_URLS } from '@/shared/api/urls'

export const login = async (data: LoginData) => {
    return await httpClient.post<never, LoginResponse>(AUTH_URLS.LOGIN, data)
}
