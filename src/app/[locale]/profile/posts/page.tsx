import { getIntl } from '@/shared/lib/intl'
import { PostsList } from './client/PostsList'

type LoginProps = {
    params: { locale: string }
}

export default async function MyPosts({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        newPost: intl.formatMessage({ id: 'newPost' }),
        search: intl.formatMessage({ id: 'search' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <PostsList messages={messages} />
        </section>
    )
}
