"use client"
import { useEffect, useState } from "react";
import { approvedHostels } from "@/actions/admin/approvedHostels";
import { getUserId } from "@/actions/admin/getUserId";
import ListApprovedHostels from "@/components/admin/ListOfApprovedHostels";

export default function NewRequestsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [listApprovedHostels, setListApprovedHostels] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const userId = await getUserId();
      setUserId(userId);
      const listApprovedHostels = await approvedHostels(userId);
      setListApprovedHostels(listApprovedHostels);
      console.log(userId);
      console.log(listApprovedHostels, "Approved Hostels");
    }
    fetchData();
  }, []);

  if(listApprovedHostels === null) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <ListApprovedHostels pendingHostels={listApprovedHostels as []} />
    </div>
  )
}