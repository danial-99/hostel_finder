import  prisma  from '@/lib/prisma';
import SubscriptionPlansPage from '@/components/super-admin/activities/page';

export default async function SubscriptionPlansPageWrapper() {
  // Fetch data from the database
  const plans = await prisma.plan.findMany({
    include: {
      features: true, // Assuming features are related
    },
  });

  // Pass the fetched plans to the page component
  return <SubscriptionPlansPage initialPlans={plans} />;
}
