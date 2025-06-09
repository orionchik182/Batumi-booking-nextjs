"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="text-primary-600 h-5 w-5" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="text-primary-600 h-5 w-5" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="text-primary-600 h-5 w-5" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="border-primary-900 border-b md:border-b-0 md:border-r">
      <ul className="flex flex-row gap-2 text-lg md:h-full md:flex-col">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex items-center gap-4 px-5 py-3 font-semibold transition-colors ${pathname === link.href ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="md:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
