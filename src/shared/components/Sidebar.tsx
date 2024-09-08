'use client'

import { Button } from '@nextui-org/button'
import { PostIcon, UserIcon } from './icons'

export const Sidebar = () => {
    const list = [
        {
            title: 'My profile',
            path: '/profile',
            icon: <UserIcon size={20} />,
        },
        {
            title: 'My posts',
            path: '/posts',
            icon: <PostIcon size={20} />,
        },
    ]
    return (
        <div className="flex flex-col w-[150px] gap-y-[10px]">
            {list.map(({ title, path, icon }) => (
                <Button key={title} href={path} startContent={icon}>
                    {title}
                </Button>
            ))}
        </div>
    )
}
