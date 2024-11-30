'use client'

import { useState } from 'react'

export default function Facilities() {
  const [facilities, setFacilities] = useState(['WiFi', 'Parking'])
  const [newFacility, setNewFacility] = useState('')

  const addFacility = () => {
    if (newFacility.trim()) {
      setFacilities(prev => [...prev, newFacility.trim()])
      setNewFacility('')
    }
  }

  const deleteFacility = (index: number) => {
    setFacilities(prev => prev.filter((_, i) => i !== index))
  }

  const saveFacilities = () => {
    console.log('Saved Facilities:', facilities)
    alert('Facilities saved successfully!')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Facilities</h2>
      <div className="space-y-2 mb-4">
        {facilities.map((facility, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{facility}</span>
            <button
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              onClick={() => deleteFacility(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newFacility}
          onChange={(e) => setNewFacility(e.target.value)}
          placeholder="New facility"
          className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
          onClick={addFacility}
        >
          Add
        </button>
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        onClick={saveFacilities}
      >
        Save Updates
      </button>
    </div>
  )
}

