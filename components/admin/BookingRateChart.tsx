'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, CalendarCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookingData, getStatistics } from "@/actions/hostel/listHostels";

export function StatsCards() {
  const [stats, setStats] = useState({ totalBookings: 0 });

  useEffect(() => {
    async function fetchStats() {
      const data = await getBookingData();
      if(data){
        setStats(data);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
    </div>
  );
}