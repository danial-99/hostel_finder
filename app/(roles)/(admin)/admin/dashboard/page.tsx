"use client";


import BookingRateChart from "@/components/admin/BookingRateChart";

import HostelSpaceChart from "@/components/admin/HostelSpaceChart";


export default function Dashboard() {
  return (
    <>
      <h1 className='text-3xl font-semibold mb-6'>Welcome 👋</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        <div className='col-span-1 md:col-span-2 lg:col-span-1'>
          <HostelSpaceChart />
        </div>
        <BookingRateChart />
      </div>
   
    </>
  );
}
