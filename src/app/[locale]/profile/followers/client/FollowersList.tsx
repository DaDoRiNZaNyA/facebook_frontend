'use client'

import { useFollow, useProfile, useUnfollow } from '@/entities/Auth/api/hooks'
import { useCreateChatGroup, useGetFollowers } from '@/entities/Users/api/hooks'
import { MessagesIcon } from '@/shared/components/icons'
import { UserCard } from '@/shared/components/UserCard'
import { Button } from '@nextui-org/button'
import { Pagination } from '@nextui-org/pagination'
import { Spinner } from '@nextui-org/spinner'
import { useState } from 'react'

type Props = {
    messages: {
        search: string
        follow: string
        unfollow: string
    }
    locale: string
}

export const FollowersList = ({ messages, locale }: Props) => {
    const [page, setPage] = useState(1)
    const { mutate: follow, isPending: followIsPending } = useFollow()
    const { mutate: unfollow, isPending: unfollowIsPending } = useUnfollow()
    const { data: profile } = useProfile()
    const { mutate: createChatGroup, isPending: createChatGroupIsPending } = useCreateChatGroup()
    const { data: followers, isLoading: followersIsLoading } = useGetFollowers({ page, size: 10 })
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-[20px] py-[20px]">
            {followersIsLoading ? <Spinner /> : null}
            {followers?.data?.map((following) => (
                <UserCard
                    key={following.id}
                    user={following.follower}
                    button={
                        <div className="absolute right-[20px] top-1/4 z-10 flex flex-row gap-x-[10px] items-center">
                            <Button
                                radius="full"
                                size="sm"
                                startContent={<MessagesIcon size={22} />}
                                onClick={() =>
                                    profile && createChatGroup({ userIds: [following.followerId, profile?.id] })
                                }
                                isLoading={createChatGroupIsPending}
                            ></Button>
                            <Button
                                radius="full"
                                size="sm"
                                color={following.isFollowed ? 'default' : 'secondary'}
                                onClick={() =>
                                    following.isFollowed
                                        ? unfollow({ userId: following.followerId, locale })
                                        : follow({ userId: following.followerId, locale })
                                }
                                isLoading={followIsPending || unfollowIsPending}
                            >
                                {following.isFollowed ? messages.unfollow : messages.follow}
                            </Button>
                        </div>
                    }
                />
            ))}
            {followers && followers?.pagination?.totalPages > 1 && (
                <Pagination total={followers.pagination.totalPages} page={page} onChange={setPage} />
            )}
        </div>
    )
}
