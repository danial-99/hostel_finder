'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Wifi, Utensils, Shield, Lightbulb, WashingMachine, Wind, Droplet, TreePine, X } from "lucide-react"

const defaultAmenities = [
  { icon: <Shield className="h-12 w-12" />, name: "Security" },
  { icon: <Utensils className="h-12 w-12" />, name: "3 times meal" },
  { icon: <Wifi className="h-12 w-12" />, name: "Fiber/Wifi" },
  { icon: <Lightbulb className="h-12 w-12" />, name: "24/7 Light" },
  { icon: <WashingMachine className="h-12 w-12" />, name: "Laundry space" },
  { icon: <Wind className="h-12 w-12" />, name: "AC/Heater" },
  { icon: <Droplet className="h-12 w-12" />, name: "Geyser" },
  { icon: <TreePine className="h-12 w-12" />, name: "Out door space" },
]

const iconOptions: { [key: string]: JSX.Element } = {
  Shield: <Shield className="h-12 w-12" />,
  Utensils: <Utensils className="h-12 w-12" />,
  Wifi: <Wifi className="h-12 w-12" />,
  Lightbulb: <Lightbulb className="h-12 w-12" />,
  WashingMachine: <WashingMachine className="h-12 w-12" />,
  Wind: <Wind className="h-12 w-12" />,
  Droplet: <Droplet className="h-12 w-12" />,
  TreePine: <TreePine className="h-12 w-12" />,
}

export default function ManageAmenities() {
  const [amenities, setAmenities] = useState(defaultAmenities)
  const [newAmenityName, setNewAmenityName] = useState("")
  const [newAmenityIcon, setNewAmenityIcon] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addAmenity = () => {
    if (newAmenityName && newAmenityIcon) {
      setAmenities([...amenities, { icon: iconOptions[newAmenityIcon], name: newAmenityName }])
      setNewAmenityName("")
      setNewAmenityIcon("")
      setIsDialogOpen(false)
    }
  }

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Amenities</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {amenities.map((amenity, index) => (
          <Card key={index} className="relative group">
            <CardContent className="flex flex-col items-center justify-center p-6">
              {amenity.icon}
              <p className="mt-2 text-sm font-medium text-center">{amenity.name}</p>
              <Badge
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => removeAmenity(index)}
              >
                <X className="h-4 w-4" />
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Amenity</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Amenity</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newAmenityName}
                onChange={(e) => setNewAmenityName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <Select onValueChange={setNewAmenityIcon} value={newAmenityIcon}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconOptions).map((iconName) => (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center">
                        {iconOptions[iconName as keyof typeof iconOptions]}
                        <span className="ml-2">{iconName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addAmenity}>Add Amenity</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}