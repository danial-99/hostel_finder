import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MobileApp() {
  return (
    <section className='py-12 bg-primary text-primary-foreground'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4'>Get our Mobile App</h2>
            <p className='mb-6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='flex gap-4'>
              <Link href={"#"}>
                <Button className='p-0' variant='secondary'>
                  <Image
                    unoptimized
                    width={0}
                    height={0}
                    src='/assets/Apple-Store.png'
                    alt='Mobile App'
                    className='w-full'
                  />
                </Button>
              </Link>
              <Link href={"#"}>
                <Button className='p-0' variant='secondary'>
                  <Image
                    unoptimized
                    width={0}
                    height={0}
                    src='/assets/Google-Store.png'
                    alt='Mobile App'
                    className='w-full'
                  />
                </Button>
              </Link>
            </div>
          </div>
          <div className='md:w-1/2'>
            <Image
              unoptimized
              width={0}
              height={0}
              src='/assets/app.svg'
              alt='Mobile App'
              className='w-full max-w-md mx-auto'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
