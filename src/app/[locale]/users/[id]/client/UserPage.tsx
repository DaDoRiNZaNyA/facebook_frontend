'use client'

import { useFollow, useUnfollow } from '@/entities/Auth/api/hooks'
import { useGetPosts } from '@/entities/Posts/api/hooks'
import { useGetIsUserFollowed } from '@/entities/Users/api/hooks'
import { usePathname, useRouter } from '@/navigation'
import { PostCard } from '@/shared/components/PostCard'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Pagination } from '@nextui-org/pagination'

export const UserPage = ({
    user,
    posts,
    messages,
    locale,
}: {
    user: Profile
    posts: PaginationResponse<PostWithUser>
    messages: {
        search: string
        follow: string
        unfollow: string
    }
    locale: string
}) => {
    const { push } = useRouter()
    const pathname = usePathname()
    const { data: isUserFollowed } = useGetIsUserFollowed({ id: user.id })
    const { mutate: follow, isPending: followIsPending } = useFollow()
    const { mutate: unfollow, isPending: unfollowIsPending } = useUnfollow()
    const { data: postsList } = useGetPosts({
        page: posts.pagination.currentPage,
        size: 10,
        userId: user.id,
        initialData: posts,
    })

    return (
        <>
            <div className="xl:w-1/2 w-full">
                <div className="flex flex-row justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {user.name + ' ' + user.lastName}
                            </h4>
                            {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                        </div>
                    </div>
                    <Button
                        radius="full"
                        color={isUserFollowed?.isFollowed ? 'default' : 'secondary'}
                        onClick={() =>
                            isUserFollowed?.isFollowed
                                ? unfollow({ userId: user.id, locale })
                                : follow({ userId: user.id, locale })
                        }
                        isLoading={followIsPending || unfollowIsPending}
                    >
                        {isUserFollowed?.isFollowed ? messages.unfollow : messages.follow}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-[20px] mt-[20px] w-full items-center">
                {postsList?.data.map((post) => (
                    <PostCard key={post.id} props={post} />
                ))}
                {postsList && postsList?.pagination.totalPages > 1 && (
                    <Pagination
                        total={posts?.pagination.totalPages}
                        page={posts?.pagination.currentPage}
                        onChange={(value) => push(`${pathname}?page=${value}`)}
                    />
                )}
            </div>
        </>
    )
}
