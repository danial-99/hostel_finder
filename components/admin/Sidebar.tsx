"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building,
  Calendar,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { clearSession } from "@/lib/auth";

const navItems = [
  { icon: Home, label: "Overview", href: "/admin/dashboard" },
  {
    icon: Building,
    label: "Register New Hostel",
    href: "/admin/hostel-details",
  },
  {
    icon: Building,
    label: "Hostel Details",
    href: "/admin/myApprovedHostels",
  },
  {
    icon:Calendar,
    label: "Hostel Update",
    href :"/admin/Hostel-Update",
  },
  {
    icon: Users,
    label: "Booking Requests",
    href: "/admin/booking-requests",
  },
  {
    icon:Building,
    label:"Room Update",
    href:"/admin/room-details",
  },
  { icon: Users, label: "Manage Bookings", href: "/admin/manage-bookings" },
  { icon: CreditCard, label: "Subscription", href: "/admin/Subscription" },
];

export default function Sidebar() {
  const [activePath, setActivePath] = useState("/admin/dashboard");
  const { logoutHook } = useAuth();

  useEffect(() => {
    const updateActivePath = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", updateActivePath);
    updateActivePath();

    return () => window.removeEventListener("popstate", updateActivePath);
  }, []);

  const handleNavigation = (href: string) => {
    window.history.pushState(null, "", href);
    setActivePath(href);
  };

  return (
    <div className="bg-white lg:w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center h-20">
        <Image
          src={"/assets/logo-dark.png"}
          alt="logo"
          width={150}
          height={80}
          unoptimized
        />
      </div>
      <ul className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <li key={item.href} className="my-2">
              <Link
                href={item.href}
                onClick={(e) => {
                  handleNavigation(item.href);
                }}
                className={`flex items-center px-4 py-2 rounded ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="p-4">
        <Button
          variant={"default"}
          className="flex items-center justify-center w-full px-4 py-2 rounded"
          onClick={() => {
            clearSession(), logoutHook();
          }}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
}
