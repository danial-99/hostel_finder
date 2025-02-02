"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { getTopHostelsList } from "@/actions/hostel/listHostels";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { string } from "zod";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  cnic: string;
  phone: string;
  hostelName: string;
  paymentDate: Date;
  discount: string;
  subcriptionEnd: Date;
  subscriptionPlan: "Free" | "Monthly" | "6 Months" | "1 Year";
  discountApplied: string;
};

const columns = [
  { key: "hostelName", header: "Hostel Name" },
  { key: "subscriptionPlan", header: "Subscription Plan" },
  { key: "amount", header: "Amount Paid" },
  { key: "discountApplied", header: "Discount" },
  { key: "status", header: "Status" },
  { key: "cnic", header: "CNIC" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "paymentDate", header: "Payment Date" },
];

function DataTable({ data }: { data: Payment[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((payment) =>
    payment.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by hostel name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.hostelName}</TableCell>
                <TableCell>{payment.subscriptionPlan}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "Pkr",
                  }).format(payment.amount)}
                </TableCell>
                <TableCell>{payment.discount}</TableCell>
                <TableCell>
                  <div
                    className={`capitalize ${
                      payment.status === "success"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell>{payment.cnic}</TableCell>
                <TableCell>{payment.phone}</TableCell>
                <TableCell>{payment.paymentDate.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
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
            let discount= "0";

            if (diffDays <= 31) {
              subscriptionPlan = "Monthly";
              amount = 29.99;
              discount= "0";
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setMonth(paymentDate.getMonth() - 1);
            } else if (diffDays <= 185) {
              subscriptionPlan = "6 Months";
              amount = 59.99;
              discount= "5%";
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setMonth(paymentDate.getMonth() - 6);
            } else if (diffDays <= 365) {
              subscriptionPlan = "1 Year";
              amount = 99.99;
              discount="10%";
              paymentDate = new Date(subcriptionEndDate);
              paymentDate.setFullYear(paymentDate.getFullYear() - 1);
            }

            return {
              ...payment,
              subscriptionPlan,
              amount,
              paymentDate,
              discount,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">
        Super Admin - Hostel Subscription Payments
      </h1>
      <DataTable data={data} />
    </div>
  );
}

