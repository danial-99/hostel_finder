import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const footerSections = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Safety Center", "Community Guidelines"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="Hostel Finder Logo" width={100} height={40} />
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
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hostel Finder. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
              <form className="flex w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}