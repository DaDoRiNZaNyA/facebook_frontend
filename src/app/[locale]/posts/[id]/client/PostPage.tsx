'use client'
import { useProfile } from '@/entities/Auth/api/hooks'
import { useCreateComment, useGetPost, useGetPostComments, useLikePost } from '@/entities/Posts/api/hooks'
import { CommentCard } from '@/shared/components/CommentCard'
import { DislikeIcon, LikeIcon, SendIcon, ShareIcon } from '@/shared/components/icons'
import { Avatar } from '@nextui-org/avatar'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Virtual, Pagination } from 'swiper/modules'
import NextImage from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Image } from '@nextui-org/image'

export const PostPage = ({
    post,
    locale,
    comments,
}: {
    post: PostWithUser
    locale: string
    comments: PostComment[]
}) => {
    const { mutate: like } = useLikePost()
    const { data: postData } = useGetPost({ id: post.id, locale, initialData: post })
    const { data: commentsData } = useGetPostComments({ initialData: comments, id: post.id })
    const [commentText, setCommentText] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState(post.media?.[0]?.url)
    const { mutate: createComment } = useCreateComment()
    const { data: profile } = useProfile()
    return (
        <div className="xl:w-1/2 w-full">
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
            <div className="flex gap-5">
                <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={post.user?.avatar ? process.env.NEXT_PUBLIC_BACKEND_URL + post.user.avatar : undefined}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                        {postData?.user.name + ' ' + postData?.user.lastName}
                    </h4>
                    {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                </div>
            </div>
            <div className="w-full mt-[20px]" dangerouslySetInnerHTML={{ __html: postData?.text || '' }}></div>
            {postData && postData.media?.length > 0 && (
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
                        {postData.media?.map((media, index) => (
                            <SwiperSlide key={media.id} virtualIndex={index}>
                                <button
                                    className="rounded-lg overflow-hidden w-full !h-[300px]"
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
            <ButtonGroup variant="bordered" className="mt-[20px]">
                <Button
                    startContent={<LikeIcon size={16} />}
                    color={postData?.userReaction === 'like' ? 'danger' : 'default'}
                    onClick={() => like({ postId: post.id, isLike: true })}
                >
                    {postData?.totalLikes}
                </Button>
                <Button
                    startContent={<DislikeIcon size={16} />}
                    color={postData?.userReaction === 'dislike' ? 'danger' : 'default'}
                    onClick={() => like({ postId: post.id, isLike: false })}
                >
                    {postData?.totalDislikes}
                </Button>
                <Button startContent={<ShareIcon size={30} />} isIconOnly></Button>
            </ButtonGroup>
            <div className="flex flex-col gap-[20px] mt-[20px]">
                {commentsData?.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        locale={locale}
                        postId={post.id}
                        userId={profile?.id}
                    />
                ))}
            </div>
            <Input
                placeholder="Write a comment..."
                size="lg"
                className="mt-[20px]"
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
                            createComment({ postId: post.id, text: commentText, locale })
                            setCommentText('')
                        }}
                    />
                }
            />
        </div>
    )
}
