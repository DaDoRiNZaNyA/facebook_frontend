import { getIntl } from '@/shared/lib/intl'
import { CreatePostForm } from './client/CreatePostForm'

type LoginProps = {
    params: { locale: string }
}

export default async function CreatePost({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        save: intl.formatMessage({ id: 'save' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <CreatePostForm locale={locale} messages={messages} />
        </section>
    )
}
