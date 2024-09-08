import { getIntl } from '@/shared/lib/intl'
import { PostsList } from './client/PostsList'

type LoginProps = {
    params: { locale: string }
}

export default async function MyPosts({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        email: intl.formatMessage({ id: 'email' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <PostsList />
        </section>
    )
}
