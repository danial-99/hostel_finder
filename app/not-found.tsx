"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <>
      <div className='flex h-screen items-center justify-around'>
        <div>
          <div className='text-gray-300 text-[80px] font-semibold leading-[80px]'>
            Error 404
          </div>
          <p className="text-neutral-800 text-5xl font-semibold font-['Inter'] leading-[52px]">
            Oops! page not found
          </p>
          <p className="w-[534px] text-gray-600 text-xl font-normal font-['Inter'] leading-loose">
            Something went wrong. It’s look that your requested could not be
            found. It's look like the link is broken or the page is removed.
          </p>
          <Button onClick={router.back}>Go Back</Button>
        </div>

        <Image
          src='/assets/error404.png'
          alt='icon'
          width={553}
          height={269}
        />
      </div>
    </>
  );
}
