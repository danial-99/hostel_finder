"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearSession } from "@/lib/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logoutHook } = useAuth();

  const navItems = [
    { href: "#", label: "Home" },
    { href: "#about-us", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className='sticky top-0 z-50 w-full bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary'>
      <div className='container mx-auto flex h-14 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src={"/logo.png"} alt='logo' width={100} height={40} />
        </Link>

        <nav className='hidden md:flex gap-6'>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='text-sm font-medium transition-colors text-white hover:text-primary'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {isLoggedIn ? (
          <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar>
                <AvatarImage width={10} height={10} src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                  <DropdownMenuItem>
                  <Button
                    variant={'default'}
                      className="flex items-center justify-center w-full px-4 py-2 rounded"
                      onClick={() => {clearSession(), logoutHook()}}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Log out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </>
        ) : (
          <div className='hidden md:flex items-center'>
            <Link href={"/auth/login"}>
              <Button variant='ghost' className='text-white'>
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button className='ml-2'>Register</Button>
            </Link>
          </div>
        )}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <Button variant='ghost' size='icon' className='text-white'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
            <nav className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='text-sm font-medium transition-colors hover:text-primary'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isLoggedIn && 
              <>
              <Separator className='my-4' />
              <Button
                variant='ghost'
                className='justify-start'
                onClick={() => setIsOpen(false)}
                >
                Login
              </Button>
              <Button
                className='justify-start'
                onClick={() => setIsOpen(false)}
                >
                Register
              </Button>
                </>
              }
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
