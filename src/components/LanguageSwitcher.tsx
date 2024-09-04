'use client'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { usePathname, useRouter } from '@/navigation'
import { Button } from '@nextui-org/button'
import { Locale } from '@/types'

export default function LanguageSwitcher({ locale }: { locale: string }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleLanguageChange = (lang: Locale) => {
        router.push(pathname, { locale: lang })
    }

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Button variant="bordered" size="sm">
                    {locale === 'ru' ? 'RU' : 'EN'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Выберите язык">
                <DropdownItem
                    key="en"
                    onClick={() => handleLanguageChange('en')}
                    className={locale === 'ru' ? 'font-bold' : ''}
                >
                    English
                </DropdownItem>
                <DropdownItem
                    key="ru"
                    onClick={() => handleLanguageChange('ru')}
                    className={locale === 'en' ? 'font-bold' : ''}
                >
                    Русский
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
