import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='hidden lg:block'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
          <div className='container mx-auto px-6 py-8'>
           {children}
          </div>
        </main>
      </div>
    </div>
  )
}
