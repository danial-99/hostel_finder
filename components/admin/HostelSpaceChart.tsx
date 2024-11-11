import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Booked', value: 67 },
  { name: 'Available', value: 33 },
]

const COLORS = ['#0088FE', '#FFFFFF']

export default function HostelSpaceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hostel Space</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0088FE] mr-2"></div>
            <span className="text-sm">67% Booked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}