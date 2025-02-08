'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { updateFacilities } from '@/actions/admin/createHostel'

export default function Facilities({ hostel }: any) {
  const fullFacilitiesList = {
    security: false,
    internet: false,
    electricity24_7: false,
    mattressAvailable: false,
    cleanWater: false,
    geyser: false,
    iron: false,
    library: false,
    balcony: false,
    terrace: false,
    meals3Times: false,
    laundry: false,
    playground: false,
    roomCleaning: false,
    smokingZone: false,
    airConditioning: false,
    freeWiFi: false,
    breakfastIncluded: false,
    towelsIncluded: false,
    freeCityMaps: false,
    hotShowers: false,
    security24Hours: false,
    keyCardAccess: false,
    luggageStorage: false,
    lockers: false,
    commonRoom: false,
    swimmingPool: false,
    cupboards: false,
    poolTable: false,
    kitchen: false,
    cooker: false,
    vendingMachines: false,
    washingMachine: false,
    readingLight: false,
    UPS: false,
  }

  const [facilitiesData, setFacilitiesData] = useState<Record<string, boolean>>(fullFacilitiesList)

  useEffect(() => {
    // Pre-fill the facilities based on data from the hostel
    if (hostel?.hostel?.facilities?.length) {
      const updatedFacilities = { ...fullFacilitiesList }
      hostel.hostel.facilities.forEach((facility: keyof typeof fullFacilitiesList) => {
        if (updatedFacilities.hasOwnProperty(facility)) {
          updatedFacilities[facility] = true
        }
      })
      setFacilitiesData(updatedFacilities)
    }
  }, [hostel])

  const handleFacilityChange = (key: string, checked: boolean) => {
    setFacilitiesData((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const saveFacilities = async () => {
    const updatedFacilities = Object.entries(facilitiesData)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    console.log('Updated Facilities:', updatedFacilities);
    const response = await updateFacilities(hostel.hostel.id, facilitiesData);
    if (response.success) {
      alert('Facilities saved successfully!');
    } else {
      alert('Failed to save facilities.');
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Facilities</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select the facilities available at your hostel.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(facilitiesData).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  handleFacilityChange(key, checked as boolean)
                }
                className="peer"
              />
              <Label
                htmlFor={key}
                className="peer-hover:text-primary transition-all duration-200 ease-in-out peer-checked:font-bold"
              >
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={saveFacilities}
        >
          Save Updates
        </button>
      </CardContent>
    </Card>
  )
}
