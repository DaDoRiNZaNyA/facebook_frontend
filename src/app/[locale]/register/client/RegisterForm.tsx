'use client'
import { MailIcon } from '@/components/icons'
import Input from '@/components/Input'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@nextui-org/button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

type RegisterFormProps = {
    messages: {
        email: string
        enterEmail: string
        password: string
        enterPassword: string
        signIn: string
        requiredField: string
        incorrectEmail: string
        signUp: string
        name: string
        enterName: string
        lastName: string
        enterLastName: string
    }
}

export const RegisterForm = ({ messages }: RegisterFormProps) => {
    const validationSchema = Yup.object({
        email: Yup.string().email(messages.incorrectEmail).required(messages.requiredField),
        password: Yup.string().required(messages.requiredField),
        name: Yup.string().required(messages.requiredField),
        lastName: Yup.string(),
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={() => console.log('submitted')}
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
                    <Input label={messages.name} placeholder={messages.enterName} variant="bordered" name="name" />
                    <Input
                        label={messages.lastName}
                        placeholder={messages.enterLastName}
                        variant="bordered"
                        name="lastName"
                    />
                    <PasswordInput label={messages.password} placeholder={messages.enterPassword} name="password" />
                    <Button type="submit">{messages.signIn}</Button>
                </Form>
            )}
        </Formik>
    )
}
