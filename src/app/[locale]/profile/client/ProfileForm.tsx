'use client'
import { useProfile, useUpdateProfile } from '@/entities/Auth/api/hooks'
import { AvatarUploader } from '@/shared/components/AvatarUploader'
import { MailIcon } from '@/shared/components/icons'
import Input from '@/shared/components/Input'
import { Button } from '@nextui-org/button'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

type ProfileFormProps = {
    messages: {
        email: string
        enterEmail: string
        requiredField: string
        incorrectEmail: string
        name: string
        enterName: string
        lastName: string
        enterLastName: string
        save: string
    }
    locale: string
}

export const ProfileForm = ({ messages, locale }: ProfileFormProps) => {
    const [avatar, setAvatar] = useState<File | null>(null)
    const { data: profile } = useProfile()
    const { mutate, isPending } = useUpdateProfile()
    const validationSchema = Yup.object({
        email: Yup.string().email(messages.incorrectEmail).required(messages.requiredField),
        name: Yup.string().required(messages.requiredField),
        lastName: Yup.string(),
    })

    return (
        <div>
            <AvatarUploader image={avatar} setImage={setAvatar} url={profile?.avatar} />
            <Formik
                initialValues={{ email: profile?.email, name: profile?.name, lastName: profile?.lastName }}
                onSubmit={(values) => {
                    if (values.email && values.name) {
                        mutate({
                            email: values.email,
                            name: values.name,
                            lastName: values.lastName,
                            locale: locale,
                            avatar: avatar || undefined,
                        })
                    }
                }}
                validationSchema={validationSchema}
                key={profile?.id}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 md:w-[400px] w-full mt-[20px]">
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
                        <Button isDisabled={isPending} type="submit">
                            {messages.save}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
