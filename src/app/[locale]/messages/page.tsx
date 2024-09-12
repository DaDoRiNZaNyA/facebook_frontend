import { getIntl } from '@/shared/lib/intl'
import { Chats } from './client/Chats'

type Props = {
    params: { locale: string }
}

export default async function Messages({ params: { locale } }: Props) {
    const intl = await getIntl(locale)

    const messages = {
        email: intl.formatMessage({ id: 'email' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <Chats messages={messages} locale={locale} />
        </section>
    )
}
