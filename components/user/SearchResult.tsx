import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import Link from "next/link";

interface Hostel {
  id: string
  hostelName: string
  location: string
  city: string
  country: string
  hostelImage: string
}

interface SearchResultsProps {
  results: Hostel[]
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((hostel) => (
        <Card key={hostel.id} className="overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
                src={`data:image/jpeg;base64,${hostel.hostelImage}`}
                alt="Hostel lounge"
                className="rounded-l-xl object-cover"
              />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">{hostel.hostelName}</h3>
            <p className="text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> {hostel.city}, {hostel.country}
            </p>
          </CardContent>
          <CardFooter className="p-4">
          <Link href={`/hostels/${hostel.id}`} key={hostel.id}>
            <Button className="w-full" variant="outline">View Details</Button>
          </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
