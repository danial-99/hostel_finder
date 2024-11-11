import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  increased: boolean
}

export default function StatsCard({ title, value, change, increased }: StatsCardProps) {
  return (
    <Card className='hover:bg-primary/10'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {increased ? (
            <ArrowUpRight className="inline mr-1 text-green-500" size={16} />
          ) : (
            <ArrowDownRight className="inline mr-1 text-red-500" size={16} />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}