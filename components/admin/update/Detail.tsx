'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateGeneralDetails } from '@/actions/admin/createHostel'

const detailSchema = z.object({
  'Hostel Name': z.string().min(1, 'Hostel Name is required'),
  'Country': z.string().min(1, 'Country is required'),
  'Province': z.string().min(1, 'Province is required'),
  'City': z.string().min(1, 'City is required'),
  'Zip Code': z.string().min(1, 'Zip Code is required'),
  'Type': z.enum(['MALE', 'FEMALE', 'MIXED']),
  'Category': z.enum(['STUDENT', 'PROFESSIONAL', 'FAMILY']),
  'CNIC': z.string().regex(/^\d{5}-\d{7}-\d$/, 'Invalid CNIC format'),
  'Phone': z.string().regex(/^\+92-\d{3}-\d{7}$/, 'Invalid phone number format'),
  'Description': z.string().min(10, 'Description must be at least 10 characters long'),
})

export default function GeneralDetails(hostel: any) {
  console.log("hostel-data: ", hostel)
  const [details, setDetails] = useState({
    'Hostel Name': hostel.hostel.hostelName,
    'Country': hostel.hostel.country,
    'Province': hostel.hostel.province,
    'City': hostel.hostel.city,
    'Zip Code': hostel.hostel.zipCode,
    'Type': hostel.hostel.type,
    'Category': hostel.hostel.category,
    'CNIC': hostel.hostel.cnic,
    'Phone': hostel.hostel.phone,
    'Description': hostel.hostel.description,
  })

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(detailSchema),
    defaultValues: details,
  })

  const handleSave = (key: any) => {
    handleSubmit((data) => {
      setDetails(prevDetails => ({ ...prevDetails, [key]: data[key] }))
      console.log(`Saved ${key}:`, data[key])
      alert(`${key} updated successfully!`)
    })()
  }

  const handleUpdateAll = handleSubmit(async (data) => {
    setDetails(data);
    console.log('Updated General Details:', data);
    const response = await updateGeneralDetails(hostel.hostel.id, data);
    if (response.success) {
      alert('All general details updated successfully!');
    } else {
      alert('Failed to update general details.');
    }
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">General Details</h2>
      <form onSubmit={handleUpdateAll} className="space-y-4">
        {(Object.keys(details) as Array<any>).map((key) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center">
            <label className="font-semibold w-1/3 mb-1 sm:mb-0" htmlFor={key as string}>{key}:</label>
            <div className="w-full sm:w-2/3 flex gap-2">
              {key === 'Type' || key === 'Category' ? (
                <select
                  {...register(key)}
                  className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {key === 'Type' ? (
                    <>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="MIXED">MIXED</option>
                    </>
                  ) : (
                    <>
                      <option value="STUDENT">STUDENT</option>
                      <option value="PROFESSIONAL">PROFESSIONAL</option>
                      <option value="FAMILY">FAMILY</option>
                      <option value="OTHER">OTHER</option>
                    </>
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  {...register(key)}
                  className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <button
                type="button"
                onClick={() => handleSave(key)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        ))}
        {Object.entries(errors).map(([key, error]) => (
          <p key={key} className="text-red-500 text-sm">{(error as { message: string }).message}</p>
        ))}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Update General Details
          </button>
        </div>
      </form>
    </div>
  )
}

