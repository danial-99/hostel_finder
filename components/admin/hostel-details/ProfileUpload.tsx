import React from "react";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function ProfileUpload({
  uploadAvatrTOcloudinary,
  avatar,
}: any) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
        {avatar ? (
          <Image
            src={avatar}
            alt="avatar-image"
            fill
            className="object-cover"
          />
        ) : (
          <>
            {" "}
            <Camera className="w-8 h-8 text-gray-500" />
            <input
              type="file"
              id="avatar"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0 h-full w-full"
              accept="image/*"
              onChange={(e) => uploadAvatrTOcloudinary(e?.target?.files?.[0])}
            />
          </>
        )}
      </div>
      <span className="mt-2 text-sm text-gray-600">Upload Profile</span>
    </div>
  );
}
