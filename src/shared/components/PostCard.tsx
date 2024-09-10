'use client'
import { Avatar } from '@nextui-org/avatar'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import NextImage from 'next/image'
import { CommentIcon, DislikeIcon, LikeIcon, ShareIcon } from './icons'
import { Link, useRouter } from '@/navigation'

export const PostCard = ({ props }: { props: PostWithUser }) => {
    const { push } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Link href={'/posts/' + props.id} className="xl:w-1/2 w-full hover:shadow-xl">
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
            <Card className="w-full">
                <CardHeader
                    className="w-full cursor-pointer flex gap-5"
                    onClick={() => push('/users/' + props.user.id)}
                >
                    <Avatar isBordered radius="full" size="md" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {props.user.name + ' ' + props.user.lastName}
                        </h4>
                    </div>
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
                <CardFooter className="gap-3">
                    <ButtonGroup variant="bordered">
                        <Button startContent={<LikeIcon size={16} />} color="danger">
                            100
                        </Button>
                        <Button startContent={<DislikeIcon size={16} />}>100</Button>
                        <Button startContent={<CommentIcon size={16} />}>100</Button>
                        <Button startContent={<ShareIcon size={30} />} isIconOnly></Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Link>
    )
}
