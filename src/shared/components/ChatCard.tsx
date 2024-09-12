'use client'

import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Link } from '@/navigation'
import { Chat } from '@/entities/Socket/SocketContext'
import { useProfile } from '@/entities/Auth/api/hooks'
import dayjs from 'dayjs'

type Props = {
    chat: Chat
}

export const ChatCard = ({ chat }: Props) => {
    const { data: profile } = useProfile()
    const user = chat.participants.find((p) => p.user.id !== profile?.id)?.user as Profile
    const isRead = chat.messages?.[0]?.isRead || chat.messages?.[0]?.sender.id === profile?.id

    return (
        <div className="relative xl:w-1/2 w-full">
            <Link className="w-full" href={`/messages/${chat.id}`}>
                <Card className={isRead ? '' : 'bg-default-400'}>
                    <CardHeader className="justify-between relative">
                        <div className="flex flex-row">
                            <Avatar
                                isBordered
                                radius="full"
                                size="md"
                                src={
                                    user.avatar && !chat.name
                                        ? process.env.NEXT_PUBLIC_BACKEND_URL + user.avatar
                                        : undefined
                                }
                            />
                            <div className="flex flex-col gap-1 items-start justify-center ml-[20px]">
                                <h4 className="text-small font-semibold leading-none text-default-600">
                                    {chat.name ? chat.name : user.name + ' ' + user.lastName}
                                </h4>
                                {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                            </div>
                        </div>
                        <p className="text-sm tracking-tight text-default-600">
                            {chat.messages?.[0]?.createdAt
                                ? dayjs().isSame(dayjs(chat.messages?.[0]?.createdAt), 'day')
                                    ? dayjs(chat.messages?.[0]?.createdAt).format('HH:mm')
                                    : dayjs(chat.messages?.[0]?.createdAt).format('DD.MM.YYYY HH:mm')
                                : ''}
                        </p>
                    </CardHeader>
                    <CardBody className="flex flex-row gap-[10px]">
                        {chat.messages?.[0] && (
                            <>
                                <p>
                                    {chat.messages?.[0]?.sender.id === profile?.id
                                        ? 'You'
                                        : chat.messages?.[0]?.sender?.name + ' ' + chat.messages?.[0]?.sender?.lastName}
                                    :
                                </p>
                                <p>{chat.messages?.[0]?.content}</p>
                            </>
                        )}
                    </CardBody>
                </Card>
            </Link>
        </div>
    )
}
