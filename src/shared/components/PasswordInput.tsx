'use client'
import { useState } from 'react'
import { EyeFilledIcon, EyeSlashFilledIcon } from './icons'
import Input from './Input'

export default function PasswordInput({
    label,
    placeholder,
    name,
}: {
    label: string
    placeholder: string
    name: string
}) {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <Input
            label={label}
            variant="bordered"
            placeholder={placeholder}
            endContent={
                <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? 'text' : 'password'}
            name={name}
        />
    )
}
