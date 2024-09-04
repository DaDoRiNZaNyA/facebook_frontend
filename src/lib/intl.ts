import { createIntl } from '@formatjs/intl'

export async function getIntl(locale: string) {
    const messages = (await import(`../../lang/${locale}.json`)).default
    return createIntl({ locale, messages })
}
