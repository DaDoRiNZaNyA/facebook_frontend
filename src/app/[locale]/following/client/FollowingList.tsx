'use client'

import { useGetFollowing } from '@/entities/Auth/api/hooks'
import { UserCard } from '@/shared/components/UserCard'

type Props = {
    messages: {}
    locale: string
}

export const FollowingList = ({ messages, locale }: Props) => {
    const { data: following } = useGetFollowing()
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-[20px] py-[20px]">
            {following?.map((following) => (
                <UserCard key={following.id} />
            ))}
        </div>
    )
}
