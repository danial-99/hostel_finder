  import NewRequests from "@/components/super-admin/NewRequests";
  import { listPendingHostel } from "@/actions/super-admin/listpendinghostel";
export default async function NewRequestsPage() {
  const pendingHostels = await listPendingHostel();

  console.log(pendingHostels, "pendingHostels");
  
  return (
    <div>
      <NewRequests pendingHostels={pendingHostels as []} />
    </div>
  )
}