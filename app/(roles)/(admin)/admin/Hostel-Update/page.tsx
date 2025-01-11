'use client'

import { useEffect, useState } from 'react'
import GeneralDetails from '@/components/admin/update/Detail'
import Facilities from '@/components/admin/update/Facilities'
import Images from '@/components/admin/update/Image'
import { getUserId } from '@/actions/admin/getUserId'
import { approvedHostels } from '@/actions/admin/approvedHostels'
import { any } from 'zod'



export default function HostelDashboard() {
  const [listApprovedHostels, setHostels] = useState({} as any)

  useEffect(() => {
    async function fetchHostels() {
      const userId = await getUserId();
      const hostelData = await approvedHostels(userId)
      if (hostelData) {
        setHostels(hostelData)
      }
    }

    fetchHostels()
  }, [])
  const [activeTab, setActiveTab] = useState<'general' | 'facilities' | 'images'>('general')
    return (
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap mb-6 gap-2">
          {['general', 'facilities', 'images'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 text-center text-sm rounded-md transition-colors duration-200 ease-in-out ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
  
        {activeTab === 'general' && <GeneralDetails hostel={listApprovedHostels.hostel} />}
        {activeTab === 'facilities' && <Facilities hostel={listApprovedHostels.hostel}/>}
        {activeTab === 'images' && <Images hostel={listApprovedHostels.hostel}/>}
      </div>
    )
  
}

