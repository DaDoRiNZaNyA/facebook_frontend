import { getIntl } from '@/shared/lib/intl'
import { EditPostForm } from './client/EditPostForm'
import { getPostServer } from '@/entities/Posts/api/handlers'
import { notFound } from 'next/navigation'

type Props = {
    params: { locale: string; id: number }
}

const fetchData = async (id: number) => {
    const post = await getPostServer({ id })
    return post
}

export default async function CreatePost({ params: { locale, id } }: Props) {
    const intl = await getIntl(locale)

    const post = await fetchData(id)
    if (!post) notFound()

    const messages = {
        save: intl.formatMessage({ id: 'save' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <EditPostForm locale={locale} messages={messages} post={post} id={id} />
        </section>
    )
}
