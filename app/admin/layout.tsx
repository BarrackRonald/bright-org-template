"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Site Settings", href: "/admin/site-settings" },
  { name: "About", href: "/admin/about" },
  { name: "Programs", href: "/admin/programs" },
  { name: "Events", href: "/admin/events" },
  { name: "Articles", href: "/admin/articles" },
  { name: "Gallery", href: "/admin/gallery" },
  { name: "Impact Stats", href: "/admin/impact-stats" },
  { name: "Testimonials", href: "/admin/testimonials" },
  { name: "Donations", href: "/admin/donations" },
  { name: "Messages", href: "/admin/messages" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">BBF Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-2 rounded hover:bg-gray-700 ${
                pathname === item.href ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
