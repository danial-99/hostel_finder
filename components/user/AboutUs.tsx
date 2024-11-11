import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className='py-12' id='about-us'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4'>About Us</h2>
            <p className='text-gray-600 mb-4'>
            Welcome to <b>HostelFinder</b>, the go-to platform designed to connect students and hostel owners seamlessly and affordably. We understand that finding the perfect accommodation can be a challenge, especially when it comes to balancing quality, safety, and cost. That’s why we created <b>HostelFinder</b> a solution where students and owners can interact directly to find accommodations that meet their needs without the hefty fees associated with traditional services.
            </p>
            <p className='text-gray-600 mb-4'>
            For students, we provide access to verified listings across a range of prices, facilities, and locations. Our platform allows you to compare hostels, view ratings, and read genuine feedback from other students, ensuring a smooth decision-making process. Hostel owners, on the other hand, benefit from a dedicated space to showcase their properties, manage bookings efficiently, and connect with potential residents easily and transparently.
            </p>
            <p className="text-gray-600 mb-4">
            Whether you’re searching for a comfortable place to stay during your studies or looking to welcome students to your hostel, <b>HostelFinder</b> offers a trusted, budget-friendly solution tailored for students and owners alike.
            </p>

            <Button>Contact us</Button>
          </div>
          <div className='md:w-1/2'>
            <Image
            unoptimized
              width={0}
              height={0}
              src='/about-us-banner.png'
              alt='About Us'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
