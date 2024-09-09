'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Button } from '@nextui-org/button'
import { useUpdatePost } from '@/entities/Posts/api/hooks'

type EditPostFormProps = {
    messages: {
        save: string
    }
    locale: string
    post: PostWithUser
    id: number
}

export const EditPostForm = ({ locale, messages, post, id }: EditPostFormProps) => {
    const { mutate } = useUpdatePost()
    const editorRef = useRef<HTMLDivElement>(null)
    const [lastChange, setLastChange] = useState(post.text)

    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (editorRef.current) {
                const quill = new Quill(editorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, { header: '3' }],
                            ['bold', 'italic', 'underline'],
                            ['link'],
                        ],
                    },
                })

                quill.clipboard.dangerouslyPasteHTML(post.text)

                quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
                    const content = quill.root.innerHTML
                    setLastChange(content)
                })

                return () => {
                    quill.off(Quill.events.TEXT_CHANGE)
                }
            }
        }
    }, [])

    return (
        <div className="xl:w-1/2 w-full">
            <div ref={editorRef} />
            <Button className="mt-[20px]" onClick={() => mutate({ text: lastChange, locale, id })}>
                {messages.save}
            </Button>
        </div>
    )
}
