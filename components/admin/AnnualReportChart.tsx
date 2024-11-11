import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export default function AnnualReportChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
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
        <div className="mt-4 flex justify-center space-x-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}