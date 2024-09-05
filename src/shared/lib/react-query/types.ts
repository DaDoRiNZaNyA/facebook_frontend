import { ReactNode } from 'react'
import { DehydratedState } from '@tanstack/react-query'

export type TProps = {
    children: ReactNode
    dehydratedState: DehydratedState
}
