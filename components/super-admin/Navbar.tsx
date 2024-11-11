"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useAuth()

  return (
    <nav className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' className='lg:hidden'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='p-0'>
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className='lg:hidden flex-shrink-0 flex items-center'>
              <Image
                src={"/assets/logo-dark.png"}
                alt='logo'
                width={80}
                height={40}
                unoptimized
              />
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
          
            <button className='ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
              <span className='sr-only'>View notifications</span>
              <Bell className='h-6 w-6' />
            </button>
            <div className='ml-3 relative'>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src='/placeholder-avatar.jpg' alt='Moni Roy' />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className='ml-3'>
                  <div className='text-sm font-medium text-gray-700'>
                    {user?.name}
                  </div>
                  <div className='text-xs text-gray-500 lowercase'>{user?.role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center sm:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'
            >
              <span className='sr-only'>Open main menu</span>
              {isMobileMenuOpen ? (
                <X className='block h-6 w-6' />
              ) : (
                <Menu className='block h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className='sm:hidden'>
          <div className='pt-2 pb-3 space-y-1'>
            <button className='flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100'>
              <Bell className='mr-3 h-6 w-6' />
              Notifications
            </button>
            <div className='px-4 py-2'>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src='/placeholder-avatar.jpg' alt='Moni Roy' />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className='ml-3'>
                  <div className='text-sm font-medium text-gray-700'>
                    {user?.name}
                  </div>
                  <div className='text-xs text-gray-500'>{user?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
