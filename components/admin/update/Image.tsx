'use client'

import { useState, useRef } from 'react'

export default function Images() {
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const addImages = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const deleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleDeviceUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCameraUpload = () => {
    cameraInputRef.current?.click()
  }

  const updateImages = () => {
    console.log('Updated Images:', images)
    alert('Images updated successfully!')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Hostel Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl text-xs"
              onClick={() => deleteImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={handleDeviceUpload}
        >
          Upload from Device
        </button>
        <button
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
          onClick={handleCameraUpload}
        >
          Take Photo
        </button>
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        onClick={updateImages}
      >
        Update Images
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={(e) => addImages(e.target.files)}
      />
      <input
        type="file"
        ref={cameraInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => addImages(e.target.files)}
      />
    </div>
  )
}

