'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const router = useRouter();

  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className=" text-9xl font-semibold text-primary animate-pulse">
            403
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Access Denied
          </h1>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Sorry, you don’t have permission to access this page.
          </p>
          <Button
            className="mt-10"
            onClick={() => router.push("/")}
            variant={'destructive'}
          >
            Go Back
          </Button>
        </div>
      </main>
    </>
  );
}
