'use client'

import { Pagination } from '@nextui-org/pagination'

export const PostsPagination = ({
    pagination,
}: {
    pagination: {
        total: number
        count: number
        currentPage: number
        totalPages: number
    }
}) => {
    return <>{pagination.totalPages > 1 && <Pagination total={pagination.totalPages} page={1} onChange={() => {}} />}</>
}
