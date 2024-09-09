import { getIntl } from '@/shared/lib/intl'
import { FollowingList } from './client/FollowingList'

type LoginProps = {
    params: { locale: string }
}

export default async function Following({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        email: intl.formatMessage({ id: 'email' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <FollowingList messages={messages} locale={locale} />
        </section>
    )
}
