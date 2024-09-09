import { getPost } from '@/entities/Posts/api/handlers'
import { Avatar } from '@nextui-org/avatar'
import { notFound } from 'next/navigation'

const fetchData = async (id: number) => {
    const post = await getPost({ id })
    return post
}

export default async function Post({ params }: { params: { id: number } }) {
    const { id } = params
    const post = await fetchData(id)
    if (!post) notFound()

    return (
        <section className="flex flex-col items-center justify-center gap-[20px] py-[20px]">
            <div className="xl:w-1/2 w-full">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {post.user.name + ' ' + post.user.lastName}
                        </h4>
                        {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                    </div>
                </div>
                <div className="w-full mt-[20px]" dangerouslySetInnerHTML={{ __html: post.text }}></div>
            </div>
        </section>
    )
}
