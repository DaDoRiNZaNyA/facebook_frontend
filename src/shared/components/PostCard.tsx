'use client'
import { Avatar } from '@nextui-org/avatar'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import NextImage from 'next/image'
import { CommentIcon, DislikeIcon, LikeIcon, ShareIcon } from './icons'

export const PostCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
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
            <Card className="xl:w-1/2 w-full">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400 overflow-hidden">
                    <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
                    <span className="pt-2">
                        #FrontendWithZoey
                        <span className="py-2" aria-label="computer" role="img">
                            💻
                        </span>
                    </span>
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
                </CardBody>
                <CardFooter className="gap-3">
                    {/* <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">4</p>
                        <p className=" text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                        <p className="text-default-400 text-small">Followers</p>
                    </div> */}
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
        </>
    )
}
