'use client'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'

export default function LanguageSwitcher({ locale }: { locale: string }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleLanguageChange = (lang: string) => {
        let newUrl = ''
        if (lang === 'ru') {
            if (pathname.startsWith('/ru')) {
                newUrl = pathname
            } else {
                newUrl = '/ru' + pathname
            }
        } else {
            if (pathname.startsWith('/ru')) {
                newUrl = pathname.replace('/ru', '')
            }
        }
        router.push(newUrl)
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
