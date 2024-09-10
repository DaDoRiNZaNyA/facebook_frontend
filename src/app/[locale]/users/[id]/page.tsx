import { getPostsServer } from '@/entities/Posts/api/handlers'
import { getUser } from '@/entities/Users/api/handlers'
import { PostCard } from '@/shared/components/PostCard'
import { Avatar } from '@nextui-org/avatar'
import { notFound } from 'next/navigation'
import { PostsPagination } from './client/PostsPagination'

const fetchData = async ({ id, page }: { id: number; page?: string }) => {
    const user = await getUser({ id })
    const posts = await getPostsServer({ userId: id, page: Number(page) })
    return { user, posts }
}

export default async function User({
    params,
    searchParams,
}: {
    params: { id: number }
    searchParams: { page?: string }
}) {
    const { id } = params
    const { page = '1' } = searchParams
    const { user, posts } = await fetchData({ id, page })
    if (!user || !posts) notFound()

    return (
        <section className="flex flex-col items-center justify-center gap-[20px] py-[20px]">
            <div className="xl:w-1/2 w-full">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                            {user.name + ' ' + user.lastName}
                        </h4>
                        {/* <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[20px] mt-[20px] w-full items-center">
                {posts.data.map((post) => (
                    <PostCard key={post.id} props={post} />
                ))}
                <PostsPagination pagination={posts.pagination} />
            </div>
        </section>
    )
}
