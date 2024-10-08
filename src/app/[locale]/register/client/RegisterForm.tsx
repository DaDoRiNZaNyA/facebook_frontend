'use client'
import { useRegister } from '@/entities/Auth/api/hooks'
import { MailIcon } from '@/shared/components/icons'
import Input from '@/shared/components/Input'
import PasswordInput from '@/shared/components/PasswordInput'
import { Button } from '@nextui-org/button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

type RegisterFormProps = {
    messages: {
        email: string
        enterEmail: string
        password: string
        confirmPassword: string
        enterPassword: string
        requiredField: string
        incorrectEmail: string
        signUp: string
        name: string
        enterName: string
        lastName: string
        enterLastName: string
    }
    locale: string
}

export const RegisterForm = ({ messages, locale }: RegisterFormProps) => {
    const { mutate } = useRegister()
    const validationSchema = Yup.object({
        email: Yup.string().email(messages.incorrectEmail).required(messages.requiredField),
        password: Yup.string().required(messages.requiredField),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], messages.confirmPassword)
            .required(messages.requiredField),
        name: Yup.string().required(messages.requiredField),
        lastName: Yup.string(),
    })

    return (
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', name: '', lastName: '' }}
            onSubmit={(values) =>
                mutate({
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    lastName: values.lastName,
                    locale: locale,
                })
            }
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
                    <PasswordInput
                        label={messages.confirmPassword}
                        placeholder={messages.confirmPassword}
                        name="confirmPassword"
                    />
                    <Button type="submit">{messages.signUp}</Button>
                </Form>
            )}
        </Formik>
    )
}
