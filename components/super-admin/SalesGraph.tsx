'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: '5k', value: 20 },
  { name: '10k', value: 40 },
  { name: '15k', value: 30 },
  { name: '20k', value: 70 },
  { name: '25k', value: 50 },
  { name: '30k', value: 60 },
  { name: '35k', value: 80 },
  { name: '40k', value: 40 },
  { name: '45k', value: 70 },
  { name: '50k', value: 50 },
  { name: '55k', value: 60 },
  { name: '60k', value: 55 },
]

export function SalesGraph() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sales Details</CardTitle>
          <Select defaultValue="march">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}