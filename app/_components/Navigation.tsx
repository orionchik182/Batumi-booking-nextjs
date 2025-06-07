import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth } from "../_lib/auth";

async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 flex items-center gap-4 transition-colors"
            >
              <div className="relative h-8 w-8">
                <Image
                  src={session.user.image}
                  fill
                  className="h-8 rounded-full object-cover"
                  alt="avatar image"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
