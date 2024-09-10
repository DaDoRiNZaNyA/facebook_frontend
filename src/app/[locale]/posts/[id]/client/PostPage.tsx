'use client'
import { useGetPost, useLikePost } from '@/entities/Posts/api/hooks'
import { DislikeIcon, LikeIcon, ShareIcon } from '@/shared/components/icons'
import { Avatar } from '@nextui-org/avatar'
import { Button, ButtonGroup } from '@nextui-org/button'

export const PostPage = ({ post, locale }: { post: PostWithUser; locale: string }) => {
    const { mutate: like } = useLikePost()
    const { data: postData } = useGetPost({ id: post.id, locale, initialData: post })
    return (
        <div className="xl:w-1/2 w-full">
            <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                        {postData?.user.name + ' ' + postData?.user.lastName}
                    </h4>
                    {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                </div>
            </div>
            <div className="w-full mt-[20px]" dangerouslySetInnerHTML={{ __html: postData?.text || '' }}></div>
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
        </div>
    )
}
