"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HostelDetailsView } from "./subscription/HostelDetail"
import { getTopHostelsList } from "@/actions/hostel/listHostels"

// Define the type for hostel data
type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  cnic: string;
  phoneNumber: string;
  hostelName: string;
  paymentDate: Date;
  subcriptionEnd: Date;
  subscriptionPlan: "Free" | "Monthly" | "6 Months" | "1 Year";
  discountApplied: string;
};

// Mock data for hostels and their subscriptions
export default function SuperAdminDashboard() {
 const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedData = await getTopHostelsList(); // Replace with actual API call for payments
        if (fetchedData) {
          const processedData = fetchedData.map((payment: Payment) => {
            const currentDate = new Date();
            const subcriptionEndDate = new Date(payment.subcriptionEnd);
            const diffTime = Math.abs(subcriptionEndDate.getTime() - currentDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let subscriptionPlan: "Free" | "Monthly" | "6 Months" | "1 Year" = "Free";
            let amount = 0;
            let paymentDate = new Date();

            if (diffDays <= 31) {
              subscriptionPlan = "Monthly";
              amount = 29.99;
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setMonth(paymentDate.getMonth() - 1);
            } else if (diffDays <= 185) {
              subscriptionPlan = "6 Months";
              amount = 59.99;
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setMonth(paymentDate.getMonth() - 6);
            } else if (diffDays <= 365) {
              subscriptionPlan = "1 Year";
              amount = 99.99;
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setFullYear(paymentDate.getFullYear() - 1);
            }

            return {
              ...payment,
              subscriptionPlan,
              amount,
              paymentDate,
            };
          });

          setData(processedData);
        }
      } catch (err) {
        setError("Failed to load payments data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
    
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hostel Subscription Overview</h1>
      
      
        <>
          <Card>
            <CardHeader>
              <CardTitle>Hostel Subscriptions</CardTitle>
              <CardDescription>Overview of all hostel subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel Name</TableHead>
                    <TableHead>Subscription Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Subscription End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((hostel) => {
                    const isExpired = hostel.subcriptionEnd.toString() !== "N/A" && new Date(hostel.subcriptionEnd) < new Date()
                    return (
                      <TableRow key={hostel.id} className={isExpired ? "bg-red-50" : ""}>
                        <TableCell className="font-medium">{hostel.hostelName}</TableCell>
                        <TableCell>{hostel.subscriptionPlan}</TableCell>
                        <TableCell>
                          <Badge variant={isExpired ? "destructive" : "success"}>
                            {isExpired ? "Expired" : hostel.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{hostel.paymentDate.toLocaleDateString()}</TableCell>
                        <TableCell>{hostel.subcriptionEnd.toLocaleDateString()}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      
    </div>
  )
}
