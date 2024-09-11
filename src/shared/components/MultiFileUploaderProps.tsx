'use client'

import React from 'react'

interface MultiFileUploaderProps {
    urls?: {
        id: number
        postId: number
        url: string
        type: string
        createdAt: string
    }[]
    images: File[]
    setImages: React.Dispatch<React.SetStateAction<File[]>>
    onDelete?: (id: number) => void
}

export const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({ urls = [], images, setImages, onDelete }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        setImages((prevImages) => [...prevImages, ...selectedFiles])
    }

    const handleRemoveImage = (index: number, id?: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
        if (id && onDelete) {
            onDelete(id)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-wrap gap-4 mb-4">
                {images.length > 0 || urls.length > 0 ? (
                    <>
                        {images.map((image, index) => (
                            <div key={index} className="relative w-36 h-36 bg-default-300 rounded-lg overflow-hidden">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {urls.map((url, index) => (
                            <div
                                key={`url-${index}`}
                                className="relative w-36 h-36 bg-default-300 rounded-lg overflow-hidden"
                            >
                                <img
                                    src={process.env.NEXT_PUBLIC_BACKEND_URL + url.url}
                                    alt={`Existing file ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs"
                                    onClick={() => handleRemoveImage(index, url.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>

            <label className="cursor-pointer relative">
                <span className="block py-2 px-4 rounded-full bg-secondary text-white text-sm font-semibold hover:opacity-90">
                    Upload your images
                </span>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
        </div>
    )
}
