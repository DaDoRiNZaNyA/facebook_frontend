import { getPostServer } from '@/entities/Posts/api/handlers'
import { Avatar } from '@nextui-org/avatar'
import { notFound } from 'next/navigation'
import { PostPage } from './client/PostPage'

const fetchData = async (id: number) => {
    const post = await getPostServer({ id })
    return post
}

export default async function Post({ params }: { params: { id: number; locale: string } }) {
    const { id, locale } = params
    const post = await fetchData(id)
    if (!post) notFound()

    return (
        <section className="flex flex-col items-center justify-center gap-[20px] py-[20px]">
            <PostPage post={post} locale={locale} />
        </section>
    )
}
