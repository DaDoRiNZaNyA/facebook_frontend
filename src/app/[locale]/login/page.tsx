import { getIntl } from '@/shared/lib/intl'
import { LoginForm } from './client/LoginForm'

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
            <LoginForm messages={messages} />
        </section>
    )
}
