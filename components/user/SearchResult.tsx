import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

interface Hostel {
  id: string
  name: string
  location: string
  imageUrl: string
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
              src={hostel.imageUrl} 
              alt={hostel.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">{hostel.name}</h3>
            <p className="text-muted-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> {hostel.location}
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full" variant="outline">View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
