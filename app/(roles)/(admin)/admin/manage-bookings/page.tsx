
import BookingsTable from '@/components/admin/BookingsTable'

interface Booking {
  roomNo: string
  address: string
  date: string
  type: string
  status: 'Completed' | 'Active' | 'Canceled'
}

const bookings: Booking[] = [
  { roomNo: '002', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Double Bedded Attach Bath', status: 'Completed' },
  { roomNo: '113', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Single Bedded Separate Bath', status: 'Active' },
  { roomNo: '017', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Bunkers Attach Bath', status: 'Canceled' },
  { roomNo: '007', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Master Bed Attach Bath', status: 'Completed' },
  { roomNo: '009', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Dormitory Separate Bath', status: 'Active' },
  { roomNo: '018', address: '089 Kutch Green Apt. 448', date: '14 Feb 2019', type: 'Dormitory Attach Bath', status: 'Completed' },
]

export default function ManageBookingsPage() {
  return (
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  )
}