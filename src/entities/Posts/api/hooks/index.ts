import { getIntl } from '@/shared/lib/intl'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, getMyPosts, updatePost } from '../handlers'
import { toastService } from '@/shared/lib/toast'
import { useRouter } from '@/navigation'

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { isPending, mutate } = useMutation({
        mutationFn: createPost,
        mutationKey: ['createPost'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedCreatePost' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['myPosts'] })
            toastService.success(intl.formatMessage({ id: 'successCreatePost' }))
            router.push('/profile/posts')
        },
    })

    return { isPending, mutate }
}

export const useGetMyPosts = (params: { page?: number; size?: number; search?: string }) => {
    return useQuery({
        queryKey: ['myPosts', params],
        queryFn: () => getMyPosts(params),
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate } = useMutation({
        mutationFn: deletePost,
        mutationKey: ['deletePost'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedDeletePost' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['myPosts'] })
            toastService.success(intl.formatMessage({ id: 'successDeletePost' }))
        },
    })

    return { isPending, mutate }
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { isPending, mutate } = useMutation({
        mutationFn: updatePost,
        mutationKey: ['updatePost'],
        onError: async (_, variables) => {
            const intl = await getIntl(variables.locale)
            toastService.error(intl.formatMessage({ id: 'failedUpdatePost' }))
        },
        onSuccess: async (data, variables) => {
            const intl = await getIntl(variables.locale)
            await queryClient.invalidateQueries({ queryKey: ['myPosts'] })
            toastService.success(intl.formatMessage({ id: 'successUpdatePost' }))
            router.push('/profile/posts')
        },
    })

    return { isPending, mutate }
}
