'use client'
import { Link } from '@/navigation'

export const PostsList = () => {
    return (
        <div>
            <Link href={'/profile/posts/create'}>create post</Link>
        </div>
    )
}
