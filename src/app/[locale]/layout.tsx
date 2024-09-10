import BaseLayout from '@/shared/components/BaseLayout'
import { getIntl } from '@/shared/lib/intl'
import { Locale } from '@/shared/types'

export default async function Layout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
    const intl = await getIntl(params.locale)

    const messages = {
        myProfile: intl.formatMessage({ id: 'myProfile' }),
        myPosts: intl.formatMessage({ id: 'myPosts' }),
        logout: intl.formatMessage({ id: 'logout' }),
        followers: intl.formatMessage({ id: 'followers' }),
    }
    return <BaseLayout params={params} children={children} messages={messages} />
}
