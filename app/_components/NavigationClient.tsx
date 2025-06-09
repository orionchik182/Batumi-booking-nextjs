'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { useState } from 'react'

interface Props {
  session: Session | null
}

export default function NavigationClient({ session }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="text-primary-100 md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <Bars3Icon className="h-8 w-8" />
        )}
      </button>
      <nav
        className={`${
          open ? 'block' : 'hidden'
        } absolute right-0 top-full mt-2 w-40 rounded-md border border-primary-800 bg-primary-950 p-4 md:static md:block md:w-auto md:border-0 md:p-0`}
      >
        <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10 text-xl">
          <li>
            <Link href="/cabins" className="hover:text-accent-400 transition-colors">
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-accent-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link href="/account" className="hover:text-accent-400 flex items-center gap-3 transition-colors">
                <div className="relative h-8 w-8">
                  <Image src={session.user.image} fill className="rounded-full object-cover" alt="avatar image" referrerPolicy="no-referrer" />
                </div>
                <span>Guest area</span>
              </Link>
            ) : (
              <Link href="/account" className="hover:text-accent-400 transition-colors">
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}
