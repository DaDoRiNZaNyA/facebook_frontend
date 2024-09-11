'use client'
import { Avatar } from '@nextui-org/avatar'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import NextImage from 'next/image'
import { CommentIcon, DislikeIcon, LikeIcon, ShareIcon } from './icons'
import { useRouter } from '@/navigation'
import { useLikePost } from '@/entities/Posts/api/hooks'

export const PostCard = ({ props }: { props: PostWithUser }) => {
    const { push } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: like } = useLikePost()

    return (
        <div
            className="relative xl:w-1/2 w-full hover:shadow-xl cursor-pointer"
            onClick={() => push('/posts/' + props.id)}
        >
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onClose={onClose}
                classNames={{ wrapper: 'flex items-center justify-center' }}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                            <Image
                                isBlurred
                                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                alt="post img"
                                width={'100%'}
                                height={'100%'}
                                className="pb-[24px]"
                            />
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
            <Card className="w-full py-[60px]">
                <CardHeader className="absolute cursor-pointer flex  top-0 w-fit">
                    <Button
                        onClick={() => {
                            push('/users/' + props.user.id)
                        }}
                        className="flex items-center gap-5 z-10 bg-transparent !p-0 overflow-visible"
                    >
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={
                                props.user?.avatar ? process.env.NEXT_PUBLIC_BACKEND_URL + props.user.avatar : undefined
                            }
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {props.user.name + ' ' + props.user.lastName}
                            </h4>
                        </div>
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400 overflow-hidden">
                    <div className="max-h-[300px]" dangerouslySetInnerHTML={{ __html: props.text }}></div>
                    {props.media && (
                        <button className="rounded-lg overflow-hidden w-[300px]" onClick={onOpen}>
                            <NextImage
                                className="object-cover aspect-square max-h-[300px] py-[20px]"
                                src="https://nextui.org/images/album-cover.png"
                                loading="lazy"
                                width={300}
                                height={300}
                                alt="post img"
                            />
                        </button>
                    )}
                </CardBody>
                <CardFooter className="gap-3 absolute bottom-0">
                    <ButtonGroup variant="bordered">
                        <Button
                            startContent={<LikeIcon size={16} />}
                            color={props.userReaction === 'like' ? 'danger' : 'default'}
                            onClick={() => like({ postId: props.id, isLike: true })}
                        >
                            {props.totalLikes}
                        </Button>
                        <Button
                            startContent={<DislikeIcon size={16} />}
                            color={props.userReaction === 'dislike' ? 'danger' : 'default'}
                            onClick={() => like({ postId: props.id, isLike: false })}
                        >
                            {props.totalDislikes}
                        </Button>
                        <Button startContent={<CommentIcon size={16} />} onClick={() => push('/posts/' + props.id)}>
                            {props.totalComments}
                        </Button>
                        <Button startContent={<ShareIcon size={30} />} isIconOnly></Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}
