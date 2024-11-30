import BookingsTable from '@/components/admin/BookingsTable'

interface Booking {
  name: string
  phone: string
  address: string
  date: string
  type: string
  payment: 'unpaid' | 'paid' | 'pending'  // Change payment type to match the Booking type in BookingsTable
  status: 'Completed' | 'Active' | 'Canceled'
}

const bookings: Booking[] = [
  { name: 'israr', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Double Bedded Attach Bath', payment: 'pending', status: 'Completed' },
  { name: 'shayan', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Single Bedded Separate Bath', payment: 'unpaid', status: 'Active' },
  { name: 'ali', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Bunkers Attach Bath', payment: 'paid', status: 'Canceled' },
  { name: 'jon', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Master Bed Attach Bath', payment: 'unpaid', status: 'Completed' },
  { name: 'harry', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Dormitory Separate Bath', payment: 'pending', status: 'Active' },
  { name: 'gill', phone: '+923175160306', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Dormitory Attach Bath', payment: 'paid', status: 'Completed' },
]

export default function ManageBookingsPage() {
  return (
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  )
}
