'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Button } from '@nextui-org/button'
import { useCreatePost } from '@/entities/Posts/api/hooks'

type CreatePostFormProps = {
    messages: {
        save: string
    }
    locale: string
}

export const CreatePostForm = ({ locale, messages }: CreatePostFormProps) => {
    const { mutate } = useCreatePost()
    const editorRef = useRef<HTMLDivElement>(null)
    const [lastChange, setLastChange] = useState('')

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
            <Button className="mt-[20px]" onClick={() => mutate({ text: lastChange, locale })}>
                {messages.save}
            </Button>
        </div>
    )
}
