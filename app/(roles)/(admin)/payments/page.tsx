import PaymentSummary from '@/components/admin/PaymentSummary'

export default function PaymentsPage() {
  return (
    <div>
      <PaymentSummary
        hostelName="Sky Hostel"
        beds={4}
        sleeps={8}
        squareFeet={1350}
        arrivalDate="October 28, 2022"
        departureDate="November 03, 2022"
        totalNights={6}
        rate={2016}
        communityFee={149}
        tax={143.25}
        total={2308.25}
      />
    </div>
  )
}