'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Button } from '@nextui-org/button'
import { useCreatePost } from '@/entities/Posts/api/hooks'
import { MultiFileUploader } from '@/shared/components/MultiFileUploaderProps'

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
    const [images, setImages] = useState<File[]>([])

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
        <div className="xl:w-1/2 w-full h-full mt-[20px]">
            <MultiFileUploader images={images} setImages={setImages} />
            <div className="mt-[20px]">
                <div className="max-h-[60vh]" ref={editorRef} />
            </div>
            <Button className="mt-[20px]" onClick={() => mutate({ text: lastChange, locale, media: images })}>
                {messages.save}
            </Button>
        </div>
    )
}
