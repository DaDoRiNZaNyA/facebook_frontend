'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Button } from '@nextui-org/button'
import { useUpdatePost } from '@/entities/Posts/api/hooks'
import { MultiFileUploader } from '@/shared/components/MultiFileUploaderProps'

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
    const [images, setImages] = useState<File[]>([])
    const [deletedImages, setDeletedImages] = useState<number[]>([])

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
        <div className="xl:w-1/2 w-full h-full mt-[20px]">
            <MultiFileUploader
                images={images}
                setImages={setImages}
                urls={post.media.filter((image) => !deletedImages.includes(image.id))}
                onDelete={(image) => !deletedImages.includes(image) && setDeletedImages((prev) => [...prev, image])}
            />
            <div className="mt-[20px]">
                <div className="max-h-[60vh]" ref={editorRef} />
            </div>
            <Button
                className="mt-[20px]"
                onClick={() => mutate({ id, text: lastChange, locale, deletedMedia: deletedImages, media: images })}
            >
                {messages.save}
            </Button>
        </div>
    )
}
