'use client'

import { Avatar } from '@nextui-org/avatar'
import { Card, CardHeader } from '@nextui-org/card'

export const UserCard = () => {
    return (
        <Card className="xl:w-1/2 w-full">
            <CardHeader className="justify-between">
                <div className="flex flex-row">
                    <Avatar isBordered radius="full" size="md" />
                    <div className="flex flex-col gap-1 items-start justify-center ml-[20px]">
                        <h4 className="text-small font-semibold leading-none text-default-600">asdasd</h4>
                        {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
