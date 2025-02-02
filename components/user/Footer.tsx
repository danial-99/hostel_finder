import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Safety Center", href: "/safety-center" },
      { name: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/assets/logo.png" alt="Hostel Finder Logo" width={100} height={40} />
            </Link>
            <p className="text-sm mb-4">
              Find your perfect stay with Hostel Finder. Discover affordable accommodations worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}