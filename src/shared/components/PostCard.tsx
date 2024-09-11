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
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Virtual, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { useState } from 'react'

export const PostCard = ({ props }: { props: PostWithUser }) => {
    const { push } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState(props.media?.[0]?.url)
    const { mutate: like } = useLikePost()

    return (
        <div className="relative xl:w-1/2 w-full hover:shadow-xl cursor-pointer">
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
                                src={selectedImage}
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
                    <div
                        onClick={() => push('/posts/' + props.id)}
                        className="max-h-[300px]"
                        dangerouslySetInnerHTML={{ __html: props.text }}
                    ></div>
                    {props.media?.length > 0 && (
                        <div className="h-[300px] w-full my-[20px]">
                            <Swiper
                                modules={[Virtual, EffectCoverflow, Pagination]}
                                slidesPerView={1}
                                effect={'coverflow'}
                                grabCursor={true}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                pagination={{
                                    bulletClass: 'swiper-pagination-bullet !bg-default-500',
                                    clickable: true,
                                }}
                                spaceBetween={30}
                                centeredSlides={true}
                                virtual
                            >
                                {props.media?.map((media, index) => (
                                    <SwiperSlide key={media.id} virtualIndex={index}>
                                        <button
                                            className="rounded-lg overflow-hidden w-full"
                                            onClick={() => {
                                                setSelectedImage(process.env.NEXT_PUBLIC_BACKEND_URL + media.url)
                                                onOpen()
                                            }}
                                        >
                                            <NextImage
                                                className="object-contain aspect-square max-h-[300px] py-[20px]"
                                                src={process.env.NEXT_PUBLIC_BACKEND_URL + media.url}
                                                loading="lazy"
                                                width={300}
                                                height={300}
                                                alt="post img"
                                            />
                                        </button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
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
