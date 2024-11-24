import { approvedHostels } from "@/actions/admin/approvedHostels";
import { getUserId } from "@/actions/admin/getUserId";
import ListApprovedHostels from "@/components/admin/ListOfApprovedHostels";
export default async function NewRequestsPage() {

const userId = await getUserId();
const listApprovedHostels = await approvedHostels(userId);
console.log(userId);
console.log(listApprovedHostels, "Approved Hostels");

return (
  <div>
    <ListApprovedHostels pendingHostels={listApprovedHostels as []} />
  </div>
)
}