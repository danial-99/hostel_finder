'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  const [details, setDetails] = useState({
    'Hostel Name': hostel.hostelName,
    'Country': hostel.country,
    'Province': hostel.province,
    'City': hostel.city,
    'Zip Code': hostel.zipCode,
    'Type': hostel.type,  
    'Category': hostel.category,
    'CNIC': hostel.cnic,
    'Phone': hostel.phone,
    'Description': hostel.description,
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

  const handleUpdateAll = handleSubmit((data) => {
    setDetails(data)
    console.log('Updated General Details:', data)
    alert('All general details updated successfully!')
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

