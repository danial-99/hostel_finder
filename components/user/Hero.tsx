"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SearchResults } from '@/components/user/SearchResult'
import { useToast } from "@/hooks/use-toast"

interface Hostel {
  id: string
  name: string
  location: string
  imageUrl: string
}

const hostels: Hostel[] = [
  {
    id: "1",
    name: "Sunshine Backpackers",
    location: "Sydney, Australia",
    imageUrl: "/placeholder.svg?height=300&width=400"
  },
  {
    id: "2",
    name: "Mountain View Lodge",
    location: "Queenstown, New Zealand",
    imageUrl: "/placeholder.svg?height=300&width=400"
  },
  {
    id: "3",
    name: "City Center Hostel",
    location: "London, UK",
    imageUrl: "/placeholder.svg?height=300&width=400"
  },
  {
    id: "4",
    name: "Beachside Bungalow",
    location: "Bali, Indonesia",
    imageUrl: "/placeholder.svg?height=300&width=400"
  }
]

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Hostel[]>([])
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const results = hostels.filter(hostel => 
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)

    if (results.length === 0) {
      toast({
        title: "No hostels found",
        description: "Try a different search term or location.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <section className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url(/assets/heroBanner.png)'}}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 max-w-3xl mx-auto">
            Discover Your Home Away From Home Hostel Finder!
          </h1>
          {/* <Button size="lg" className="mb-8 sm:mb-10">Book Now</Button> */}
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="text" 
                  placeholder="Search destination" 
                  className="flex-grow"
                  aria-label="Search destination"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" className="w-full sm:w-auto">Search</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      {searchResults.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            <SearchResults results={searchResults} />
          </div>
        </section>
      )}
    </>
  )
}
