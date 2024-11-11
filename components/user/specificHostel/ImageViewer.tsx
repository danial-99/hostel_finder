'use client'
import { useState } from "react";
import Image from "next/image";

export default function ImageViewer() {
  const [activeImage, setActiveImage] = useState("/bed.png");

  return (
    <>
      <div className='lg:w-1/3'>
        <Image
          src={activeImage}
          alt='Hostel main image'
          width={500}
          height={300}
          className='w-full h-64 object-cover rounded-lg mb-4'
        />
        <div className='grid grid-cols-4 gap-2'>
          {[
            "/bed.png",
            "/room1.png",
            "/room.jpg",
            "/room1.png",
            "/bed.png",
          ].map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Hostel image ${index + 1}`}
              width={100}
              height={100}
              className='w-full h-20 object-cover rounded cursor-pointer'
              onClick={() => setActiveImage(img)}
            />
          ))}
          <div className='relative'>
            <Image
              src='/bed.png'
              alt='More images'
              width={100}
              height={100}
              className='w-full h-20 object-cover rounded cursor-pointer'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded'>
              <span className='text-white font-bold'>+10</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
