'use client'

import { useFollow, useGetFollowing, useUnfollow } from '@/entities/Auth/api/hooks'
import { useGetUsers } from '@/entities/Users/api/hooks'
import { MessagesIcon, SearchIcon } from '@/shared/components/icons'
import { UserCard } from '@/shared/components/UserCard'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
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

export const FollowingList = ({ messages, locale }: Props) => {
    const { data: following, isLoading: followingIsLoading } = useGetFollowing()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const { mutate: follow, isPending: followIsPending } = useFollow()
    const { mutate: unfollow, isPending: unfollowIsPending } = useUnfollow()
    const { data: users, isLoading: usersIsLoading } = useGetUsers({
        page,
        size: 10,
        search,
        enabled: search.length > 0,
    })
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-[20px] py-[20px]">
            <div className="xl:w-1/2 w-full flex flex-row justify-between gap-[20px] mt-[20px]">
                <Input
                    startContent={<SearchIcon size={22} />}
                    value={search}
                    onValueChange={setSearch}
                    className="w-fit"
                    placeholder={messages.search + '...'}
                />
            </div>
            {followingIsLoading || usersIsLoading ? <Spinner /> : null}
            {search?.length === 0 ? (
                following?.map((following) => (
                    <UserCard
                        key={following.id}
                        user={following.following}
                        button={
                            <div className="absolute right-[20px] top-1/4 z-10 flex flex-row gap-x-[10px] items-center">
                                <Button radius="full" size="sm" startContent={<MessagesIcon size={22} />}></Button>
                                <Button
                                    radius="full"
                                    size="sm"
                                    isLoading={unfollowIsPending}
                                    onClick={() => unfollow({ userId: following.following.id, locale })}
                                >
                                    {messages.unfollow}
                                </Button>
                            </div>
                        }
                    />
                ))
            ) : (
                <div className="flex flex-col w-full items-center gap-[20px]">
                    {users?.data?.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            button={
                                <div className="absolute right-[20px] top-1/4 z-10 flex flex-row gap-x-[10px] items-center">
                                    <Button radius="full" size="sm" startContent={<MessagesIcon size={22} />}></Button>
                                    <Button
                                        radius="full"
                                        size="sm"
                                        color={user.isFollowed ? 'default' : 'secondary'}
                                        onClick={() =>
                                            user.isFollowed
                                                ? unfollow({ userId: user.id, locale })
                                                : follow({ userId: user.id, locale })
                                        }
                                        isLoading={followIsPending || unfollowIsPending}
                                    >
                                        {user.isFollowed ? messages.unfollow : messages.follow}
                                    </Button>
                                </div>
                            }
                        />
                    ))}
                    {users && users?.pagination?.totalPages > 1 && (
                        <Pagination total={users.pagination.totalPages} page={page} onChange={setPage} />
                    )}
                </div>
            )}
        </div>
    )
}
