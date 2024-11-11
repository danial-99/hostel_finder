import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url(/heroBanner.png)'}}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 max-w-3xl mx-auto">
          Discover Your Home Away From Home Hostel Finder!
        </h1>
        <Button size="lg" className="mb-8 sm:mb-10">Book Now</Button>
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-4">
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="text" 
                placeholder="Search destination" 
                className="flex-grow"
                aria-label="Search destination"
              />
              <Button type="submit" className="w-full sm:w-auto">Search</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}