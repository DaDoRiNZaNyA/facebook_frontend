'use client'

import { Avatar } from '@nextui-org/avatar'
import { Card, CardHeader } from '@nextui-org/card'
import { Link } from '@/navigation'
import { ReactNode } from 'react'

type Props = {
    user: Profile
    button?: ReactNode
}

export const UserCard = ({ user, button }: Props) => {
    return (
        <div className="relative xl:w-1/2 w-full">
            <Link className="w-full" href={`/users/${user.id}`}>
                <Card>
                    <CardHeader className="justify-between relative">
                        <div className="flex flex-row">
                            <Avatar
                                isBordered
                                radius="full"
                                size="md"
                                src={user.avatar ? process.env.NEXT_PUBLIC_BACKEND_URL + user.avatar : undefined}
                            />
                            <div className="flex flex-col gap-1 items-start justify-center ml-[20px]">
                                <h4 className="text-small font-semibold leading-none text-default-600">
                                    {user.name + ' ' + user.lastName}
                                </h4>
                                {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </Link>
            {button}
        </div>
    )
}
