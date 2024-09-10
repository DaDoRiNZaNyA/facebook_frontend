import { getPostsServer } from '@/entities/Posts/api/handlers'
import { getUser } from '@/entities/Users/api/handlers'
import { notFound } from 'next/navigation'
import { UserPage } from './client/UserPage'
import { getIntl } from '@/shared/lib/intl'

const fetchData = async ({ id, page }: { id: number; page?: string }) => {
    const user = await getUser({ id })
    const posts = await getPostsServer({ userId: id, page: Number(page) })
    return { user, posts }
}

export default async function User({
    params,
    searchParams,
}: {
    params: { id: number; locale: string }
    searchParams: { page?: string }
}) {
    const { id, locale } = params
    const { page = '1' } = searchParams
    const { user, posts } = await fetchData({ id, page })
    if (!user || !posts) notFound()

    const intl = await getIntl(locale)

    const messages = {
        search: intl.formatMessage({ id: 'search' }),
        follow: intl.formatMessage({ id: 'follow' }),
        unfollow: intl.formatMessage({ id: 'unfollow' }),
    }
    return (
        <section className="flex flex-col items-center justify-center gap-[20px] py-[20px]">
            <UserPage posts={posts} user={user} messages={messages} locale={locale} />
        </section>
    )
}
