// import { getIntl } from '@/shared/lib/intl'
import { UserChat } from './client/UserChat'
type Props = {
    params: { locale: string; id: number }
}

export default async function Chat({ params: { locale, id } }: Props) {
    // const intl = await getIntl(locale)

    return (
        <section className="flex flex-col items-center justify-center h-full">
            <UserChat locale={locale} id={Number(id)} />
        </section>
    )
}
