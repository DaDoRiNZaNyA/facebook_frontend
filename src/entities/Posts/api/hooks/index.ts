import { getIntl } from '@/shared/lib/intl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../handlers'
import { toastService } from '@/shared/lib/toast'

export const useCreatePost = () => {
    const queryClient = useQueryClient()
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
        },
    })

    return { isPending, mutate }
}
