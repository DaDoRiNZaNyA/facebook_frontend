'use client'
import { useDeletePost, useGetMyPosts } from '@/entities/Posts/api/hooks'
import { Link, useRouter } from '@/navigation'
import { DeleteIcon, EditIcon, KebabIcon, PlusIcon, SearchIcon } from '@/shared/components/icons'
import { PostCard } from '@/shared/components/PostCard'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
import { useState } from 'react'
import { Pagination } from '@nextui-org/pagination'
import { Input } from '@nextui-org/input'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { ConfirmActionPopup } from '@/shared/components/ConfirmActionPopup'
import { useDisclosure } from '@nextui-org/modal'

type Props = {
    messages: {
        newPost: string
        search: string
        yes: string
        no: string
        doYouWantToDeletePost: string
    }
    locale: string
}

export const PostsList = ({ messages, locale }: Props) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const { data, isPending } = useGetMyPosts({ page, size: 10, search })
    const [selectedPost, setSelectedPost] = useState(-1)
    const { mutate: deletePost } = useDeletePost()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-[20px]">
            <ConfirmActionPopup
                isOpen={isOpen}
                onClose={onClose}
                title={messages.doYouWantToDeletePost}
                yesText={messages.yes}
                noText={messages.no}
                yesAction={() => deletePost({ id: selectedPost, locale })}
            />
            <div className="xl:w-1/2 w-full flex flex-row justify-between gap-[20px] mt-[20px]">
                <Input
                    startContent={<SearchIcon size={22} />}
                    value={search}
                    onValueChange={setSearch}
                    className="w-fit"
                    placeholder={messages.search + '...'}
                />
                <Button as={Link} href={'/profile/posts/create'} startContent={<PlusIcon size={22} />}>
                    {messages.newPost}
                </Button>
            </div>
            {isPending ? (
                <Spinner />
            ) : (
                data?.data.map((post) => (
                    <div className="relative flex justify-center w-full" key={post.id}>
                        <PostCard props={post} />

                        <div className="absolute top-0 xl:right-1/4 right-0 z-10 bg-transparent">
                            <Dropdown placement="bottom-end" backdrop="blur">
                                <DropdownTrigger>
                                    <Button startContent={<KebabIcon />} isIconOnly className="bg-transparent" />
                                </DropdownTrigger>
                                <DropdownMenu variant="flat">
                                    <DropdownItem
                                        key="edit"
                                        onClick={() => router.push('/profile/posts/edit/' + post.id)}
                                        startContent={<EditIcon size={22} />}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem
                                        key="delete"
                                        color="danger"
                                        className="text-danger"
                                        startContent={<DeleteIcon size={22} />}
                                        onClick={() => {
                                            setSelectedPost(post.id)
                                            onOpen()
                                        }}
                                    >
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                ))
            )}
            {data && data?.pagination?.totalPages > 1 && (
                <Pagination total={data.pagination.totalPages} page={page} onChange={setPage} />
            )}
        </div>
    )
}
