import { getIntl } from '@/shared/lib/intl'
import { ProfileForm } from './client/ProfileForm'

type LoginProps = {
    params: { locale: string }
}

export default async function Profile({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        email: intl.formatMessage({ id: 'email' }),
        enterEmail: intl.formatMessage({ id: 'enterEmail' }),
        requiredField: intl.formatMessage({ id: 'requiredField' }),
        incorrectEmail: intl.formatMessage({ id: 'incorrectEmail' }),
        noAccount: intl.formatMessage({ id: 'noAccount' }),
        name: intl.formatMessage({ id: 'name' }),
        enterName: intl.formatMessage({ id: 'enterName' }),
        lastName: intl.formatMessage({ id: 'lastName' }),
        enterLastName: intl.formatMessage({ id: 'enterLastName' }),
        save: intl.formatMessage({ id: 'save' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <ProfileForm messages={messages} locale={locale} />
        </section>
    )
}
