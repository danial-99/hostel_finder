"use client";

import AnnualReportChart from "@/components/admin/AnnualReportChart";
import BookingRateChart from "@/components/admin/BookingRateChart";
import HosteliteManagementChart from "@/components/admin/HosteliteManagementChart";
import HostelSpaceChart from "@/components/admin/HostelSpaceChart";
import StatsCard from "@/components/admin/StatsCard";

export default function Dashboard() {
  return (
    <>
      <h1 className='text-3xl font-semibold mb-6'>Welcome Israr👋</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <StatsCard
          title='Students/Professional Inflow'
          value='2,643'
          change='1.10% Since yesterday'
          increased={true}
        />
        <StatsCard
          title='User Retention'
          value='2,643'
          change='1.10% Since yesterday'
          increased={true}
        />
        <StatsCard
          title='Profit Rate'
          value='2,643'
          change='1.10% Since yesterday'
          increased={true}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
        <div className='col-span-1 md:col-span-2 lg:col-span-1'>
          <HostelSpaceChart />
        </div>
        <div className='col-span-1 md:col-span-2 lg:col-span-2'>
          <HosteliteManagementChart />
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <BookingRateChart />
        <AnnualReportChart />
      </div>
    </>
  );
}
