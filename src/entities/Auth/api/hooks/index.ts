import { useRouter } from '@/navigation'
import { login } from '../handlers'
import { toastService } from '@/shared/lib/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '@/shared/api/axios'

export const useLogin = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: login,
        mutationKey: ['personalInfo'],
        onError: () => {
            toastService.error('Неверный логин или пароль')
        },
        onSuccess: async (data, variables) => {
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            toastService.success('Вы успешно авторизированы')
            router.push('/')
        },
    })

    return { isPending, mutate }
}
