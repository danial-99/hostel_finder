import { SalesGraph } from "@/components/super-admin/SalesGraph";
import { StatsCards } from "@/components/super-admin/StatsCards";

export default function Page() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Hello Israr, Welcome Back 👋</h1>
      <StatsCards />
      <SalesGraph />
    </div>
  );
}
