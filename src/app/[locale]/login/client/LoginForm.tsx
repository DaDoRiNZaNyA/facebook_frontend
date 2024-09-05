'use client'
import { MailIcon } from '@/shared/components/icons'
import Input from '@/shared/components/Input'
import PasswordInput from '@/shared/components/PasswordInput'
import { Button } from '@nextui-org/button'
import { Form, Formik } from 'formik'
import { Link } from '@/navigation'
import * as Yup from 'yup'
import { useLogin } from '@/entities/Auth/api/hooks'

type LoginFormProps = {
    messages: {
        email: string
        enterEmail: string
        password: string
        enterPassword: string
        signIn: string
        requiredField: string
        incorrectEmail: string
        noAccount: string
    }
}

export const LoginForm = ({ messages }: LoginFormProps) => {
    const { mutate: login, isPending } = useLogin()
    const validationSchema = Yup.object({
        email: Yup.string().email(messages.incorrectEmail).required(messages.requiredField),
        password: Yup.string().required(messages.requiredField),
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => login({ email: values.email, password: values.password })}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-4 md:w-[400px] w-full">
                    <Input
                        autoFocus
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label={messages.email}
                        placeholder={messages.enterEmail}
                        variant="bordered"
                        name="email"
                    />
                    <PasswordInput label={messages.password} placeholder={messages.enterPassword} name="password" />
                    <Button isLoading={isPending} type="submit">
                        {messages.signIn}
                    </Button>
                    <Link className="text-primary" href={`/register`}>
                        {messages.noAccount}
                    </Link>
                </Form>
            )}
        </Formik>
    )
}
