import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface RoomDetailsProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function RoomDetails({ value, onChange }: RoomDetailsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="roomDetails">Hostel Rooms</Label>
      <Textarea
        id="roomDetails"
        name="roomDetails"
        value={value}
        onChange={onChange}
        placeholder="Enter room details"
        rows={4}
      />
    </div>
  )
}