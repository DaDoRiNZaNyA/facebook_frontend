'use client'

import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { DeleteIcon, EditIcon, KebabIcon, ReplyIcon, SendIcon } from './icons'
import { useCreateComment, useDeleteComment, useUpdateComment } from '@/entities/Posts/api/hooks'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'

type Props = {
    comment: PostComment
    locale: string
    postId: number
    userId?: number
}

export const CommentCard = ({ comment, locale, postId, userId }: Props) => {
    const [showInput, setShowInput] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const { mutate: createComment } = useCreateComment()
    const { mutate: updateComment } = useUpdateComment()
    const { mutate: deleteComment } = useDeleteComment()
    return (
        <div className="w-full">
            <Card className="relative">
                <CardHeader className="justify-between relative">
                    <div className="flex flex-row">
                        <Avatar isBordered radius="full" size="md" />
                        <div className="flex flex-col gap-1 items-start justify-center ml-[20px]">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {comment.user.name + ' ' + comment.user.lastName}
                            </h4>
                        </div>
                    </div>
                    {userId === comment.user.id && (
                        <Dropdown placement="bottom-end" backdrop="blur">
                            <DropdownTrigger>
                                <Button startContent={<KebabIcon />} isIconOnly className="bg-transparent" />
                            </DropdownTrigger>
                            <DropdownMenu variant="flat">
                                <DropdownItem
                                    key="edit"
                                    onClick={() => {
                                        setIsEdit(true)
                                        setCommentText(comment.text)
                                        setShowInput(true)
                                    }}
                                    startContent={<EditIcon size={22} />}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    color="danger"
                                    className="text-danger"
                                    startContent={<DeleteIcon size={22} />}
                                    onClick={() => deleteComment({ id: comment.id, locale })}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </CardHeader>
                <CardBody>{comment.text}</CardBody>
                <Button
                    onClick={() => {
                        setShowInput(!showInput)
                        setCommentText('')
                    }}
                    className="absolute bottom-[10px] right-[10px]"
                    isIconOnly
                    endContent={<ReplyIcon />}
                ></Button>
            </Card>
            {showInput && comment.replies.length === 0 && (
                <div className="flex flex-row justify-between mt-[10px]">
                    <div className="flex w-[3px] min-h-full bg-default-100 my-[10px] rounded-full"></div>
                    <div className="flex flex-col w-full ml-[20px]">
                        {showInput && (
                            <Input
                                placeholder="Write a comment..."
                                size="lg"
                                className=""
                                classNames={{ inputWrapper: '!pr-0' }}
                                value={commentText}
                                onValueChange={(e) => setCommentText(e)}
                                endContent={
                                    <Button
                                        color="secondary"
                                        isIconOnly
                                        size="lg"
                                        endContent={<SendIcon size={22} />}
                                        onClick={() => {
                                            setShowInput(false)
                                            setCommentText('')
                                            if (isEdit) {
                                                updateComment({ id: comment.id, text: commentText, locale })
                                            } else {
                                                createComment({
                                                    postId: postId,
                                                    text: commentText,
                                                    locale,
                                                    parentId: comment.id,
                                                })
                                            }
                                            setIsEdit(false)
                                        }}
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            )}
            {comment.replies.length > 0 && (
                <div className="flex flex-row justify-between mt-[10px]">
                    <div className="flex w-[3px] min-h-full bg-default-100 my-[10px] rounded-full"></div>
                    <div className="flex flex-col w-full gap-[20px] ml-[20px]">
                        {comment.replies.map((reply) => (
                            <Card key={reply.id}>
                                <CardHeader className="justify-between relative">
                                    <div className="flex flex-row">
                                        <Avatar isBordered radius="full" size="md" />
                                        <div className="flex flex-col gap-1 items-start justify-center ml-[20px]">
                                            <h4 className="text-small font-semibold leading-none text-default-600">
                                                {reply.user.name + ' ' + reply.user.lastName}
                                            </h4>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>{reply.text}</CardBody>
                            </Card>
                        ))}
                        {showInput && (
                            <Input
                                placeholder="Write a comment..."
                                size="lg"
                                className=""
                                classNames={{ inputWrapper: '!pr-0' }}
                                value={commentText}
                                onValueChange={(e) => setCommentText(e)}
                                endContent={
                                    <Button
                                        color="secondary"
                                        isIconOnly
                                        size="lg"
                                        endContent={<SendIcon size={22} />}
                                        onClick={() => {
                                            setShowInput(false)
                                            setCommentText('')
                                            if (isEdit) {
                                                updateComment({ id: comment.id, text: commentText, locale })
                                            } else {
                                                createComment({
                                                    postId: postId,
                                                    text: commentText,
                                                    locale,
                                                    parentId: comment.id,
                                                })
                                            }
                                            setIsEdit(false)
                                        }}
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
