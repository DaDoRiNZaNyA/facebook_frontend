'use client'

import React from 'react'

interface AvatarUploaderProps {
    url?: string
    image: File | null
    setImage: React.Dispatch<React.SetStateAction<File | null>>
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({ url, image, setImage }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && setImage) {
            setImage(file)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-36 h-36 bg-default-300 flex justify-center items-center rounded-full overflow-hidden mb-4">
                {image || url ? (
                    <img
                        src={image ? URL.createObjectURL(image) : url ? process.env.NEXT_PUBLIC_BACKEND_URL + url : ''}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-default-foreground">Upload Avatar</span>
                )}
            </div>
            <label className="cursor-pointer relative">
                <span className="block py-2 px-4 rounded-full bg-secondary text-white text-sm font-semibold hover:opacity-90">
                    Upload your image
                </span>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
        </div>
    )
}
