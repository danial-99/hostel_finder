import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, CalendarCheck, Clock } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total User</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">40,689</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">8.5% Up</span> from yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">993</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">1.3% Up</span> from past week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8,900</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500">4.3% Down</span> from yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2040</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">1.8% Up</span> from yesterday
          </p>
        </CardContent>
      </Card>
    </div>
  )
}