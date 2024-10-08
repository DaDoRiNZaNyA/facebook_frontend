import { useRouter } from '@/navigation'
import { follow, getFollowing, getProfile, login, register, unfollow, updateProfile } from '../handlers'
import { toastService } from '@/shared/lib/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '@/shared/api/axios'
import { getIntl } from '@/shared/lib/intl'

export const useLogin = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'incorrectLoginOrPassword' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            await queryClient.invalidateQueries({ queryKey: ['profile'] })
            toastService.success(intl.formatMessage({ id: 'successfullyLogin' }))
            router.push('/')
        },
    })

    return { isPending, mutate }
}

export const useRegister = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: register,
        mutationKey: ['register'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedRegistration' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
            localStorage.setItem('access', data.accessToken)
            localStorage.setItem('refresh', data.refreshToken)
            await queryClient.invalidateQueries({ queryKey: ['profile'] })
            toastService.success(intl.formatMessage({ id: 'successRegistration' }))
            router.push('/')
        },
    })

    return { isPending, mutate }
}

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(),
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: updateProfile,
        mutationKey: ['updateProfile'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedUpdateProfile' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['profile'] })
            toastService.success(intl.formatMessage({ id: 'successUpdateProfile' }))
        },
    })

    return { isPending, mutate }
}

export const useGetFollowing = () => {
    return useQuery({
        queryKey: ['following'],
        queryFn: () => getFollowing(),
    })
}

export const useFollow = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: follow,
        mutationKey: ['follow'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedFollow' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['following'] })
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            await queryClient.invalidateQueries({ queryKey: ['followers'] })
            await queryClient.invalidateQueries({ queryKey: ['isUserFollowed'] })
            toastService.success(intl.formatMessage({ id: 'sucessFollow' }))
        },
    })

    return { isPending, mutate }
}

export const useUnfollow = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: unfollow,
        mutationKey: ['unfollow'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedUnfollow' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['following'] })
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            await queryClient.invalidateQueries({ queryKey: ['followers'] })
            await queryClient.invalidateQueries({ queryKey: ['isUserFollowed'] })
            toastService.success(intl.formatMessage({ id: 'sucessUnfollow' }))
        },
    })

    return { isPending, mutate }
}
