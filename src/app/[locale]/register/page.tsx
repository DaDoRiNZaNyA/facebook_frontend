import { getIntl } from '@/lib/intl'
import { RegisterForm } from './client/RegisterForm'

type LoginProps = {
    params: { locale: string }
}

export default async function Login({ params: { locale } }: LoginProps) {
    const intl = await getIntl(locale)

    const messages = {
        email: intl.formatMessage({ id: 'email' }),
        enterEmail: intl.formatMessage({ id: 'enterEmail' }),
        password: intl.formatMessage({ id: 'password' }),
        enterPassword: intl.formatMessage({ id: 'enterPassword' }),
        signIn: intl.formatMessage({ id: 'signIn' }),
        requiredField: intl.formatMessage({ id: 'requiredField' }),
        incorrectEmail: intl.formatMessage({ id: 'incorrectEmail' }),
        noAccount: intl.formatMessage({ id: 'noAccount' }),
    }
    return (
        <section className="flex flex-col items-center justify-center h-full">
            <RegisterForm messages={messages} locale={locale} />
        </section>
    )
}
