"use client";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Compass, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const items = [
    {
      label: "الصلاة",
      icon: Clock,
      href: "/prayer",
    },
    {
      label: "القبلة",
      icon: Compass,
      href: "/quibla",
    },
    {
      label: "القرآن",
      icon: BookOpen,
      href: "/quran",
    },
  {
    label: "المزيد",
    icon: Menu,
    href: "/more",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 right-0 left-0 z-50 border-t bg-background">
      <ul className="flex justify-around py-2">
        {items.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-green-400 ${cn(
                  "flex flex-col items-center gap-1 text-sm",
                  active ? "text-green-500" : "text-gray-500"
                )}`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
